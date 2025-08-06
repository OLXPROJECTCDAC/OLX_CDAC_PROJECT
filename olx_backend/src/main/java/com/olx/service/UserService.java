package com.olx.service;

import com.olx.dto.AuthRequestDTO;
import com.olx.dto.UserRequestDTO;
import com.olx.dto.UserRespDTO;
import com.olx.dto.UserUpdateDTO;

import java.util.List;

public interface UserService {



    //sign up
	UserRespDTO registerUser(UserRequestDTO dto);

	UserRespDTO authenticate(AuthRequestDTO dto);

	UserRespDTO getUserProfileByEmail(String email);

	UserRespDTO updateUserProfile(String email, UserUpdateDTO dto);

	UserRespDTO deleteUserByEmail(String Email);

}
