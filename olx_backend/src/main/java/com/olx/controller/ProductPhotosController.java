package com.olx.controller;

import com.olx.service.ProductPhotoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/products/{productId}/photos")
@RequiredArgsConstructor
public class ProductPhotosController {

    private final ProductPhotoService productPhotoService;

    // The @PostMapping for uploading photos has been removed from this controller.
    // That logic is now handled transactionally in the ProductController's "/add" endpoint.

    // ========================== SOFT-DELETE A PHOTO =========================================
    /*
     * URL - DELETE /products/{productId}/photos/{photoId}
     * Method - DELETE
     * Payload - PhotoId, productId from the path
     * Response - No Content (204)
     * Access level - Logged-in User (Seller)
     */
    @DeleteMapping("/{photoId}")
    public ResponseEntity<?> softDeletePhoto(@PathVariable Long productId, @PathVariable Long photoId) {
        productPhotoService.softDeletePhoto(productId, photoId);
        return ResponseEntity.noContent().build();
    }
}