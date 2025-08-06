package com.olx.dto;

import com.olx.Enum.Area;
import com.olx.entity.CategoryEntity;
import com.olx.entity.LocationEntity;
import com.olx.entity.UserEntity;
import jakarta.persistence.Column;
import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
public class CreateProductNoPhotosDTO extends BaseDTO{
    @NotNull(message = "User ID is required")
    private Long userId;

    @NotNull(message = "Category ID is required")
    private Long categoryId;

    @NotBlank(message = "Title is required")
    @Size(max = 150, message = "Title cannot exceed 150 characters")
    private String title;

    @NotBlank(message = "Description is required")
    @Size(max = 5000, message = "Description cannot exceed 5000 characters")
    private String description;

    @NotNull(message = "Price is required")
    @DecimalMin(value = "0.01", message = "Price must be greater than 0")
    @Digits(integer = 8, fraction = 2, message = "Price must have maximum 8 digits before decimal and 2 after")
    private BigDecimal price;

    @NotNull(message = "Area is required")
    private Area area;
}
