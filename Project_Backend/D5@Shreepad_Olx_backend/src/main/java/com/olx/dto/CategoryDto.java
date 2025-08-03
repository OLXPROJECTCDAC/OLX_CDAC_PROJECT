package com.olx.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@ToString
public class CategoryDto {
@JsonProperty(access = Access.READ_ONLY)
private int categoryId;
@JsonProperty(access = Access.READ_ONLY)
private String categoryName;
@JsonProperty(access = Access.READ_ONLY)
private String description;
}
