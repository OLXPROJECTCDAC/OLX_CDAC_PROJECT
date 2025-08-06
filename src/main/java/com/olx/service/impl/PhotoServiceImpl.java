// File: src/main/java/com/olx/service/impl/PhotoServiceImpl.java
package com.olx.service.impl;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.olx.dto.PhotoDto;
import com.olx.entity.*;
import com.olx.repository.*;
import com.olx.service.PhotoService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PhotoServiceImpl implements PhotoService {
    private final PhotoRepository repo;
    private final ProductRepository prodRepo;
    private final Cloudinary cloudinary;

    public PhotoServiceImpl(PhotoRepository repo, ProductRepository prodRepo, Cloudinary cloudinary) {
        this.repo = repo;
        this.prodRepo = prodRepo;
        this.cloudinary = cloudinary;
    }

    private PhotoDto toDto(Photo p) {
        PhotoDto dto = new PhotoDto();
        dto.setId(p.getId());
        dto.setUrl(p.getUrl());
        dto.setProductId(p.getProduct().getId());
        return dto;
    }

    @Override
    public List<PhotoDto> getAllPhotos() {
        return repo.findAll().stream().map(this::toDto).collect(Collectors.toList());
    }

    @Override
    public PhotoDto getPhotoById(Long id) {
        return repo.findById(id)
            .map(this::toDto)
            .orElseThrow(() -> new EntityNotFoundException("Photo not found: " + id));
    }

    @Override
    public PhotoDto uploadPhoto(Long productId, MultipartFile file) {
        Product p = prodRepo.findById(productId)
            .orElseThrow(() -> new EntityNotFoundException("Product not found: " + productId));
        try {
            var uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());
            String url = uploadResult.get("secure_url").toString();
            Photo photo = new Photo();
            photo.setUrl(url);
            photo.setProduct(p);
            repo.save(photo);
            return toDto(photo);
        } catch (IOException e) {
            throw new RuntimeException("Cloudinary upload failed", e);
        }
    }

    @Override
    public void deletePhoto(Long id) {
        if (!repo.existsById(id)) throw new EntityNotFoundException("Photo not found: " + id);
        repo.deleteById(id);
    }
}