package com.olx.repository;

import com.olx.Enum.Area;
import com.olx.dto.ProductSellerContactDTO;
import com.olx.dto.ProductSummaryDTO;
import com.olx.dto.ProductViewDTO;
import com.olx.entity.ProductsEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<ProductsEntity, Long> {


// Get products by area and not deleted --> can mention
    @Query("SELECT new com.olx.dto.ProductSummaryDTO(p.title, p.price, p.description, p.location.area, " +
            // This subquery now *only* gets the image at position 1
            "(SELECT ph.secureUrl FROM ProductPhotosEntity ph WHERE ph.product = p AND ph.position = 1)) " +
            "FROM ProductsEntity p WHERE p.location.area = :area AND p.isDeleted = false")
    List<com.olx.dto.ProductSummaryDTO> findSummaryByLocationAreaAndIsDeletedFalse(@Param("area") Area area);

// ===================================================================================================================

    @Query("""
    SELECT new com.olx.dto.ProductSummaryDTO(
        p.title,
        p.price,
        p.description,
        p.location.area,
        (SELECT ph.secureUrl
         FROM ProductPhotosEntity ph
         WHERE ph.product = p AND ph.position = 1 AND ph.isDeleted = false)
    )
    FROM ProductsEntity p
    WHERE p.user.id = :userId AND p.isDeleted = false
    ORDER BY p.createdAt DESC
""")
    List<com.olx.dto.ProductSummaryDTO> findSummaryByUserIdAndIsDeletedFalse(@Param("userId") Long userId);

// ===================================================================================================================

    @Query("""
    SELECT new com.olx.dto.ProductViewDTO(
        p.id,
        p.title,
        p.price,
        p.description,
        p.location.area,  // Corrected line
        u.firstName,
        u.lastName,
        u.createdAt,
        (SELECT COUNT(p2) FROM ProductsEntity p2 WHERE p2.user = u AND p2.isDeleted = false)
    )
    FROM ProductsEntity p JOIN p.user u
    WHERE p.id = :productId AND p.isDeleted = false
""")
    Optional<com.olx.dto.ProductViewDTO> findProductViewById(@Param("productId") Long productId);

// ===================================================================================================================

    @Query("""
    SELECT new com.olx.dto.ProductSummaryDTO(
        p.title, 
        p.price, 
        p.description, 
        p.location.area,
        (
            SELECT ph.secureUrl 
            FROM ProductPhotosEntity ph 
            WHERE ph.product = p 
              AND ph.position = 1
        ) )
    FROM ProductsEntity p
    WHERE p.location.area = :area
      AND (
          LOWER(p.title) LIKE LOWER(CONCAT('%', :keyword, '%'))
          OR LOWER(p.description) LIKE LOWER(CONCAT('%', :keyword, '%'))
      )
      AND p.isDeleted = false
""")
    List<com.olx.dto.ProductSummaryDTO> searchByAreaAndKeyword(@Param("area") Area area, @Param("keyword") String keyword);


// Why use + and split the query?
//Readability: Long strings (especially SQL/JPQL) are easier to read and maintain when broken into lines.
//🔹 When not to use + --> Starting in Java 15+, using text blocks """ """

//LOWER(...) is used to make the search case-insensitive

//CONCAT('%', :keyword, '%') adds wildcards before and after the keyword so that it can match anywhere inside the text.
// ===================================================================================================================

    @Modifying
    @Query("UPDATE ProductsEntity p SET p.isDeleted = true WHERE p.id = :productId")
    void softDeleteById(@Param("productId") Long productId );

// ===================================================================================================================

    @Query("""
        SELECT new com.olx.dto.ProductSellerContactDTO(u.mobileNumber)
        FROM ProductsEntity p JOIN p.user u
        WHERE p.id = :productId AND p.isDeleted = false
    """)
    Optional<com.olx.dto.ProductSellerContactDTO> findSellerContactByProductId(@Param("productId") Long productId);




}