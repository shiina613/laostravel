package com.traveller.laos.controller;

import com.traveller.laos.dto.ApiResponse;
import com.traveller.laos.dto.DashboardDto;
import com.traveller.laos.dto.DestinationListDto;
import com.traveller.laos.dto.ReviewAdminDto;
import com.traveller.laos.entity.Destination;
import com.traveller.laos.entity.Review;
import com.traveller.laos.repository.ArticleRepository;
import com.traveller.laos.repository.DestinationRepository;
import com.traveller.laos.repository.FestivalRepository;
import com.traveller.laos.repository.ReviewRepository;
import com.traveller.laos.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:3000")
public class AdminController {

    private final DestinationRepository destinationRepository;
    private final FestivalRepository festivalRepository;
    private final ArticleRepository articleRepository;
    private final UserRepository userRepository;
    private final ReviewRepository reviewRepository;

    public AdminController(DestinationRepository destinationRepository,
                           FestivalRepository festivalRepository,
                           ArticleRepository articleRepository,
                           UserRepository userRepository,
                           ReviewRepository reviewRepository) {
        this.destinationRepository = destinationRepository;
        this.festivalRepository = festivalRepository;
        this.articleRepository = articleRepository;
        this.userRepository = userRepository;
        this.reviewRepository = reviewRepository;
    }

    @GetMapping("/provinces")
    public ResponseEntity<ApiResponse<List<String>>> getProvinces() {
        List<String> destProvinces = destinationRepository.findDistinctProvinces();
        List<String> festivalProvinces = festivalRepository.findDistinctProvinces();

        List<String> merged = Stream.concat(destProvinces.stream(), festivalProvinces.stream())
                .filter(p -> p != null && !p.isBlank())
                .distinct()
                .sorted()
                .collect(Collectors.toList());

        return ResponseEntity.ok(ApiResponse.ok("OK", merged));
    }

    @GetMapping("/dashboard")
    public ResponseEntity<ApiResponse<DashboardDto>> getDashboard() {
        long totalDestinations = destinationRepository.count();
        long totalFestivals = festivalRepository.count();
        long totalArticles = articleRepository.count();
        long totalUsers = userRepository.count();
        long totalReviews = reviewRepository.count();

        // Top 5 destinations by viewCount
        List<DestinationListDto> topDestinations = destinationRepository
                .findTop5ByOrderByViewCountDesc()
                .stream()
                .map(this::mapDestinationToListDto)
                .collect(Collectors.toList());

        // Latest 5 reviews
        List<ReviewAdminDto> latestReviews = reviewRepository
                .findTop5ByOrderByCreatedAtDesc()
                .stream()
                .map(this::mapReviewToAdminDto)
                .collect(Collectors.toList());

        DashboardDto dashboard = DashboardDto.builder()
                .totalDestinations(totalDestinations)
                .totalFestivals(totalFestivals)
                .totalArticles(totalArticles)
                .totalUsers(totalUsers)
                .totalReviews(totalReviews)
                .topDestinations(topDestinations)
                .latestReviews(latestReviews)
                .build();

        return ResponseEntity.ok(ApiResponse.ok("OK", dashboard));
    }

    private DestinationListDto mapDestinationToListDto(Destination destination) {
        return new DestinationListDto(
                destination.getId(),
                destination.getName(),
                destination.getSlug(),
                destination.getProvince(),
                destination.getThumbnail(),
                destination.getCategory() != null ? destination.getCategory().getName() : null,
                destination.getStatus(),
                destination.getViewCount()
        );
    }

    private ReviewAdminDto mapReviewToAdminDto(Review review) {
        String username = review.getUser() != null ? review.getUser().getUsername() : "";
        return new ReviewAdminDto(
                review.getId(),
                review.getTargetType(),
                review.getTargetId(),
                "",  // targetName: lookup is complex, use empty string
                username,
                review.getRating(),
                review.getComment(),
                review.getCreatedAt()
        );
    }
}
