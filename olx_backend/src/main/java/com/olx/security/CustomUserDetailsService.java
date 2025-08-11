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
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));

        // Effective role model: ADMIN or USER
        String[] roles = u.isAdmin() ? new String[] { "ADMIN" } : new String[] { "USER" };

        return User.withUsername(u.getEmail())
                .password(u.getPasswordHash())
                .roles(roles)                  // gives ROLE_ADMIN or ROLE_USER
                .accountLocked(false)         // not using lock feature
                .disabled(!u.isActive())      // disabled when soft-deleted
                .build();
    }
}
