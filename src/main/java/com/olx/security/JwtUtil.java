package com.olx.security;

import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtUtil {

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expiration}")
    private long expirationMs;

    public String generateToken(String username) {
        Date now = new Date();
        Date expiry = new Date(now.getTime() + expirationMs);

        return Jwts.builder()
            .setSubject(username)
            .setIssuedAt(now)
            .setExpiration(expiry)
            // ← CHANGE: use HS256 instead of HS512
            .signWith(SignatureAlgorithm.HS256, secret)
            .compact();
    }

    public String validateAndGetUsername(String token) {
        Jws<Claims> claims = Jwts.parser()
            .setSigningKey(secret)
            .parseClaimsJws(token);
        return claims.getBody().getSubject();
    }
}
