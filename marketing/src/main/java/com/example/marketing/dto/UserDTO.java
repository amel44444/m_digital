package com.example.marketing.dto;

import com.example.marketing.entity.Role;
import lombok.Data;

@Data
public class UserDTO {
    private Long id;
    private String username;
    private String email;
    private String fullName;
    private Role role;
    private Boolean enabled;
}