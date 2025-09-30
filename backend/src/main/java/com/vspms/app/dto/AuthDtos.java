package com.vspms.app.dto;

import jakarta.validation.constraints.*;

public record SignupRequest(
  @NotBlank String fullName,
  @Email @NotBlank String email,
  @NotBlank String password,
  String itNumber,
  String role
) {}

public record LoginRequest(@Email @NotBlank String email, @NotBlank String password) {}
public record AuthResponse(String accessToken) {}
