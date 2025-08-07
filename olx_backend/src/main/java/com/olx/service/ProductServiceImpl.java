package com.olx.service;

import com.olx.Enum.Area;
import com.olx.dto.CreateProductNoPhotosDTO;
import com.olx.dto.ProductWithoutPhotosDTO;
import com.olx.entity.CategoryEntity;
import com.olx.entity.LocationEntity;
import com.olx.entity.ProductsEntity;
import com.olx.entity.UserEntity;
import com.olx.exception.ResourceNotFoundException;
import com.olx.repository.CategoryRepository;
import com.olx.repository.LocationRepository;
import com.olx.repository.ProductRepository;
import com.olx.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import com.olx.dto.ProductSummaryDTO;
import org.springframework.transaction.annotation.Transactional;

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

        return modelMapper.map(savedProduct, ProductWithoutPhotosDTO.class);

//        // 7. Convert to response DTO
//        ProductWithoutPhotosDTO response = new ProductWithoutPhotosDTO();
//        response.setId(savedProduct.getId());
//        response.setTitle(savedProduct.getTitle());
//        response.setPrice(savedProduct.getPrice());
//        response.setDescription(savedProduct.getDescription());
//        response.setArea(location.getArea());
//
//
//        return response;
    }

// ==============================================================================================================

    @Override
    public List<ProductSummaryDTO> findSummaryByLocationAreaAndIsDeletedFalse(Area area) {
        return productRepository.findSummaryByLocationAreaAndIsDeletedFalse(area);
    }


    @Override
    public List<ProductSummaryDTO> getAllProducts() {

       return productRepository.findByIsDeletedFalse()
                .stream()
                .map(product -> {
                    ProductSummaryDTO dto = new ProductSummaryDTO();
                    dto.setId(product.getId());
                    dto.setTitle(product.getTitle());
                    dto.setPrice(product.getPrice());
                    return dto;
                })
                .collect(Collectors.toList());

    }

    @Override
    public void deleteProductById(Long id) {

    }
}

// ==============================================================================================================


// ==============================================================================================================


// ==============================================================================================================


