package com.olx.entity;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;
import java.util.List;


@Entity
@Table(name = "users")
@Getter
@Setter
// This annotation allows you to override the column mappings of inherited fields.
@AttributeOverride(name = "id", column = @Column(name = "user_id"))
public class UserEntity extends BaseEntity {


    // --- Core User Attributes ---
    // Combined from both entities, using the more specific column definitions where available.
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


    // --- Role and Status Management ---
    // User-requested boolean flags for role and status management.
    @Column(name = "is_active", nullable = false)
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




    // --- Auditing and Metadata ---
    @Column(name = "last_login")
    private LocalDateTime lastLogin;


    // --- Relationships ---
    // All unique relationships from both entities are included.


    // Retained from the second entity
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "package_id")
    private PackageEntity userPackage;


    // Retained from the first entity
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ProductsEntity> products;


    // Retained from the first entity
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<WishlistEntity> wishlists;
}

