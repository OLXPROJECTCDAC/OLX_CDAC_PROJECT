// File: src/main/java/com/olx/controller/PhotoController.java
package com.olx.controller;

import com.olx.dto.PhotoDto;
import com.olx.service.PhotoService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/photos")
public class PhotoController {
    private final PhotoService service;
    public PhotoController(PhotoService service) { this.service = service; }

    @GetMapping
    public ResponseEntity<List<PhotoDto>> getAll() {
        return ResponseEntity.ok(service.getAllPhotos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PhotoDto> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getPhotoById(id));
    }

    @PostMapping(
      value   = "/upload",
      consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public ResponseEntity<PhotoDto> upload(
        @RequestParam("productId") Long productId,
        @RequestPart("file") MultipartFile file
    ) {
        return ResponseEntity
                 .status(201)
                 .body(service.uploadPhoto(productId, file));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.deletePhoto(id);
        return ResponseEntity.noContent().build();
    }
}
