package com.traveller.laos.service;

import com.traveller.laos.dto.ApiResponse;
import com.traveller.laos.dto.PageResponse;
import com.traveller.laos.dto.ReviewAdminDto;
import com.traveller.laos.entity.Review;
import com.traveller.laos.exception.ResourceNotFoundException;
import com.traveller.laos.repository.ArticleRepository;
import com.traveller.laos.repository.DestinationRepository;
import com.traveller.laos.repository.FestivalRepository;
import com.traveller.laos.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
public class AdminReviewService {

    private final ReviewRepository reviewRepository;
    private final DestinationRepository destinationRepository;
    private final FestivalRepository festivalRepository;
    private final ArticleRepository articleRepository;

    /**
     * Lấy danh sách tất cả review, có thể lọc theo targetType
     *
     * @param targetType lọc theo loại (DESTINATION, FESTIVAL, ARTICLE) — null để lấy tất cả
     * @param page       số trang (0-indexed)
     * @param size       số phần tử mỗi trang
     */
    public ApiResponse<PageResponse<ReviewAdminDto>> getAllReviews(String targetType, int page, int size) {
        log.info("Admin getAllReviews - targetType: {}, page: {}, size: {}", targetType, page, size);

        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());

        Page<Review> reviewPage;
        if (targetType != null && !targetType.isBlank()) {
            reviewPage = reviewRepository.findByTargetType(targetType.toUpperCase(), pageable);
        } else {
            reviewPage = reviewRepository.findAll(pageable);
        }

        Page<ReviewAdminDto> dtoPage = reviewPage.map(this::mapToDto);
        return ApiResponse.ok("Lấy danh sách bình luận thành công", PageResponse.from(dtoPage, r -> r));
    }

    /**
     * Xóa review theo id — admin có thể xóa bất kỳ review nào
     *
     * @param id ID của review cần xóa
     */
    @Transactional
    public void deleteReview(Long id) {
        log.info("Admin deleteReview - id: {}", id);
        Review review = reviewRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Bình luận", id));
        reviewRepository.delete(review);
        log.info("Admin deleteReview - deleted review id: {}", id);
    }

    /**
     * Map Review entity sang ReviewAdminDto, resolve targetName từ repository tương ứng
     */
    private ReviewAdminDto mapToDto(Review review) {
        String targetName = resolveTargetName(review.getTargetType(), review.getTargetId());
        return new ReviewAdminDto(
                review.getId(),
                review.getTargetType(),
                review.getTargetId(),
                targetName,
                review.getUser().getUsername(),
                review.getRating(),
                review.getComment(),
                review.getCreatedAt()
        );
    }

    /**
     * Lấy tên của đối tượng được review (destination/festival/article)
     */
    private String resolveTargetName(String targetType, Long targetId) {
        try {
            return switch (targetType.toUpperCase()) {
                case "DESTINATION" -> destinationRepository.findById(targetId)
                        .map(d -> d.getName()).orElse("(Đã xóa)");
                case "FESTIVAL" -> festivalRepository.findById(targetId)
                        .map(f -> f.getName()).orElse("(Đã xóa)");
                case "ARTICLE" -> articleRepository.findById(targetId)
                        .map(a -> a.getTitle()).orElse("(Đã xóa)");
                default -> "(Không xác định)";
            };
        } catch (Exception e) {
            log.warn("Could not resolve target name for type={}, id={}", targetType, targetId);
            return "(Không xác định)";
        }
    }
}
