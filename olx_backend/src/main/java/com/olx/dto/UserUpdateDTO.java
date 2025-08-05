package com.olx.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class UserUpdateDTO {

    @NotBlank(message = "First name is required")
    @Size(max = 50, message = "First name must be at most 50 characters")
    private String firstName;

    @NotBlank(message = "Last name is required")
    @Size(max = 50, message = "Last name must be at most 50 characters")
    private String lastName;

    @NotBlank(message = "Mobile number is required")
    @Pattern(regexp = "^[+]?\\d{10,15}$", message = "Invalid mobile number format")
    private String mobileNumber;

    @NotBlank(message = "Password is required")
    @Size(min = 6, message = "Password must be at least 6 characters long")
    private String password;

}
