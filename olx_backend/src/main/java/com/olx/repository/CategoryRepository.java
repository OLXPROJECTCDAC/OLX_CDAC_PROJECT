package com.olx.repository;

import com.olx.entity.CategoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface CategoryRepository extends JpaRepository<CategoryEntity, Long> {

    /**
     * Checks if a category with the given name exists.
     * Corrected from existsByName to existsByCategoryName.
     */
    boolean existsByCategoryName(String categoryName);

    /**
     * Finds a category by its exact name.
     * Corrected from findByName to findByCategoryName.
     */
    Optional<CategoryEntity> findByCategoryName(String categoryName);

    /**
     * Finds categories where the name contains the given keyword, ignoring case.
     * Corrected from findByNameContainingIgnoreCase to findByCategoryNameContainingIgnoreCase.
     */
    List<CategoryEntity> findByCategoryNameContainingIgnoreCase(String keyword);

    // The findAll(Pageable pageable) method is inherited from JpaRepository and does not need to be redeclared.
}
