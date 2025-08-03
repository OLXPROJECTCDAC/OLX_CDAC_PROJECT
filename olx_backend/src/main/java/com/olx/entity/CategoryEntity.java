package com.olx.entity;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "categories")
@Getter
@Setter
@ToString
public class CategoryEntity extends BaseEntity {

    @Column(name = "category_name", unique = true, nullable = false, length = 100)
    private String categoryName;

    @Column(name = "category_details")
    private String categoryDetails;
}