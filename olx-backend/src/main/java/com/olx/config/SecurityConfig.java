package com.olx.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration cfg) throws Exception {
        return cfg.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf.disable())
           .authorizeHttpRequests(auth -> auth
               .requestMatchers(
                   "/",                // allow root so visiting http://localhost:8080 doesn't 403
                   "/error",
                   "/auth/**",
                   "/v3/api-docs/**",
                   "/swagger-ui.html",
                   "/swagger-ui/**",
                   "/webjars/**"
               ).permitAll()
               .anyRequest().authenticated()
           );
        return http.build();
    }


}
