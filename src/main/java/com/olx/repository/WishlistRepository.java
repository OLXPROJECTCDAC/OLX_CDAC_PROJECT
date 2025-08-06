// File: src/main/java/com/olx/repository/WishlistRepository.java
package com.olx.repository;

import com.olx.entity.Wishlist;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WishlistRepository extends JpaRepository<Wishlist, Long> {
}