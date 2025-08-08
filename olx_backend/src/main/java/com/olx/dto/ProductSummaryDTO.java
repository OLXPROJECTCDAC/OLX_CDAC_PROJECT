package com.olx.dto;

import com.olx.Enum.Area;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class ProductSummaryDTO extends BaseDTO {

    private String title;
    private BigDecimal price;
    private String description;
    private Area area;
    private String imageUrl;

    // The constructor is now simpler
    public ProductSummaryDTO(String title, BigDecimal price, String description, Area area, String imageUrl) {
        this.title = title;
        this.price = price;
        this.description = description;
        this.area = area;
        this.imageUrl = imageUrl; // Directly assign the URL from the query
    }
}