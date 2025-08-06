// File: src/main/java/com/olx/service/impl/WishlistServiceImpl.java
package com.olx.service.impl;

import com.olx.dto.WishlistDto;
import com.olx.entity.Product;
import com.olx.entity.Wishlist;
import com.olx.repository.ProductRepository;
import com.olx.repository.WishlistRepository;
import com.olx.service.WishlistService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class WishlistServiceImpl implements WishlistService {
    private final WishlistRepository repo;
    private final ProductRepository prodRepo;

    public WishlistServiceImpl(WishlistRepository repo, ProductRepository prodRepo) {
        this.repo = repo;
        this.prodRepo = prodRepo;
    }

    private WishlistDto toDto(Wishlist w) {
        WishlistDto dto = new WishlistDto();
        dto.setId(w.getId());
        dto.setProductId(w.getProduct().getId());
        dto.setAddedAt(w.getAddedAt());
        return dto;
    }

    @Override
    public List<WishlistDto> getAll() {
        return repo.findAll().stream()
                   .map(this::toDto)
                   .collect(Collectors.toList());
    }

    @Override
    public WishlistDto getById(Long id) {
        Wishlist w = repo.findById(id)
            .orElseThrow(() -> new EntityNotFoundException("Wishlist entry not found: " + id));
        return toDto(w);
    }

    @Override
    public WishlistDto add(Long productId) {
        Product p = prodRepo.findById(productId)
            .orElseThrow(() -> new EntityNotFoundException("Product not found: " + productId));

        Wishlist w = new Wishlist();
        w.setProduct(p);
        w = repo.save(w);
        return toDto(w);
    }

    @Override
    public void remove(Long id) {
        if (!repo.existsById(id)) {
            throw new EntityNotFoundException("Wishlist entry not found: " + id);
        }
        repo.deleteById(id);
    }
}