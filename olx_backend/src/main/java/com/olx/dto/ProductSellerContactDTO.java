package com.olx.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ProductSellerContactDTO {
    @JsonProperty("mobileNumber")
    private String mobileNumber;
}
