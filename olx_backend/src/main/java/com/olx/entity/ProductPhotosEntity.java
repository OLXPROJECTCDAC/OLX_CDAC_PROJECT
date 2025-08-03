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

    @Column(name = "s3_key", length = 255, nullable = false)
    private String s3Key;

    @Column(name = "s3_url", columnDefinition = "TEXT", nullable = false)
    private String s3Url;

    @Column(name = "position", nullable = false)
    private int position;

    @Column(name = "is_primary", nullable = false)
    private boolean isPrimary;

}
