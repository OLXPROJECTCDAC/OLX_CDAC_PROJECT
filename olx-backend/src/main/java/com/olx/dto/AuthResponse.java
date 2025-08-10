package com.olx.dto;

public class AuthResponse {
    private String accessToken;
    private String tokenType = "Bearer";
    private String email;
    private String firstName;
    private String lastName;

    public AuthResponse(String accessToken, String email, String firstName, String lastName) {
        this.accessToken = accessToken;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    public String getAccessToken() { return accessToken; }
    public String getTokenType() { return tokenType; }
    public String getEmail() { return email; }
    public String getFirstName() { return firstName; }
    public String getLastName() { return lastName; }
}
