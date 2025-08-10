package com.olx.service;

import com.olx.dto.AuthResponse;
import com.olx.dto.LoginRequest;
import com.olx.dto.RegisterRequest;

public interface AuthService {
    AuthResponse register(RegisterRequest request);
    AuthResponse login(LoginRequest request);
}
