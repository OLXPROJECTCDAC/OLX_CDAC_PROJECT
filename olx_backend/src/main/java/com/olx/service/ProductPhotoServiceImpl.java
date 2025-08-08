package com.olx.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.Transformation;
import com.cloudinary.utils.ObjectUtils;
import com.olx.dto.ProductPhotoDTO;
import com.olx.entity.ProductPhotosEntity;
import com.olx.entity.ProductsEntity;
import com.olx.exception.ResourceNotFoundException;
import com.olx.repository.ProductPhotosRepository;
import com.olx.repository.ProductRepository;
import jakarta.persistence.Column;
import lombok.RequiredArgsConstructor;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class ProductPhotoServiceImpl implements ProductPhotoService {

    //dependency
    private final ProductRepository productRepository;
    private final ProductPhotosRepository photoRepository;
    private final Cloudinary cloudinary;

    @Override
    public List<ProductPhotoDTO> uploadPhotos(Long productId, List<MultipartFile> images) throws IOException {

        ProductsEntity product = productRepository.findById(productId).
                orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + productId));

        List<ProductPhotosEntity> existingPhotos = photoRepository.findByProductIdAndIsDeletedFalse(productId);

        int startPosition = existingPhotos.stream()
                //  Use map() to convert each ProductPhotosEntity into an Integer representing its position
                .map(photo -> photo.getPosition())
                // : Use max() to get the maximum value from the positions
//                .max()
                .max((position1, position2) -> Integer.compare(position1, position2))
                // Step 4: If no max value is found (i.e., the stream is empty), return 0
                .orElse(0);

        List<ProductPhotosEntity> newPhotos = new ArrayList<>();
        int pos = startPosition + 1;

        for (MultipartFile file : images) {
            // Define transformation to apply watermark
            Map<String, Object> uploadParams = ObjectUtils.asMap(
                    "transformation", new Transformation()
                            .overlay("My Brand:Untitled_design-removebg-preview_ffuqpu")  // e.g., "my_watermark"
                            .gravity("south_east")                // position (bottom-right)
                            .opacity(50)                          // transparency
                            .width(0.3)                           // watermark size (30%)
                            .crop("scale")                        // scale watermark to fit
            );

            // Upload to Cloudinary
            Map<String, Object> uploadResult = cloudinary.uploader().upload(file.getBytes(), uploadParams);

            ProductPhotosEntity photo = new ProductPhotosEntity();
            photo.setProduct(product);
            photo.setPublicId((String) uploadResult.get("public_id"));
            photo.setSecureUrl((String) uploadResult.get("secure_url"));
            photo.setPosition(pos);
            // No isPrimary for now as per your current requirement

            newPhotos.add(photo);
            pos++;
        }

        photoRepository.saveAll(newPhotos);

        return newPhotos.stream()
                .map(photo -> mapToDTO(photo))
//                .toList();
        .collect(java.util.stream.Collectors.toList());
    }

// ==========================================================================================================

    @Override
    public List<ProductPhotoDTO> getPhotosForProduct(Long productId) {
        List<ProductPhotosEntity> photos = photoRepository.findByProductIdOrderByPositionAsc(productId);
        return photos.stream()
                .map(photo -> mapToDTO(photo))
                .toList();
    }

// ==========================================================================================================

    @Override
    public void softDeletePhoto(Long productId, Long photoId) {
        // Find the photo by its ID or throw an exception if it doesn't exist.
        ProductPhotosEntity existingPhoto = photoRepository.findById(photoId)
                .orElseThrow(() -> new ResourceNotFoundException("Photo not found with id: " + photoId));

        // Security Check: Ensure the photo belongs to the correct product.
        if (!existingPhoto.getProduct().getId().equals(productId)) {
            throw new IllegalArgumentException("Photo does not belong to product with id: " + productId);
        }

        // Mark the photo as deleted and set the timestamp.
        existingPhoto.setDeleted(true); // Corrected from isDeleted(true)
        existingPhoto.setDeletedAt(LocalDateTime.now());

        // Delete from Cloudinary -- not needed
//        try {
//            cloudinary.uploader().destroy(photo.getPublicId(), ObjectUtils.emptyMap());
//        } catch (IOException e) {
//            throw new RuntimeException("Failed to delete photo from Cloudinary", e);
//        }


        // Save the changes to the database (this performs an UPDATE, not a DELETE).
        photoRepository.save(existingPhoto);
    }

    private ProductPhotoDTO mapToDTO(ProductPhotosEntity photosEntity) {
        ProductPhotoDTO dto = new ProductPhotoDTO();
        dto.setId(photosEntity.getId());
        dto.setPublicId(photosEntity.getPublicId());
        dto.setSecureUrl(photosEntity.getSecureUrl());
        dto.setPosition(photosEntity.getPosition());
        // dto.setIsPrimary(entity.isPrimary()); //future scope
        dto.setDeleted(photosEntity.isDeleted());
        dto.setDeletedAt(photosEntity.getDeletedAt());
        return dto;
    }
// ==========================================================================================================
}
