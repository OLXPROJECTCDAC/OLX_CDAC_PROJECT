package com.olx.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class ProductPhotoDTO extends BaseDTO {

    private String publicId;

    private String secureUrl;

    private int position;

    private boolean isPrimary;

    private boolean isDeleted; // reflects soft-delete status

    private LocalDateTime deletedAt; // optional, useful for admin or audit view
}
