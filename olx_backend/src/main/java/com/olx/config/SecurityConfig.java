package com.olx.config;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;



@Configuration
public class SecurityConfig {

    @Bean //  tells Spring to create and manage a BCryptPasswordEncoder instance.
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration cfg) throws Exception {
        return cfg.getAuthenticationManager();
    }


    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            // CORS first (uses the bean below)
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            // No CSRF for stateless APIs
            .csrf(csrf -> csrf.disable())
            // Authorization rules
            .authorizeHttpRequests(auth -> auth
                // --- DEV ONLY: permit all (uncomment this block and comment the specific rules if needed)
                // .anyRequest().permitAll()

                // --- RECOMMENDED: specific public endpoints
                .requestMatchers(
                    "/", "/error",
                    "/auth/**",
                    "/v3/api-docs/**",
                    "/swagger-ui.html", "/swagger-ui/**",
                    "/webjars/**"
                ).permitAll()
                .requestMatchers(HttpMethod.GET,
                    "/products/view/**",
                    "/products/by-area",
                    "/products/by-user/**",
                    "/products/search",
                    "/products/{id}/edit-details",   // note: PathPattern-style variable
                    "/categories/**",
                    "/lookup/**"
                ).permitAll()
                .requestMatchers(HttpMethod.POST,
                    "/users/register",
                    "/users/signin"
                ).permitAll()
                .anyRequest().authenticated()
            )
            // No form login or HTTP Basic for APIs
            .formLogin(form -> form.disable())
            .httpBasic(basic -> basic.disable());

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        // Frontend origin(s)
        config.setAllowedOrigins(List.of("http://localhost:5173"));
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true); // allow cookies/Authorization header

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        // apply to all endpoints
        source.registerCorsConfiguration("/**", config);
        return source;
    }

}
