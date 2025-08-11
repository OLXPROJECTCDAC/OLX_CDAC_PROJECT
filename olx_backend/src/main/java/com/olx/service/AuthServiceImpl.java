package com.olx.service;

import com.olx.dto.AuthRequestDTO;
import com.olx.dto.AuthResponseDTO;
import com.olx.dto.UserRequestDTO;
import com.olx.entity.UserEntity;
import com.olx.repository.UserRepository;
import com.olx.security.JwtUtil;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

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
    public AuthResponseDTO register(UserRequestDTO r) {
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

        // UserRequestDTO uses primitive booleans, so set them directly
        u.setActive(r.isActive());
        u.setEmailVerified(r.isEmailVerified());
        u.setSeller(r.isSeller());
        u.setBuyer(r.isBuyer());
        u.setAdmin(r.isAdmin());
        u.setBoth(r.isBoth());

        users.save(u);

        // Do NOT issue token for soft-deleted / inactive users
        if (!u.isActive()) {
            throw new IllegalStateException("User account is disabled");
        }

        // include roles in token (ROLE_ADMIN or ROLE_USER)
        List<String> roles = u.isAdmin() ? List.of("ROLE_ADMIN") : List.of("ROLE_USER");

        String token = jwt.generateToken(u.getEmail());
        // AuthResponseDTO(allArgs): (accessToken, tokenType, email, firstName, lastName)
        return new AuthResponseDTO(token, "Bearer", u.getEmail(), u.getFirstName(), u.getLastName());
    }

// ========================== Login ==============================================================
    @Override
    public AuthResponseDTO login(AuthRequestDTO r) {
        Authentication auth = authManager.authenticate(
                new UsernamePasswordAuthenticationToken(r.getEmail(), r.getPassword())
        );

        // load user to check active status and build response ->
        // If authentication fails an exception is thrown by authManager
        UserEntity u = users.findByEmail(r.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found with email: " + r.getEmail()));

        // refuse token issuance for soft-deleted / inactive users
        if (!u.isActive()) {
            throw new IllegalStateException("User account is disabled");
        }


        // If authentication fails an exception is thrown by authManager
        String token = jwt.generateToken(r.getEmail());

        return new AuthResponseDTO(token, "Bearer", u.getEmail(), u.getFirstName(), u.getLastName());
    }
}
