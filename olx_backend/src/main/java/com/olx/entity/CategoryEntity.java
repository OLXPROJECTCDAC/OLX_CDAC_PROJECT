package com.olx.entity;


import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "categories")
@Getter
@Setter
@ToString
public class CategoryEntity extends BaseEntity {

	@Size(max = 500, message = "Description can't exceed 500 characters")
    @Column(name = "category_name", unique = true, nullable = false, columnDefinition = "TEXT")
    private String categoryName;

    @Column(name = "category_details")
    private String categoryDetails;
}