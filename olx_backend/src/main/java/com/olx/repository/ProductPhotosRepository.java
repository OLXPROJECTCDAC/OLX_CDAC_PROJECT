package com.olx.repository;

import com.olx.entity.ProductPhotosEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductPhotosRepository extends JpaRepository<ProductPhotosEntity, Long> {
    // Find all photos for a product ordered by their position ascending
    List<ProductPhotosEntity> findByProductIdOrderByPositionAsc(Long productId);

    // Find by productId without order if needed
    List<ProductPhotosEntity> findByProductIdAndIsDeletedFalse (Long productId);


}
