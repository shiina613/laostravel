package com.traveller.laos.controller;

import com.traveller.laos.dto.ReviewDto;
import com.traveller.laos.dto.ReviewRequest;
import com.traveller.laos.dto.ReviewSummaryDto;
import com.traveller.laos.entity.Review;
import com.traveller.laos.entity.User;
import com.traveller.laos.repository.ReviewRepository;
import com.traveller.laos.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/reviews")
@CrossOrigin(origins = "http://localhost:3000")
public class ReviewController {

    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;

    public ReviewController(ReviewRepository reviewRepository, UserRepository userRepository) {
        this.reviewRepository = reviewRepository;
        this.userRepository = userRepository;
    }

    // GET /api/reviews/{targetType}/{targetId}
    // targetType: DESTINATION, FESTIVAL, hoặc ARTICLE
    @GetMapping("/{targetType}/{targetId}")
    public ResponseEntity<ReviewSummaryDto> getReviews(
            @PathVariable String targetType,
            @PathVariable Long targetId,
            Authentication authentication) {

        String type = targetType.toUpperCase();
        List<Review> reviews = reviewRepository
                .findByTargetTypeAndTargetIdOrderByCreatedAtDesc(type, targetId);

        String currentUsername = authentication != null ? authentication.getName() : null;

        ReviewDto myReview = null;
        List<ReviewDto> reviewDtos = reviews.stream().map(r -> {
            boolean isOwner = currentUsername != null && r.getUser().getUsername().equals(currentUsername);
            return new ReviewDto(r.getId(), r.getUser().getUsername(), r.getRating(),
                    r.getComment(), r.getCreatedAt(), isOwner);
        }).collect(Collectors.toList());

        // Tìm review của user hiện tại
        if (currentUsername != null) {
            myReview = reviewDtos.stream()
                    .filter(ReviewDto::isOwner)
                    .findFirst()
                    .orElse(null);
        }

        Double avg = reviewRepository.avgRating(type, targetId);
        long total = reviewRepository.countByTargetTypeAndTargetId(type, targetId);

        return ResponseEntity.ok(new ReviewSummaryDto(
                avg != null ? Math.round(avg * 10.0) / 10.0 : null,
                total,
                reviewDtos,
                myReview
        ));
    }

    // POST /api/reviews/{targetType}/{targetId} — yêu cầu đăng nhập
    @PostMapping("/{targetType}/{targetId}")
    public ResponseEntity<?> createOrUpdate(
            @PathVariable String targetType,
            @PathVariable Long targetId,
            @RequestBody ReviewRequest request,
            Authentication authentication) {

        if (authentication == null) {
            return ResponseEntity.status(401).body(Map.of("message", "Vui lòng đăng nhập để đánh giá"));
        }

        // Validate: phải có ít nhất rating hoặc comment
        if (request.getRating() == null && (request.getComment() == null || request.getComment().isBlank())) {
            return ResponseEntity.badRequest().body(Map.of("message", "Vui lòng nhập đánh giá hoặc bình luận"));
        }

        if (request.getRating() != null && (request.getRating() < 1 || request.getRating() > 5)) {
            return ResponseEntity.badRequest().body(Map.of("message", "Đánh giá phải từ 1 đến 5 sao"));
        }

        String type = targetType.toUpperCase();
        User user = userRepository.findByUsername(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Upsert: mỗi user chỉ có 1 review cho mỗi target
        Optional<Review> existing = reviewRepository
                .findByTargetTypeAndTargetIdAndUserId(type, targetId, user.getId());

        Review review = existing.orElse(new Review());
        review.setTargetType(type);
        review.setTargetId(targetId);
        review.setUser(user);
        review.setRating(request.getRating());
        review.setComment(request.getComment() != null && !request.getComment().isBlank()
                ? request.getComment().trim() : null);

        reviewRepository.save(review);

        ReviewDto dto = new ReviewDto(review.getId(), user.getUsername(),
                review.getRating(), review.getComment(), review.getCreatedAt(), true);
        return ResponseEntity.ok(dto);
    }

    // DELETE /api/reviews/{id} — chỉ owner mới xóa được
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id, Authentication authentication) {
        if (authentication == null) {
            return ResponseEntity.status(401).body(Map.of("message", "Unauthorized"));
        }

        Review review = reviewRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Review not found"));

        if (!review.getUser().getUsername().equals(authentication.getName())) {
            return ResponseEntity.status(403).body(Map.of("message", "Không có quyền xóa review này"));
        }

        reviewRepository.delete(review);
        return ResponseEntity.ok("Đã xóa");
    }
}
