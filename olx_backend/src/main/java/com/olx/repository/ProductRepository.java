package com.olx.repository;

import com.olx.Enum.Area;
import com.olx.dto.ProductSummaryDTO;
import com.olx.entity.ProductsEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProductRepository extends JpaRepository<ProductsEntity, Long> {


    // Get products by area and not deleted --> can mention

    List<ProductSummaryDTO> findSummaryByLocationAreaAndIsDeletedFalse(@Param("area") Area area);

    List<ProductsEntity> findByIsDeletedFalse();
    ProductsEntity findByIdAndIsDeletedFalse(Long id);

}
