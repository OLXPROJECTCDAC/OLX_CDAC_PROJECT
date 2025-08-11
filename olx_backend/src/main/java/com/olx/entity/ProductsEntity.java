package com.olx.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;


@Entity
@Table(name = "products") // Using plural name for consistency
@AttributeOverride(name = "id", column = @Column(name = "product_id"))
@Getter
@Setter
public class ProductsEntity extends BaseEntity {

    /**
     * The user who created and owns the product listing.
     * This is a required relationship.
     */
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity user;

    /**
     * The category this product belongs to (e.g., "Electronics", "Furniture").
     * This is a required relationship.
     */
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "category_id", nullable = false)
    private CategoryEntity category;


    @NotBlank(message = "Title cannot be blank.")
    @Size(max = 150, message = "Title cannot exceed 150 characters.")
    @Column(name = "title", nullable = false, length = 150)
    private String title;


    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    /**
     * The selling price of the product.
     * It must be a non-null, non-negative value.
     * 'precision' is the total number of digits, 'scale' is the number of digits after the decimal point.
     */
    @NotNull(message = "Price cannot be null.")
    @DecimalMin(value = "0.0", message = "Price must be a non-negative value.")
    @Column(name = "price", nullable = false, precision = 10, scale = 2)
    private BigDecimal price;

    /**
     * The location where the product is being sold from.
     * This is a required relationship.
     */
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "location_id", nullable = false)
    private LocationEntity location;

    /**
     * A set of photos associated with this product.
     * When a product is soft-deleted, its photos will remain in the database.
     * The application logic is responsible for hiding photos of a soft-deleted product.
     */
    @OneToMany(mappedBy = "product")
    private Set<ProductPhotosEntity> photos = new HashSet<>();


    // --- Soft Deletion Fields ---

    @Column(name = "is_deleted", nullable = false)
    private boolean isDeleted = false;

    @Column(name = "deleted_at")
    private LocalDateTime deletedAt;
}