// File: src/main/java/com/olx/service/impl/ProductServiceImpl.java
package com.olx.service.impl;

import com.olx.dto.ProductDto;
import com.olx.entity.Category;
import com.olx.entity.Location;
import com.olx.entity.Product;
import com.olx.repository.CategoryRepository;
import com.olx.repository.LocationRepository;
import com.olx.repository.ProductRepository;
import com.olx.service.ProductService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductServiceImpl implements ProductService {
    private final ProductRepository prodRepo;
    private final CategoryRepository catRepo;
    private final LocationRepository locRepo;

    public ProductServiceImpl(ProductRepository prodRepo,
                              CategoryRepository catRepo,
                              LocationRepository locRepo) {
        this.prodRepo = prodRepo;
        this.catRepo = catRepo;
        this.locRepo = locRepo;
    }

    private ProductDto toDto(Product p) {
        ProductDto dto = new ProductDto();
        dto.setId(p.getId());
        dto.setTitle(p.getTitle());
        dto.setDescription(p.getDescription());
        dto.setPrice(p.getPrice());
        dto.setCreatedAt(p.getCreatedAt());
        dto.setCategoryId(p.getCategory().getId());
        dto.setLocationId(p.getLocation().getId());
        dto.setPhotoUrls(
            p.getPhotos().stream()
              .map(photo -> photo.getUrl())
              .collect(Collectors.toSet())
        );
        return dto;
    }

    @Override
    public List<ProductDto> getAllProducts() {
        return prodRepo.findAll().stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public ProductDto getProductById(Long id) {
        Product p = prodRepo.findById(id)
            .orElseThrow(() -> new EntityNotFoundException("Product not found: " + id));
        return toDto(p);
    }

    @Override
    public ProductDto createProduct(ProductDto dto) {
        Category c = catRepo.findById(dto.getCategoryId())
            .orElseThrow(() -> new EntityNotFoundException("Category not found: " + dto.getCategoryId()));
        Location l = locRepo.findById(dto.getLocationId())
            .orElseThrow(() -> new EntityNotFoundException("Location not found: " + dto.getLocationId()));

        Product p = new Product();
        p.setTitle(dto.getTitle());
        p.setDescription(dto.getDescription());
        p.setPrice(dto.getPrice());
        p.setCategory(c);
        p.setLocation(l);
        p = prodRepo.save(p);
        return toDto(p);
    }

    @Override
    public ProductDto updateProduct(Long id, ProductDto dto) {
        Product p = prodRepo.findById(id)
            .orElseThrow(() -> new EntityNotFoundException("Product not found: " + id));
        p.setTitle(dto.getTitle());
        p.setDescription(dto.getDescription());
        p.setPrice(dto.getPrice());
        p = prodRepo.save(p);
        return toDto(p);
    }

    @Override
    public void deleteProduct(Long id) {
        if (!prodRepo.existsById(id)) {
            throw new EntityNotFoundException("Product not found: " + id);
        }
        prodRepo.deleteById(id);
    }
}