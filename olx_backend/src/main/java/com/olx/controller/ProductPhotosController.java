package com.olx.controller;


import com.olx.dto.ProductPhotoDTO;
import com.olx.service.ProductPhotoService;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/products/{productId}/photos")
@RequiredArgsConstructor

public class ProductPhotosController {

    //    dependency
    private final ProductPhotoService productPhotoService;

// ========================== ADD A PHOTO =========================================
    /*
    Add images to Product
    URL     - POST /products/{productId}/photos
    Method  - POST
    Payload - Multipart form data (param: images)
    Response - { message, photos, count }
    Access level - Only User, Admin
*/
    @PostMapping
    public ResponseEntity<?> uploadPhotos(
            @PathVariable Long productId,
            @RequestParam("images") List<MultipartFile> images)  throws IOException {


            // Validate at least one photo is required ( || -> OR )
        if (images == null || images.isEmpty() || images.get(0).isEmpty()) {
            throw new IllegalArgumentException("At least one photo is required.");
        }
        for (MultipartFile file : images) {
            if (file == null || file.isEmpty()) throw new BadRequestException("One of the images is empty");
        }

        List<ProductPhotoDTO> uploadedPhotos = productPhotoService.uploadPhotos(productId, images);

        return ResponseEntity.status(HttpStatus.CREATED).body(Map.of(
                "message", "Photos uploaded successfully",
                "photos", uploadedPhotos,
                "count", uploadedPhotos.size() ));
        }

// ========================== SOFT-DELETE A PHOTO =========================================
    /* URL     - DELETE /products/{productId}/photos/{photoId}
       Method  - DELETE
       Payload - PhotoId, productId
       Response - String
       Access level - Logged-in User (Seller)  */

    @DeleteMapping("/{photoId}")
    public ResponseEntity<?> softDeletePhoto(@PathVariable Long photoId, @PathVariable Long productId) {

        productPhotoService.softDeletePhoto(productId, photoId);
        return ResponseEntity.noContent().build();

    }
}


