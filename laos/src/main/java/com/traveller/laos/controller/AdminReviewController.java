package com.traveller.laos.controller;

import com.traveller.laos.dto.ApiResponse;
import com.traveller.laos.dto.PageResponse;
import com.traveller.laos.dto.ReviewAdminDto;
import com.traveller.laos.service.AdminReviewService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/reviews")
@CrossOrigin(origins = "http://localhost:3000")
public class AdminReviewController {

    private static final Logger log = LoggerFactory.getLogger(AdminReviewController.class);

    private final AdminReviewService adminReviewService;

    public AdminReviewController(AdminReviewService adminReviewService) {
        this.adminReviewService = adminReviewService;
    }

    /**
     * GET /api/admin/reviews
     * Lấy danh sách tất cả review, có thể lọc theo targetType
     *
     * @param targetType lọc theo loại: DESTINATION, FESTIVAL, ARTICLE (tùy chọn)
     * @param page       số trang, mặc định 0
     * @param size       số phần tử mỗi trang, mặc định 20
     */
    @GetMapping
    public ResponseEntity<ApiResponse<PageResponse<ReviewAdminDto>>> getAllReviews(
            @RequestParam(required = false) String targetType,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        log.info("Admin GET /api/admin/reviews - targetType: {}, page: {}, size: {}", targetType, page, size);
        ApiResponse<PageResponse<ReviewAdminDto>> response = adminReviewService.getAllReviews(targetType, page, size);
        return ResponseEntity.ok(response);
    }

    /**
     * DELETE /api/admin/reviews/{id}
     * Xóa review bất kỳ (không kiểm tra owner)
     *
     * @param id ID của review cần xóa
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<?>> deleteReview(@PathVariable Long id) {
        log.info("Admin DELETE /api/admin/reviews/{}", id);
        adminReviewService.deleteReview(id);
        log.info("Admin DELETE /api/admin/reviews/{} - deleted successfully", id);
        return ResponseEntity.ok(ApiResponse.ok("Xóa bình luận thành công"));
    }
}
