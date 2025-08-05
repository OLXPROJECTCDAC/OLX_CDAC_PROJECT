package com.olx.controller;

import com.olx.dto.*;
import lombok.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

//import com.olx.dto.ApiResponse;
import com.olx.exception.ApiException;
import com.olx.service.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
@ControllerAdvice
public class UserController {

    // dependency
    private final UserService userService;

	/*
	  User sign up 
	  URL - http://host:port/users/register
	  Method - POST 
	  Payload - JSON Representation of User Request DTO
	  Response - User Response DTO
	*/

    @PostMapping("/register")
    public ResponseEntity<?> userRegistration(@RequestBody @Valid UserRequestDTO dto) {
        System.out.println("in Register User " + dto);

        userService.registerUser(dto);
        ApiResponseDTO response = new ApiResponseDTO("User registered successfully");

        return ResponseEntity.status(HttpStatus.CREATED).body(response);

    }
	
	/*
	  User sign in 
	  URL - http://host:port/users/signin
	  Method - POST 
	  Payload - Auth Request DTO (email ,password)
	  Response - User Response DTO - with details
	*/

//	@PostMapping("/signin")
//	public ResponseEntity<?> userSignIn(@RequestBody AuthRequestDTO dto) {
//		
//		return ResponseEntity.ok(userService.authenticate(dto));
//	}

    /*
    User sign in 
    URL - http://host:port/users/signin
    Method - POST 
    Payload - Auth Request DTO (email, password)
    Response - User Response DTO - with details
  */
    @PostMapping("/signin")
    public ResponseEntity<?> userSignIn(@RequestBody @Valid AuthRequestDTO dto) {
        try {
            // Authenticate user using service
            var userResponse = userService.authenticate(dto);
            return ResponseEntity.ok(userResponse);
        } catch (ApiException e) {
            // Handle authentication failure (invalid email/password)
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ApiResponseDTO("Invalid email or password"));
        } catch (Exception e) {
            // Handle unexpected errors
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponseDTO("An error occurred during sign-in"));
        }
    }
//---------------------------------------------------------------------------------------------
    /*
      Fetch User Details (User Profile)
      URL - http://host:port/users/profile
      Method - GET
      Payload - Auth Request DTO (email, password)
      Response - User Response DTO (User profile details)
    */
    /*
    @GetMapping("/profile")
    public ResponseEntity<?> getUserProfile() {
        try {
            // Step 1: Get the current authenticated user email from the Security Context
            String email = SecurityContextHolder.getContext().getAuthentication().getName();

            // Step 2: Fetch user profile from the service layer using the email
            UserRespDTO userProfile = userService.getUserProfileByEmail(email);

            return ResponseEntity.ok(userProfile);
        } catch (Exception e) {
            // Handle unexpected errors (e.g., user not found)
            return ResponseEntity.status(404).body(new ApiResponseDTO("User not found"));
        }
    }
    /*
     */
    //---------------------------------------------------------------------------------------------
    /*
      Get Authenticated User Profile
      URL     : GET /users/profile
      Payload/Access  : Requires Authentication
      Response: UserRespDTO (User profile details)
     */
    @GetMapping("/profile")
    public ResponseEntity<UserRespDTO> getUserProfile() {
        // Get the currently authenticated user's email
        String email = SecurityContextHolder.getContext().getAuthentication().getName();

        // Fetch user profile from the service layer
        UserRespDTO userProfile = userService.getUserProfileByEmail(email);

        return ResponseEntity.ok(userProfile);
    }
    //---------------------------------------------------------------------------------------------

    /*
     Update User Details (User Profile)
     URL     - http://host:port/users/update-profile
     Method  - PUT
     Payload - UserUpdateDTO (Only fields to be updated)
     Response - UserRespDTO (Updated user profile details)
   */
    @PutMapping("/update-profile")
    public ResponseEntity<?> updateUserProfile(@RequestBody @Valid UserUpdateDTO dto) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        UserRespDTO updatedUser = userService.updateUserProfile(email, dto);
        return ResponseEntity.ok(updatedUser);
    }

    /*
      Delete User (User Profile)
      URL      - http://host:port/users/delete
      Method   - DELETE
      Payload  - None (User identified via authentication context)
      Response - UserRespDTO (Details of the deleted user)
    */
    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteUserProfile() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        userService.deleteUserByEmail(email);
        return ResponseEntity.ok(new ApiResponseDTO("User deleted successfully"));
    }

}
