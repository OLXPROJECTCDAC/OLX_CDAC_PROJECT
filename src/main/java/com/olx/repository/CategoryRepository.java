// File: src/main/java/com/olx/repository/CategoryRepository.java
package com.olx.repository;

import com.olx.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
}