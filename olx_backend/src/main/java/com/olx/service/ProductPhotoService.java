package com.olx.service;

import com.olx.dto.ProductPhotoDTO;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface ProductPhotoService {

    List<ProductPhotoDTO> uploadPhotos (Long productId, List<MultipartFile> images) throws IOException;

    List<ProductPhotoDTO> getPhotosForProduct (Long productId);

    void deletePhoto (Long productId, Long photoId);
}
