package com.olx.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class AuthResponseDTO {
    private String accessToken;
    private String tokenType = "Bearer";
    private String email;
    private String firstName;
    private String lastName;
}
