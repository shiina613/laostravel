package com.traveller.laos.service;

import com.traveller.laos.dto.UserListDto;
import com.traveller.laos.entity.User;
import com.traveller.laos.exception.BadRequestException;
import com.traveller.laos.exception.ResourceNotFoundException;
import com.traveller.laos.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class AdminUserService {

    private final UserRepository userRepository;

    /**
     * Lấy danh sách tất cả người dùng
     * @return List<UserListDto> chứa thông tin tất cả người dùng
     */
    public List<UserListDto> getAllUsers() {
        log.info("Fetching all users");
        List<User> users = userRepository.findAll();
        
        return users.stream()
                .map(this::mapToUserListDto)
                .collect(Collectors.toList());
    }

    /**
     * Cập nhật trạng thái người dùng
     * Không cho phép vô hiệu hóa tài khoản ADMIN
     * 
     * @param id ID của người dùng
     * @param status Trạng thái mới ("ACTIVE" hoặc "INACTIVE")
     * @throws ResourceNotFoundException nếu người dùng không tồn tại
     * @throws BadRequestException nếu cố gắng vô hiệu hóa tài khoản ADMIN
     */
    @Transactional
    public void updateUserStatus(Long id, String status) {
        log.info("Updating user status: userId={}, newStatus={}", id, status);
        
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", id));
        
        // Kiểm tra không cho INACTIVE tài khoản ADMIN
        if ("INACTIVE".equalsIgnoreCase(status) && "ADMIN".equalsIgnoreCase(user.getRole().getName())) {
            log.warn("Attempted to deactivate ADMIN account: userId={}", id);
            throw new BadRequestException("Không thể vô hiệu hóa tài khoản Admin");
        }
        
        user.setStatus(status);
        userRepository.save(user);
        
        log.info("User status updated successfully: userId={}, newStatus={}", id, status);
    }

    /**
     * Map User entity sang UserListDto
     */
    private UserListDto mapToUserListDto(User user) {
        return new UserListDto(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getFullName(),
                user.getRole().getName(),
                user.getStatus(),
                user.getCreatedAt()
        );
    }
}
