package com.vspms.app.controller;

import com.vspms.app.dto.*;
import com.vspms.app.domain.User;
import com.vspms.app.repository.*;
import com.vspms.app.security.JwtService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController @RequestMapping("/api/auth") @RequiredArgsConstructor
public class AuthController {
  private final UserRepository userRepo;
  private final RoleRepository roleRepo;
  private final PasswordEncoder encoder;
  private final JwtService jwt;

  @PostMapping("/signup")
  public ResponseEntity<AuthResponse> signup(@Valid @RequestBody SignupRequest req){
    if (userRepo.existsByEmail(req.email())) throw new ResponseStatusException(HttpStatus.CONFLICT, "Email in use");
    var u = new User();
    u.setFullName(req.fullName());
    u.setEmail(req.email().toLowerCase());
    u.setPasswordHash(encoder.encode(req.password()));
    u.setItNumber(req.itNumber());
    u.getRoles().add(roleRepo.findByName(req.role() == null ? "CUSTOMER" : req.role()).orElseThrow());
    userRepo.save(u);
    return ResponseEntity.status(201).body(new AuthResponse(jwt.generateAccessToken(u)));
  }

  @PostMapping("/login")
  public AuthResponse login(@Valid @RequestBody LoginRequest req){
    var u = userRepo.findByEmail(req.email().toLowerCase())
         .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials"));
    if (!encoder.matches(req.password(), u.getPasswordHash()))
      throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials");
    return new AuthResponse(jwt.generateAccessToken(u));
  }
}
