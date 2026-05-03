package com.traveller.laos.controller;

import com.traveller.laos.dto.ApiResponse;
import com.traveller.laos.dto.DestinationListDto;
import com.traveller.laos.dto.PageResponse;
import com.traveller.laos.dto.PublicDestinationDetailDto;
import com.traveller.laos.entity.Destination;
import com.traveller.laos.entity.Image;
import com.traveller.laos.repository.DestinationRepository;
import com.traveller.laos.repository.ImageRepository;
import com.traveller.laos.service.DestinationService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/destinations")
@CrossOrigin(origins = "http://localhost:3000")
public class DestinationController {

    private static final Logger log = LoggerFactory.getLogger(DestinationController.class);

    private final DestinationService destinationService;
    private final DestinationRepository destinationRepository;
    private final ImageRepository imageRepository;

    public DestinationController(DestinationService destinationService,
                                 DestinationRepository destinationRepository,
                                 ImageRepository imageRepository) {
        this.destinationService = destinationService;
        this.destinationRepository = destinationRepository;
        this.imageRepository = imageRepository;
    }

    /**
     * GET /api/destinations/provinces
     * Lấy danh sách tỉnh/thành duy nhất từ destinations ACTIVE.
     */
    @GetMapping("/provinces")
    public ResponseEntity<ApiResponse<List<String>>> getProvinces() {
        log.info("GET /api/destinations/provinces");
        List<String> provinces = destinationRepository.findDistinctActiveProvinces();
        return ResponseEntity.ok(ApiResponse.ok("OK", provinces));
    }

    /**
     * GET /api/destinations
     * Tìm kiếm, lọc và phân trang địa điểm (chỉ ACTIVE).
     *
     * @param keyword   tìm theo tên (optional)
     * @param categoryId lọc theo danh mục (optional)
     * @param province  lọc theo tỉnh/thành (optional)
     * @param sortBy    sắp xếp theo: createdAt (default), viewCount, name
     * @param sortDir   asc hoặc desc (default: desc)
     * @param page      số trang, mặc định 0
     * @param size      số phần tử mỗi trang, mặc định 10
     */
    @GetMapping
    public ResponseEntity<ApiResponse<PageResponse<DestinationListDto>>> getDestinations(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Long categoryId,
            @RequestParam(required = false) String province,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDir,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        log.info("GET /api/destinations - keyword: {}, categoryId: {}, province: {}, sortBy: {}, page: {}, size: {}",
                keyword, categoryId, province, sortBy, page, size);
        ApiResponse<PageResponse<DestinationListDto>> response =
                destinationService.getDestinations(keyword, categoryId, province, sortBy, sortDir, page, size);
        return ResponseEntity.ok(response);
    }

    /**
     * GET /api/destinations/{slug} — trang chi tiết, tăng viewCount
     */
    @GetMapping("/{slug}")
    public ResponseEntity<?> getBySlug(@PathVariable String slug) {
        log.info("GET /api/destinations/{}", slug);
        return destinationRepository.findBySlug(slug)
                .filter(d -> "ACTIVE".equals(d.getStatus()))
                .map(d -> {
                    // Tăng viewCount
                    d.setViewCount(d.getViewCount() == null ? 1 : d.getViewCount() + 1);
                    destinationRepository.save(d);
                    return ResponseEntity.ok(toDetailDto(d));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    private PublicDestinationDetailDto toDetailDto(Destination d) {
        List<String> imageUrls = imageRepository
                .findByTargetTypeAndTargetIdOrderBySortOrder("DESTINATION", d.getId())
                .stream()
                .map(Image::getImageUrl)
                .collect(Collectors.toList());

        return new PublicDestinationDetailDto(
                d.getId(),
                d.getName(),
                d.getSlug(),
                d.getShortDescription(),
                d.getDescription(),
                d.getProvince(),
                d.getThumbnail(),
                d.getCategory() != null ? d.getCategory().getName() : null,
                imageUrls
        );
    }
}
