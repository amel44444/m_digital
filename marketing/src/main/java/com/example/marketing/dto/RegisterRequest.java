package com.example.marketing.dto;

import com.example.marketing.entity.Role;
import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class RegisterRequest {
    @NotBlank private String username;
    @Email @NotBlank private String email;
    @Size(min = 6) private String password;
    private String fullName;
    private Role role = Role.CLIENT;
}
