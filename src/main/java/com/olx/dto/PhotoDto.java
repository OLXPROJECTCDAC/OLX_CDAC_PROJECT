// File: src/main/java/com/olx/dto/PhotoDto.java
package com.olx.dto;

public class PhotoDto {
    private Long id;
    private String url;
    private Long productId;

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getUrl() { return url; }
    public void setUrl(String url) { this.url = url; }

    public Long getProductId() { return productId; }
    public void setProductId(Long productId) { this.productId = productId; }
}