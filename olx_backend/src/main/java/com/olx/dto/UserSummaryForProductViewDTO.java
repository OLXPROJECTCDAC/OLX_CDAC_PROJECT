package com.olx.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
public class UserSummaryForProductViewDTO {
    private String firstName;
    private String lastName;
//    private String phone; --> visible only to logged in user via SellerContactDTO
    private LocalDateTime createdAt;
    private Long totalProductsListedTillNow;
}
