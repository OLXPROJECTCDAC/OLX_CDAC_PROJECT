package com.olx.service;

import com.cloudinary.Cloudinary;
import com.olx.Enum.Area;
import com.olx.dto.CreateProductNoPhotosDTO;
import com.olx.dto.ProductSummaryDTO;
import com.olx.dto.ProductWithoutPhotosDTO;
import com.olx.repository.ProductPhotosRepository;
import com.olx.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Transactional

public interface ProductService {




//    List<ProductSummaryDTO> getProductSummariesByArea(Area area);
    List<ProductSummaryDTO> findSummaryByLocationAreaAndIsDeletedFalse(Area area);

    ProductWithoutPhotosDTO createProduct(CreateProductNoPhotosDTO dto);

    // ==============================================================================================================
//to get all products
    List<ProductSummaryDTO> getAllProducts();
   // to delete a product(soft delte is there)
    void deleteProductById(Long id);
}
