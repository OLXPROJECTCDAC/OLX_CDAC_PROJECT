package com.olx.service;


import com.olx.Enum.Area;
import com.olx.dto.*;
import org.springframework.web.multipart.MultipartFile;


import java.io.IOException;
import java.util.List;


public interface ProductService {

    List<ProductSummaryDTO> findSummaryByLocationAreaAndIsDeletedFalse(Area area);

    List<ProductSummaryDTO>  findSummaryByUserIdAndIsDeletedFalse(Long userId);

    // new transactional method for creating a product with photos.
    ProductWithoutPhotosDTO createProduct(CreateProductNoPhotosDTO dto, List<MultipartFile> images) throws IOException;

    ProductViewDTO getProductViewById(Long productId);

    List<ProductSummaryDTO> searchProducts(Area area, String keyword);

    void deleteProductAsUser(Long productId);

    ProductSellerContactDTO getSellerContact(Long productId);

    ProductWithoutPhotosDTO updateProduct(Long productId, ProductUpdateWithoutPhotosDTO productUpdateDTO);

    ProductWithPhotosDTO getProductWithPhotos(Long productId);



    // ==============================================================================================================

}