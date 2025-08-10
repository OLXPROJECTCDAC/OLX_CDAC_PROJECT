package com.olx.controller;

import com.olx.Enum.Area;
import com.olx.dto.*;
import com.olx.service.ProductPhotoService;
import com.olx.service.ProductService;
import com.olx.service.ReportService;
import jakarta.validation.Valid;
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

    @PostMapping("/add")
    public ResponseEntity<?> createProduct(@Valid @RequestBody CreateProductNoPhotosDTO request) {

            ProductWithoutPhotosDTO createdProduct  = productService.createProduct(request);

            return ResponseEntity.status(HttpStatus.CREATED).body(Map.of(
                    "message", "Product created successfully",
                    "product", createdProduct,
                    "productId", createdProduct.getId()
            ));


    }

    /*
    Add images to Product --> moved to productphotoscontroller
    URL     - POST /products/{productId}/photos
    Method  - POST
    Payload - Multipart form data (param: images)
    Response - { message, photos, count }
    Access level - Only User, Admin
*/



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

        List<ProductSummaryDTO> summaries = productService.findSummaryByLocationAreaAndIsDeletedFalse(area);
        return ResponseEntity.ok(summaries);
    }

// ========================== Get Product Summary DTO by UserId =========================================
/*
     Get products by UserId (summary only)
     URL     - GET /products/{userId}
     Method  - GET
     Params  - userId
     Response - List of ProductSummaryDTO (id, title, price, area)
     Access level - Open To All
 */

    @GetMapping("/{userId}")
    public ResponseEntity<List<ProductSummaryDTO>> getProductsBySeller(@PathVariable Long userId) {

        List<ProductSummaryDTO> listedProducts = productService.findSummaryByUserIdAndIsDeletedFalse(userId);
        return ResponseEntity.ok(listedProducts);
    }

// ========================== Get Product Detailed View DTO by Id =========================================

    /*
     Get product by id (summary to view on Product view)
     URL     - GET /products/{id}
     Method  - GET
     Params  - product id
     Response - ProductViewDTO (detailed object containing product info, photos, and seller details))
     Access level - Open To All

 */
    @GetMapping("/{id}")
    public ResponseEntity<ProductViewDTO> getDetailedProductById(@PathVariable Long id) {
    ProductViewDTO product = productService.getProductViewById(id);
    return ResponseEntity.ok(product);
}

// ========================== Get Product Summary DTO by Area + Search keywords =========================================
    /*
         Search for products by area and keyword
         URL     - GET /products/search?area=PUNE_CITY&keyword=study table
         Method  - GET
         Params  - area (Enum) + keyword (String)
         Response - List of ProductSummaryDTO
         Access level - Open To All
     */
    @GetMapping("/search")
    public ResponseEntity<List<ProductSummaryDTO>> searchProducts(
            @RequestParam("area") Area area,
            @RequestParam(value = "keyword", required = false) String keyword) {

        List<ProductSummaryDTO> products = productService.searchProducts(area, keyword);
        return ResponseEntity.ok(products);
    }

// ========================== Delete product listing =========================================
    /*
         Delete product listing
         URL     - DELETE /products/delete/{id}
         Method  - DELETE
         Params  - product id
         Response - Confirmation message
         Access level - Logged In User
     */

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProductListingAsUser(@PathVariable Long id){
        productService.deleteProductAsUser(id);
        return ResponseEntity.ok("Product Deleted Successfully!");
    }

// ========================== Get Seller's contact number =========================================

    /*
     Get seller's contact number for a specific product
     URL     - GET /products/{id}/seller-contact
     Method  - GET
     Params  - productid
     Response - ProductSellerContactDTO
     Access level - Authenticated Users Only
 */
    @GetMapping("/{id}/seller-contact")
    public ResponseEntity<ProductSellerContactDTO> getSellerContact(@PathVariable Long id) {
        ProductSellerContactDTO contact = productService.getSellerContact(id);
        return ResponseEntity.ok(contact);
    }
// ========================== Edit a product listing =========================================

    /*
       Edit a product listing
       URL     - PUT /products/{productId}
       Method  - PUT
       Payload - JSON body (UpdateProductDTO)
       Response - The updated ProductWithoutPhotosDTO
       Access level - Logged-in User (Seller) or Admin
   */
    @PutMapping("/{productId}")
    public ResponseEntity<ProductWithoutPhotosDTO> editProductWithoutPhotos(
            @PathVariable Long productId,
            @Valid @RequestBody ProductUpdateWithoutPhotosDTO productUpdateDTO) {

        // ADD a security check here to ensure the logged-in user owns this product.

        ProductWithoutPhotosDTO updatedProduct = productService.updateProduct(productId, productUpdateDTO);
        return ResponseEntity.ok(updatedProduct);
    }

}


