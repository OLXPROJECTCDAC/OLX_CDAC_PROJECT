package com.olx.entity;

import jakarta.persistence.*;

import lombok.*;






import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Getter
@Setter

@RequiredArgsConstructor


@ToString
public class UserEntity extends BaseEntity {

    @Column(name = "first_name", nullable = false)
    private String firstName;

    @Column(name = "last_name", nullable = false)
    private String lastName;

    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @Column(name = "password_hash", nullable = false)
    private String passwordHash;

    @Column(name = "mobile_number", length = 15, unique = true)
    private String mobileNumber;

    // FK to product_photos table
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "photo_id", referencedColumnName = "photo_id")
    private ProductPhotosEntity photoId;

    @Column(name = "is_active", nullable = false, columnDefinition = "TINYINT(1) default 1")
    private boolean isActive = true;

    @Column(name = "is_email_verified", nullable = false, columnDefinition = "TINYINT(1) default 0")
    private boolean isEmailVerified = false;

    @Column(name = "is_seller", nullable = false, columnDefinition = "TINYINT(1) default 0")
    private boolean isSeller = false;

    @Column(name = "is_buyer", nullable = false, columnDefinition = "TINYINT(1) default 0")
    private boolean isBuyer = false;

    @Column(name = "is_admin", nullable = false, columnDefinition = "TINYINT(1) default 0")
    private boolean isAdmin = false;

    @Column(name = "is_both", nullable = false, columnDefinition = "TINYINT(1) default 0")
    private boolean isBoth = false;

    @Column(name = "last_login")
    private LocalDateTime lastLogin;

    // FK to packages table
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "package_id", nullable = true)
    private PackageEntity packageId;
}
