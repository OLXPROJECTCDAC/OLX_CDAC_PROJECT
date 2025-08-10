package com.olx.dto;

import jakarta.validation.constraints.*;

public class RegisterRequest {
    @NotBlank private String firstName;
    @NotBlank private String lastName;

    @Email @NotBlank private String email;

    @Pattern(regexp = "^[0-9]{10,15}$", message = "Mobile must be 10-15 digits")
    private String mobileNumber;

    @NotBlank @Size(min = 8, message = "Password must be at least 8 chars")
    private String password;

    private Boolean active;
    private Boolean emailVerified;
    private Boolean seller;
    private Boolean buyer;
    private Boolean admin;
    private Boolean both;

    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }
    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getMobileNumber() { return mobileNumber; }
    public void setMobileNumber(String mobileNumber) { this.mobileNumber = mobileNumber; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    public Boolean getActive() { return active; }
    public void setActive(Boolean active) { this.active = active; }
    public Boolean getEmailVerified() { return emailVerified; }
    public void setEmailVerified(Boolean emailVerified) { this.emailVerified = emailVerified; }
    public Boolean getSeller() { return seller; }
    public void setSeller(Boolean seller) { this.seller = seller; }
    public Boolean getBuyer() { return buyer; }
    public void setBuyer(Boolean buyer) { this.buyer = buyer; }
    public Boolean getAdmin() { return admin; }
    public void setAdmin(Boolean admin) { this.admin = admin; }
    public Boolean getBoth() { return both; }
    public void setBoth(Boolean both) { this.both = both; }
}
