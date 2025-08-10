package com.olx.dto;

import lombok.*;

/**
 * DTO for sending category data back to the client.
 * Extends BaseDTO to include server-generated fields.
 */
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CategoryResDTO extends BaseDTO {

    private String categoryName;

    private String categoryDetails;

    // The 'active' flag could also be included here if the client needs it.
    // private boolean active;
}