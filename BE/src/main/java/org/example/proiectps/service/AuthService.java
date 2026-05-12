package org.example.proiectps.service;

import org.example.proiectps.dto.AuthResponse;
import org.example.proiectps.dto.LoginRequest;
import org.example.proiectps.dto.RegisterRequest;
import org.example.proiectps.dto.UserDto;
import org.example.proiectps.entity.User;
import org.example.proiectps.repository.UserRepository;
import org.example.proiectps.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Username is already taken");
        }
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email is already registered");
        }

        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole("USER");
        user.setScore(0L);
        user.setBanned(false);

        User savedUser = userRepository.save(user);

        String token = jwtUtil.generateToken(
                savedUser.getUsername(),
                savedUser.getUserId(),
                savedUser.getRole()
        );

        return new AuthResponse(token, UserDto.fromEntity(savedUser));
    }

    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("Invalid username or password"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid username or password");
        }

        if (user.isBanned()) {
            throw new RuntimeException("Your account has been banned");
        }

        String token = jwtUtil.generateToken(
                user.getUsername(),
                user.getUserId(),
                user.getRole()
        );

        return new AuthResponse(token, UserDto.fromEntity(user));
    }
}