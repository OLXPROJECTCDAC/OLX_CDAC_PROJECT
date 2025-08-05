package com.olx.service;

import com.olx.dto.UserUpdateDTO;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.olx.dto.AuthRequestDTO;
import com.olx.dto.UserRequestDTO;
import com.olx.dto.UserRespDTO;
import com.olx.entity.UserEntity;
import com.olx.exception.ApiException;
import com.olx.repository.UserRepository;

import lombok.AllArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

	// dependencies
	private final UserRepository userRepository;
	private final ModelMapper modelMapper;
	private final BCryptPasswordEncoder passwordEncoder;

//	Registers a new user after checking for duplicates and encoding the password.
    @Override
	public UserRespDTO registerUser(UserRequestDTO dto) {

		// validate if email is not dup
		if (userRepository.existsByEmail(dto.getEmail()))
			throw new ApiException("Email is already registered");
		if (userRepository.existsByMobileNumber(dto.getMobileNumber()))
			throw new ApiException("This Mobile Number is already registered!");
		UserEntity entity = modelMapper.map(dto, UserEntity.class);
		// encoding password coming from UserRequestDTO
		entity.setPasswordHash(passwordEncoder.encode(dto.getPassword()));

		return modelMapper.map(userRepository.save(entity), UserRespDTO.class);
	}

//	Authenticates a user based on email and password.
	@Override
	public UserRespDTO authenticate(AuthRequestDTO dto) {

		// Fetch user by email
		UserEntity entity = userRepository.findByEmail(dto.getEmail())
				.orElseThrow(() -> new ApiException("Invalid email or password"));
		
		 // Compare raw password with encoded password
	    if (!passwordEncoder.matches(dto.getPassword(), entity.getPasswordHash())) {
	        throw new ApiException("Invalid email or password");
	    }
		// Return user response
	    return modelMapper.map(entity, UserRespDTO.class);
	}

//	Retrieves user profile details by email.
	@Override
	public UserRespDTO getUserProfileByEmail(String email) {
		UserEntity userEntity = userRepository.findByEmail(email)
                .orElseThrow(() -> new ApiException("User doesn't exist"));

        // Convert the UserEntity to UserRespDTO
		return modelMapper.map(userEntity, UserRespDTO.class);
    }


//	Updates user profile fields and encodes the new password.
	@Override
	public UserRespDTO updateUserProfile(String email, UserUpdateDTO dto) {
		UserEntity userEntity = userRepository.findByEmail(email)
				.orElseThrow(() -> new ApiException("User not found"));

		userEntity.setFirstName(dto.getFirstName());
		userEntity.setLastName(dto.getLastName());
		userEntity.setMobileNumber(dto.getMobileNumber());
		userEntity.setPasswordHash(passwordEncoder.encode(dto.getPassword())); // hash the new password

		userRepository.save(userEntity);
		return modelMapper.map(userEntity, UserRespDTO.class);
	}

//	Performs a soft delete by setting the user's active status to false.
	@Override
	public UserRespDTO deleteUserByEmail(String email) {
		UserEntity userEntity = userRepository.findByEmail(email)
				.orElseThrow(() -> new ApiException("User not found"));

		userEntity.setActive(false); // soft delete
		userRepository.save(userEntity);

		return modelMapper.map(userEntity, UserRespDTO.class);
	}

}
