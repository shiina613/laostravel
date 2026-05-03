package com.traveller.laos.controller;

import com.traveller.laos.dto.ApiResponse;
import com.traveller.laos.dto.UpdateUserStatusRequest;
import com.traveller.laos.dto.UserListDto;
import com.traveller.laos.service.AdminUserService;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/users")
@CrossOrigin(origins = "http://localhost:3000")
public class AdminUserController {

    private static final Logger log = LoggerFactory.getLogger(AdminUserController.class);

    private final AdminUserService adminUserService;

    public AdminUserController(AdminUserService adminUserService) {
        this.adminUserService = adminUserService;
    }

    /**
     * GET /api/admin/users
     * Lấy danh sách tất cả người dùng
     * Yêu cầu: ADMIN role
     * 
     * @return ApiResponse chứa danh sách UserListDto
     */
    @GetMapping
    public ResponseEntity<ApiResponse<List<UserListDto>>> getAllUsers() {
        log.info("Admin GET /api/admin/users - Fetching all users");
        List<UserListDto> users = adminUserService.getAllUsers();
        log.info("Admin GET /api/admin/users - Found {} users", users.size());
        return ResponseEntity.ok(ApiResponse.ok("Lấy danh sách người dùng thành công", users));
    }

    /**
     * PUT /api/admin/users/{id}/status
     * Cập nhật trạng thái người dùng (ACTIVE/INACTIVE)
     * Yêu cầu: ADMIN role
     * Không cho phép vô hiệu hóa tài khoản ADMIN
     * 
     * @param id ID của người dùng cần cập nhật
     * @param request UpdateUserStatusRequest chứa status mới
     * @return ApiResponse xác nhận cập nhật thành công
     */
    @PutMapping("/{id}/status")
    public ResponseEntity<ApiResponse<?>> updateUserStatus(
            @PathVariable Long id,
            @RequestBody @Valid UpdateUserStatusRequest request) {
        log.info("Admin PUT /api/admin/users/{}/status - Updating status to: {}", id, request.getStatus());
        adminUserService.updateUserStatus(id, request.getStatus());
        log.info("Admin PUT /api/admin/users/{}/status - Status updated successfully", id);
        return ResponseEntity.ok(ApiResponse.ok("Cập nhật trạng thái người dùng thành công"));
    }
}
