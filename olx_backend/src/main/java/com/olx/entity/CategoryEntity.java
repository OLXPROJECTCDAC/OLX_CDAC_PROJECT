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
@AttributeOverride(name = "id", column = @Column(name = "category_id"))
public class CategoryEntity extends BaseEntity {



    @Column(name = "category_name", unique = true, nullable = false, length = 100)

	
    private String categoryName;


    @Column(name = "category_details", columnDefinition = "TEXT")
    private String categoryDetails;

    /**
     * A flag to determine if the category is active. Used for soft deletes.
     * It defaults to 'true' and cannot be null.
     */
    @Column(name = "active", nullable = false)
    private boolean active = true;
}