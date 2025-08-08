package com.olx.dto;
import com.olx.Enum.Area;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class ProductUpdateWithoutPhotosDTO extends BaseDTO {

    @NotBlank(message = "Title cannot be empty.")
    @Size(min = 5, max = 100, message = "Title must be between 5 and 100 characters.")
    private String title;

    @NotBlank(message = "Description cannot be empty.")
    @Size(min = 10, max = 1000, message = "Description must be between 10 and 1000 characters.")
    private String description;

    @NotNull(message = "Price cannot be null.")
    @DecimalMin(value = "1.0", inclusive = false, message = "Price must be greater than 0.")
    private BigDecimal price;

    @NotNull(message = "Category ID cannot be null.")
    private Long categoryId;

    @NotNull(message = "Area cannot be null.")
    private Area area;
}
