package com.olx.service;

import com.olx.dto.AuthRequestDTO;
import com.olx.dto.AuthResponseDTO;
import com.olx.dto.UserRequestDTO;

public interface AuthService {
    AuthResponseDTO register(UserRequestDTO request);

    AuthResponseDTO login(AuthRequestDTO request);
}
