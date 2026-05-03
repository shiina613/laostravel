package com.traveller.laos.service;

import com.traveller.laos.dto.AuthRequest;
import com.traveller.laos.dto.AuthResponse;
import com.traveller.laos.dto.ChangePasswordRequest;
import com.traveller.laos.dto.RegisterRequest;
import com.traveller.laos.dto.UpdateProfileRequest;
import com.traveller.laos.dto.UserProfileDto;
import com.traveller.laos.entity.Role;
import com.traveller.laos.entity.User;
import com.traveller.laos.exception.BadRequestException;
import com.traveller.laos.exception.ResourceNotFoundException;
import com.traveller.laos.repository.RoleRepository;
import com.traveller.laos.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public UserService(UserRepository userRepository, RoleRepository roleRepository,
                       PasswordEncoder passwordEncoder, JwtService jwtService) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            return new AuthResponse(null, null, null, "Username already exists");
        }

        if (userRepository.existsByEmail(request.getEmail())) {
            return new AuthResponse(null, null, null, "Email already exists");
        }

        Role userRole = roleRepository.findByName("USER")
                .orElseThrow(() -> new RuntimeException("USER role not found"));

        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setFullName(request.getFullName());
        user.setRole(userRole);

        userRepository.save(user);

        return new AuthResponse(null, request.getUsername(), "USER", "Registration successful");
    }

    public AuthResponse login(AuthRequest request) {
        Optional<User> userOpt = userRepository.findByUsername(request.getUsername());

        if (userOpt.isEmpty()) {
            return new AuthResponse(null, null, null, "Invalid username or password");
        }

        User user = userOpt.get();

        // Check if user account is inactive
        if ("INACTIVE".equals(user.getStatus())) {
            throw new BadRequestException("Tài khoản đã bị vô hiệu hóa");
        }

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            return new AuthResponse(null, null, null, "Invalid username or password");
        }

        String token = jwtService.generateToken(user.getUsername(), user.getRole().getName());

        return new AuthResponse(token, user.getUsername(), user.getRole().getName(), "Login successful");
    }

    public UserProfileDto getProfile(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("Người dùng", 0L));
        return mapToProfileDto(user);
    }

    public UserProfileDto updateProfile(String username, UpdateProfileRequest request) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("Người dùng", 0L));

        // Check email uniqueness — allow same email as current user
        Optional<User> existingByEmail = userRepository.findByEmail(request.getEmail());
        if (existingByEmail.isPresent() && !existingByEmail.get().getId().equals(user.getId())) {
            throw new BadRequestException("Email đã được sử dụng");
        }

        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        userRepository.save(user);

        return mapToProfileDto(user);
    }

    public void changePassword(String username, ChangePasswordRequest request) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("Người dùng", 0L));

        if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
            throw new BadRequestException("Mật khẩu hiện tại không đúng");
        }

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);
    }

    private UserProfileDto mapToProfileDto(User user) {
        return UserProfileDto.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .fullName(user.getFullName())
                .createdAt(user.getCreatedAt())
                .build();
    }
}
