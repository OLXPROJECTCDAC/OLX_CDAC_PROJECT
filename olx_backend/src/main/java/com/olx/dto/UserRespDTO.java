package com.olx.dto;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserRespDTO extends BaseDTO {

	private String firstName;

	private String lastName;

	private String email;

	private String mobileNumber;

	private boolean isActive;

	private boolean isEmailVerified;

	private boolean isSeller;

	private boolean isBuyer;

	private boolean isAdmin;

	private boolean isBoth;

	private LocalDateTime lastLogin;


}
