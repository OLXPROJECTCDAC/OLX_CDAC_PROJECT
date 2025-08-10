package com.olx.service;

import com.olx.Enum.Area;
import com.olx.dto.*;
import com.olx.entity.*;
import com.olx.exception.ResourceNotFoundException;
import com.olx.repository.*;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    //dependency
    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;
    private final LocationRepository locationRepository;
    private final ProductPhotosRepository productPhotosRepository;
    private final ModelMapper modelMapper;



    @Override
    public ProductWithoutPhotosDTO createProduct(CreateProductNoPhotosDTO dto) {
// Get user
        UserEntity user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        // Get category
        CategoryEntity category = categoryRepository.findById(dto.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found"));

//  Get area, derive city/state/pincode
        Area selectedArea = dto.getArea();
        String city = "Pune";
        String state = "Maharashtra";
        String pincode = selectedArea.getPincode();

        // 4. Get or create location
        LocationEntity location = locationRepository
                .findByStateAndCityAndArea(state, city, selectedArea)
                .orElseGet(() -> {
                    LocationEntity loc = new LocationEntity();
                    loc.setState(state);
                    loc.setCity(city);
                    loc.setArea(selectedArea);
                    loc.setPincode(pincode);
                    return locationRepository.save(loc);
                });
        // 5. Build product entity
        ProductsEntity product = new ProductsEntity();
        product.setTitle(dto.getTitle());
        product.setDescription(dto.getDescription());
        product.setPrice(dto.getPrice());
        product.setUser(user);
        product.setCategory(category);
        product.setLocation(location);

        // 6. Save
        ProductsEntity savedProduct = productRepository.save(product);

//        return modelMapper.map(savedProduct, ProductWithoutPhotosDTO.class);
//        will not automatically map nested properties like user.id -> userId,
//        category.id -> categoryId, location.area -> area.
//        That leads to userId, categoryId, categoryName, area being null in the DTO.

        // Convert to response DTO
        ProductWithoutPhotosDTO response = new ProductWithoutPhotosDTO();
        response.setId(savedProduct.getId());
        response.setTitle(savedProduct.getTitle());
        response.setPrice(savedProduct.getPrice());
        response.setDescription(savedProduct.getDescription());
        response.setCategoryId(savedProduct.getCategory().getId());
        response.setCategoryName(savedProduct.getCategory().getCategoryName());
        response.setArea(savedProduct.getLocation().getArea());


        return response;
    }

// ==============================================================================================================

    @Override
    public List<ProductSummaryDTO> findSummaryByLocationAreaAndIsDeletedFalse(Area area) {
        return productRepository.findSummaryByLocationAreaAndIsDeletedFalse(area);
    }

// ==============================================================================================================
    @Override
    public List<ProductSummaryDTO> findSummaryByUserIdAndIsDeletedFalse(Long userId) {
        return productRepository.findSummaryByUserIdAndIsDeletedFalse(userId);
    }


// ==============================================================================================================

public ProductViewDTO getProductViewById(Long productId) {
    // 1. Fetch the main product and seller details
    ProductViewDTO productView = productRepository.findProductViewById(productId)
            .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + productId));

    // 2. Fetch all photo URLs for the given product
    List<ProductPhotosEntity> photos = productPhotosRepository.findByProductIdAndIsDeletedFalse(productId);
    List<String> photoUrls = photos.stream()
            .map(ProductPhotosEntity::getSecureUrl)
            .collect(Collectors.toList());

    // 3. Set the photo URLs in the DTO
    productView.setPhotoUrl(photoUrls);

    return productView;
}


// ==============================================================================================================
@Override
public List<ProductSummaryDTO> searchProducts(Area area, String keyword) {
    if (keyword == null || keyword.trim().isEmpty()) {
        return productRepository.findSummaryByLocationAreaAndIsDeletedFalse(area);
        // empty keyword should return all products in area
    }
    return productRepository.searchByAreaAndKeyword(area, keyword);
}

// ============================== Soft Delete a Product =====================================================

    @Override
    public void deleteProductAsUser(Long productId) {

        if(!productRepository.existsById(productId)){
            throw new ResourceNotFoundException("Product with ID " + productId + " not found.");
        }
        productRepository.softDeleteById(productId);

    }
// ================================ Fetch Seller's Contact Number =======================================================
    @Override
    public ProductSellerContactDTO getSellerContact(Long productId) {
        // Call the new, optimized repository method directly
        return productRepository.findSellerContactByProductId(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product with ID " + productId + " not found or has been deleted."));
    }

// ================================ Update Product Photos =======================================================

    @Override
    public ProductWithoutPhotosDTO updateProduct(Long productId, ProductUpdateWithoutPhotosDTO productUpdateDTO) {
//        Find the existing product or throw an error
        ProductsEntity existingProduct = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product by "+ productId + " does not exist!"));

//        Find the new category if it's being changed
        if (productUpdateDTO.getCategoryId() != null){
            CategoryEntity newCategory = categoryRepository.findById(productUpdateDTO.getCategoryId())
                    .orElseThrow(() -> new ResourceNotFoundException("Category Not Found!"));
            existingProduct.setCategory(newCategory);
        }

//        Find the new area if it's being changed --> same logic as used in create product
        // Update the location if a new area is provided
        if (productUpdateDTO.getArea() != null) {
            Area newArea = productUpdateDTO.getArea();
            String city = "Pune"; // These are constant for now
            String state = "Maharashtra";
            String pincode = newArea.getPincode();

            // Find if a location with this area already exists, or create a new one
            LocationEntity newLocation = locationRepository
                    .findByStateAndCityAndArea(state, city, newArea)
                    .orElseGet(() -> {
                        LocationEntity loc = new LocationEntity();
                        loc.setState(state);
                        loc.setCity(city);
                        loc.setArea(newArea);
                        loc.setPincode(pincode);
                        return locationRepository.save(loc);
                    });

            existingProduct.setLocation(newLocation);
        }

//        Update the product's fields with the new data from the DTO
        existingProduct.setTitle(productUpdateDTO.getTitle());
        existingProduct.setDescription(productUpdateDTO.getDescription());
        existingProduct.setPrice(productUpdateDTO.getPrice());

//        Save the updated product back to the database
        ProductsEntity savedProduct = productRepository.save(existingProduct);

//        Map the updated entity back to a DTO for the response
        return modelMapper.map(savedProduct, ProductWithoutPhotosDTO.class);
    }

// ================================ Update Product with Photos =======================================================
    @Override
    public ProductWithPhotosDTO getProductWithPhotos(Long productId) {
        // Find the product or throw an error
        ProductsEntity product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + productId));

        // Fetch the non-deleted photos for this product
        List<ProductPhotosEntity> photos = productPhotosRepository.findByProductIdAndIsDeletedFalse(productId);

        //null-checks
        if (product.getCategory() == null) {
            throw new ResourceNotFoundException("Category missing for product " + productId);
        }
        if (product.getLocation() == null) {
            throw new ResourceNotFoundException("Location missing for product " + productId);
        }

        // Map the product entity to the DTO
        ProductWithPhotosDTO productDTO = new ProductWithPhotosDTO();
        productDTO.setId(product.getId());
        productDTO.setTitle(product.getTitle());
        productDTO.setDescription(product.getDescription());
        productDTO.setPrice(product.getPrice());
        productDTO.setCategoryId(product.getCategory().getId());
        productDTO.setCategoryName(product.getCategory().getCategoryName());
        productDTO.setArea(product.getLocation().getArea());


        // Map the photo entities to photo DTOs
        productDTO.setPhotos(
                photos.stream()
                        .map(this::mapToPhotoDTO)
                        .toList()
        );

        return productDTO;
    }

    // Helper method to map photo entity to DTO (you might already have this)
    private ProductPhotoDTO mapToPhotoDTO(ProductPhotosEntity photoEntity) {
        ProductPhotoDTO dto = new ProductPhotoDTO();
        dto.setId(photoEntity.getId());
        dto.setSecureUrl(photoEntity.getSecureUrl());
        dto.setPosition(photoEntity.getPosition());
        // ... set other fields if needed
        return dto;
    }
}



