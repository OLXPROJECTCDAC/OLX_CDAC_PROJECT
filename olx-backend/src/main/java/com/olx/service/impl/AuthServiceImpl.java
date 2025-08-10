package com.olx.service.impl;

import com.olx.dto.AuthResponse;
import com.olx.dto.LoginRequest;
import com.olx.dto.RegisterRequest;
import com.olx.entity.UserEntity;
import com.olx.repository.UserRepository;
import com.olx.security.jwt.JwtUtil;
import com.olx.service.AuthService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthServiceImpl implements AuthService {

    private final UserRepository users;
    private final PasswordEncoder encoder;
    private final AuthenticationManager authManager;
    private final JwtUtil jwt;

    public AuthServiceImpl(UserRepository users,
                           PasswordEncoder encoder,
                           AuthenticationManager authManager,
                           JwtUtil jwt) {
        this.users = users;
        this.encoder = encoder;
        this.authManager = authManager;
        this.jwt = jwt;
    }

    @Override
    @Transactional
    public AuthResponse register(RegisterRequest r) {
        if (users.existsByEmail(r.getEmail())) {
            throw new IllegalArgumentException("Email already registered");
        }
        if (r.getMobileNumber() != null && users.existsByMobileNumber(r.getMobileNumber())) {
            throw new IllegalArgumentException("Mobile number already registered");
        }

        UserEntity u = new UserEntity();
        u.setFirstName(r.getFirstName());
        u.setLastName(r.getLastName());
        u.setEmail(r.getEmail());
        u.setMobileNumber(r.getMobileNumber());
        u.setPasswordHash(encoder.encode(r.getPassword()));

        if (r.getActive() != null) u.setActive(r.getActive());
        if (r.getEmailVerified() != null) u.setEmailVerified(r.getEmailVerified());
        if (r.getSeller() != null) u.setSeller(r.getSeller());
        if (r.getBuyer() != null) u.setBuyer(r.getBuyer());
        if (r.getAdmin() != null) u.setAdmin(r.getAdmin());
        if (r.getBoth() != null) u.setBoth(r.getBoth());

        users.save(u);

        String token = jwt.generateToken(u.getEmail());
        return new AuthResponse(token, u.getEmail(), u.getFirstName(), u.getLastName());
    }

    @Override
    public AuthResponse login(LoginRequest r) {
        Authentication auth = authManager.authenticate(
            new UsernamePasswordAuthenticationToken(r.getEmail(), r.getPassword())
        );
        String token = jwt.generateToken(r.getEmail());
        UserEntity u = users.findByEmail(r.getEmail()).orElseThrow();
        return new AuthResponse(token, u.getEmail(), u.getFirstName(), u.getLastName());
    }
}
