package com.vspms.app.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record UpdateProfileRequest(
  @NotBlank String fullName,
  @Email @NotBlank String email
) {}


