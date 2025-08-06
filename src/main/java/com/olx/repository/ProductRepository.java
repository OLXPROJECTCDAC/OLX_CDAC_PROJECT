// File: src/main/java/com/olx/repository/ProductRepository.java
package com.olx.repository;

import com.olx.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {}