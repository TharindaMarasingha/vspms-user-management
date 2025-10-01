package com.vspms.app.controller;

import com.vspms.app.domain.User;
import com.vspms.app.dto.UpdateProfileRequest;
import com.vspms.app.repository.UserRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController @RequestMapping("/api/users") @RequiredArgsConstructor
public class UserController {
  private final UserRepository userRepo;

  @GetMapping("/me")
  public Object me(Authentication auth){
    return userRepo.findByEmail(auth.getName()).orElseThrow();
  }

  @PutMapping("/me")
  public User updateMe(Authentication auth, @Valid @RequestBody UpdateProfileRequest req){
    var me = userRepo.findByEmail(auth.getName()).orElseThrow();
    // prevent email duplication
    var existing = userRepo.findByEmail(req.email().toLowerCase()).orElse(null);
    if (existing != null && !existing.getId().equals(me.getId()))
      throw new ResponseStatusException(HttpStatus.CONFLICT, "Email already in use");
    me.setFullName(req.fullName());
    me.setEmail(req.email().toLowerCase());
    return userRepo.save(me);
  }
}
