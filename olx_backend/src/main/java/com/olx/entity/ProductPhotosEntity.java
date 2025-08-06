package com.olx.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.AttributeOverride;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

@Entity
@Table(name = "product_photos")
@AttributeOverride(name = "id", column = @Column(name = "photo_id"))
@Getter
@Setter
@ToString
public class ProductPhotosEntity extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "product_id", nullable = false)
    private ProductsEntity product;

    @Column(name = "public_id", length = 1024, nullable = false)
    private String publicId;

    @Column(name = "secure_url", columnDefinition = "TEXT", nullable = false)
    private String secureUrl;

    @Column(name = "position", nullable = false)
    private int position;

    @Column(name = "is_primary", nullable = false)
    private boolean isPrimary = false;

    @Column(name = "is_deleted", nullable = false)
    private boolean isDeleted = false;

    @Column(name = "deleted_at")
    private LocalDateTime deletedAt;
}
