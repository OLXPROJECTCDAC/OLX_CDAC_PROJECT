package com.olx.security;

import com.olx.entity.UserEntity;
import com.olx.repository.UserRepository;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    private final UserRepository users;

    public CustomUserDetailsService(UserRepository users) {
        this.users = users;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        UserEntity u = users.findByEmail(email)
            .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        String role = u.isAdmin() ? "ADMIN" : (u.isSeller() ? "SELLER" : (u.isBuyer() ? "BUYER" : "USER"));
        return User.withUsername(u.getEmail())
                .password(u.getPasswordHash())
                .roles(role)
                .accountLocked(!u.isActive())
                .disabled(!u.isActive())
                .build();
    }
}
