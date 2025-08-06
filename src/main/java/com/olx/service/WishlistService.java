// File: src/main/java/com/olx/service/WishlistService.java
package com.olx.service;

import com.olx.dto.WishlistDto;
import java.util.List;

public interface WishlistService {
    List<WishlistDto> getAll();
    WishlistDto getById(Long id);
    WishlistDto add(Long productId);
    void remove(Long id);
}