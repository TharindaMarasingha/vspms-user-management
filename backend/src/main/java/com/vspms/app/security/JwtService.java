package com.vspms.app.security;

import com.vspms.app.domain.Role;
import com.vspms.app.domain.User;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.time.*;
import java.util.Date;

@Service
public class JwtService {
  @Value("${security.jwt.secret}") private String secret;
  @Value("${security.jwt.issuer}") private String issuer;
  @Value("${security.jwt.accessTtlMinutes}") private long accessTtl;
  private Key key;

  @PostConstruct public void init(){ key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8)); }

  public String generateAccessToken(User u){
    Instant now = Instant.now();
    return Jwts.builder()
      .setIssuer(issuer)
      .setSubject(u.getId().toString())
      .claim("email", u.getEmail())
      .claim("roles", u.getRoles().stream().map(Role::getName).toList())
      .setIssuedAt(Date.from(now))
      .setExpiration(Date.from(now.plus(Duration.ofMinutes(accessTtl))))
      .signWith(key, SignatureAlgorithm.HS256).compact();
  }

  public Jws<Claims> parse(String token){
    return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
  }
}
