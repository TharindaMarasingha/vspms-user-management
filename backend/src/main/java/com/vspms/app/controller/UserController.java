package com.vspms.app.controller;

import com.vspms.app.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController @RequestMapping("/api/users") @RequiredArgsConstructor
public class UserController {
  private final UserRepository userRepo;

  @GetMapping("/me")
  public Object me(Authentication auth){
    return userRepo.findByEmail(auth.getName()).orElseThrow();
  }
}
