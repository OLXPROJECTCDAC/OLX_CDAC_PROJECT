package com.olx.dto;

import com.olx.Enum.Area;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Setter
@Getter
public class ProductViewDTO extends BaseDTO{
    private String title;
    private BigDecimal price;
    private String description;
    private Area area;
    private List<String> photoUrl;
    private UserSummaryForProductViewDTO seller;

//ctor
    public ProductViewDTO (Long id, String title, BigDecimal price, String description, Area area, String firstName, String lastName,  LocalDateTime createdAt, Long totalProductsListedTillNow) {
    this.setId(id);
    this.title = title;
    this.price = price;
    this.description = description;
    this.area=area;
    this.seller=new UserSummaryForProductViewDTO(firstName, lastName, createdAt, totalProductsListedTillNow);

    }



}
