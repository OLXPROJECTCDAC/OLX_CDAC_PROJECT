package com.olx.dto;
import com.olx.Enum.Area;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class ProductWithoutPhotosDTO extends BaseDTO{

    private String title;
    private String description;
    private BigDecimal price;

    private Long userId;

    private Long categoryId;
    private String categoryName;

    private Area area;

    private boolean isDeleted;
    private LocalDateTime deletedAt;
    private int views;




}
