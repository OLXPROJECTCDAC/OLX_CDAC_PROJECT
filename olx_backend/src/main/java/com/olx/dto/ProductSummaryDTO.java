package com.olx.dto;

import com.olx.Enum.Area;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class ProductSummaryDTO extends BaseDTO{

    private String title;
    private BigDecimal price;
    private Area area;

}
