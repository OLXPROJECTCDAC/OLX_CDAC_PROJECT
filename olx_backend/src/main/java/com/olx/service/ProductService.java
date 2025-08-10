package com.olx.service;


import com.olx.Enum.Area;
import com.olx.dto.*;


import java.util.List;


public interface ProductService {


    //    List<ProductSummaryDTO> getProductSummariesByArea(Area area);
    List<ProductSummaryDTO> findSummaryByLocationAreaAndIsDeletedFalse(Area area);

    List<ProductSummaryDTO>  findSummaryByUserIdAndIsDeletedFalse(Long userId);

    ProductWithoutPhotosDTO createProduct(CreateProductNoPhotosDTO dto);

    ProductViewDTO getProductViewById(Long productId);

    List<ProductSummaryDTO> searchProducts(Area area, String keyword);

    void deleteProductAsUser(Long productId);

    ProductSellerContactDTO getSellerContact(Long productId);

    ProductWithoutPhotosDTO updateProduct(Long productId, ProductUpdateWithoutPhotosDTO productUpdateDTO);

    ProductWithPhotosDTO getProductWithPhotos(Long productId);



    // ==============================================================================================================

}
