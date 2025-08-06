// File: src/main/java/com/olx/service/PhotoService.java
package com.olx.service;

import com.olx.dto.PhotoDto;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;

public interface PhotoService {
    List<PhotoDto> getAllPhotos();
    PhotoDto getPhotoById(Long id);
    PhotoDto uploadPhoto(Long productId, MultipartFile file);
    void deletePhoto(Long id);
}