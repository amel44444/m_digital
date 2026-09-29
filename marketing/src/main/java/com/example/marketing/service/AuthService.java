package com.example.marketing.service;

import com.example.marketing.config.JwtUtil;
import com.example.marketing.dto.*;
import com.example.marketing.entity.*;
import com.example.marketing.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder encoder;
    private final JwtUtil jwtUtil;
    private final HistoryService historyService;

    public AuthResponse login(LoginRequest req) {
        User user = userRepository.findByEmail(req.getEmail())
                .orElseThrow(() -> new RuntimeException("Email ou mot de passe invalide"));

        if (!encoder.matches(req.getPassword(), user.getPassword())) {
            throw new RuntimeException("Email ou mot de passe invalide");
        }

        String token = jwtUtil.generateToken(user.getEmail(), user.getRole().name());
        historyService.log("LOGIN", "User", user.getId(), "Connexion réussie");

        return AuthResponse.builder()
                .token(token)
                .userId(user.getId())
                .email(user.getEmail())
                .role(user.getRole().name())
                .build();
    }

    public AuthResponse register(RegisterRequest req) {
        if (userRepository.existsByEmail(req.getEmail())) {
            throw new RuntimeException("Email déjà utilisé");
        }
        User user = User.builder()
                .username(req.getUsername())
                .email(req.getEmail())
                .password(encoder.encode(req.getPassword()))
                .fullName(req.getFullName())
                .role(req.getRole() != null ? req.getRole() : Role.CLIENT)
                .enabled(true)
                .build();
        userRepository.save(user);
        historyService.log("REGISTER", "User", user.getId(), "Nouvel utilisateur créé");

        String token = jwtUtil.generateToken(user.getEmail(), user.getRole().name());
        return AuthResponse.builder()
                .token(token)
                .userId(user.getId())
                .email(user.getEmail())
                .role(user.getRole().name())
                .build();
    }
}
