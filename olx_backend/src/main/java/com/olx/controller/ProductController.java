package com.olx.controller;

import com.olx.Enum.Area;
import com.olx.dto.*;
import com.olx.service.ProductPhotoService;
import com.olx.service.ProductService;
import com.olx.service.ReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/products")
@RequiredArgsConstructor
public class ProductController {

    //dependency
    private final ProductService productService;
    private final ReportService reportService;
    private final ProductPhotoService productPhotoService;


// ========================== Add Product With Photos =========================================
     /*
    Add a product
    URL     - POST /products/add
    Method  - POST
    Payload - JSON body (CreateProductNOPhotosDTO)
    Response - ProductWithoutPhotosDTO
    Access level - Only User, Admin
*/

    @PostMapping
    public ResponseEntity<?> createProduct(@RequestBody CreateProductNoPhotosDTO request) {
        try {
            ProductWithoutPhotosDTO createdProduct  = productService.createProduct(request);

            return ResponseEntity.status(HttpStatus.CREATED).body(Map.of(
                    "message", "Product created successfully",
                    "product", createdProduct,
                    "productId", createdProduct.getId()
            ));

        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", e.getMessage()));
        }
    }

    /*
    Add images to Product
    URL     - POST /products/{productId}/photos
    Method  - POST
    Payload - Multipart form data (param: images)
    Response - { message, photos, count }
    Access level - Only User, Admin
*/
    @PostMapping("/{productId}/photos")
    public ResponseEntity<?> uploadProductPhotos(
            @PathVariable Long productId,
            @RequestParam("images") List<MultipartFile> images) {

        try {
            // Validate at least one photo is required
            if (images == null || images.isEmpty()) {
                return ResponseEntity.badRequest()
                        .body(Map.of("error", "At least one photo is required"));
            }

            List<ProductPhotoDTO> uploadedPhotos = productPhotoService.uploadPhotos(productId, images);

            return ResponseEntity.ok(Map.of(
                    "message", "Photos uploaded successfully",
                    "photos", uploadedPhotos,
                    "count", uploadedPhotos.size()
            ));

        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", e.getMessage()));
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Failed to upload images"));
        }
    }


// ========================== Report a Product =========================================
    /*
    Report a product
    URL     - POST /products/{productId}/report
    Method  - POST
    Payload - JSON body (ReportRequestDTO)
    Response - Success message or ReportResponseDTO
    Access level - Only User, Admin
*/

    @PostMapping("/{productId}/report")
    public ResponseEntity<String> reportProduct(
            @PathVariable Long productId,
            @RequestBody ReportRequestDTO reportDTO) {

        reportDTO.setProductId(productId);
        reportService.fileReport(reportDTO);
        return ResponseEntity.ok("Product reported successfully.");
    }

// ========================== Get Product Summary DTO by Area =========================================
/*
     Get products by area (summary only)
     URL     - GET /products/by-area?area=KOREGAON
     Method  - GET
     Params  - area (Area enum value from dropdown)
     Response - List of ProductSummaryDTO (id, title, price, area)
     Access level - Open To All
 */

    @GetMapping("/by-area")
    public ResponseEntity<List<ProductSummaryDTO>> getProductsByArea(@RequestParam Area area) {
        // FIX: Call the correct method from the service.
        List<ProductSummaryDTO> summaries = productService.findSummaryByLocationAreaAndIsDeletedFalse(area);
        return ResponseEntity.ok(summaries);
    }

// ========================== xxxxxxxxxxxxxxxxxxxxxxx =========================================

}
