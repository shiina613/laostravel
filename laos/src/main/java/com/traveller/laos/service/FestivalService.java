package com.traveller.laos.service;

import com.traveller.laos.dto.ApiResponse;
import com.traveller.laos.dto.FestivalRequest;
import com.traveller.laos.dto.FestivalResponse;
import com.traveller.laos.dto.PageResponse;
import com.traveller.laos.entity.Festival;
import com.traveller.laos.exception.BadRequestException;
import com.traveller.laos.exception.ResourceNotFoundException;
import com.traveller.laos.repository.FestivalRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeParseException;

@Service
public class FestivalService {

    private static final Logger log = LoggerFactory.getLogger(FestivalService.class);

    private final FestivalRepository festivalRepository;
    private final FileStorageService fileStorageService;

    public FestivalService(FestivalRepository festivalRepository, FileStorageService fileStorageService) {
        this.festivalRepository = festivalRepository;
        this.fileStorageService = fileStorageService;
    }

    public FestivalResponse createFestival(FestivalRequest request) throws IOException {
        log.info("Creating festival with slug: {}", request.getSlug());

        if (festivalRepository.existsBySlug(request.getSlug())) {
            throw new BadRequestException("Slug '" + request.getSlug() + "' đã tồn tại");
        }

        Festival festival = new Festival();
        festival.setName(request.getName());
        festival.setSlug(request.getSlug());
        festival.setShortDescription(request.getShortDescription());
        festival.setDescription(request.getDescription());
        festival.setProvince(request.getProvince());
        festival.setStartDate(parseDate(request.getStartDate()));
        festival.setEndDate(parseDate(request.getEndDate()));
        festival.setStatus(StringUtils.hasText(request.getStatus()) ? request.getStatus() : "ACTIVE");

        // Save first to get ID for thumbnail path
        festival = festivalRepository.save(festival);

        // Save thumbnail if provided
        if (request.getThumbnail() != null && !request.getThumbnail().isEmpty()) {
            String thumbnailPath = fileStorageService.saveFestivalThumbnail(festival.getId(), request.getThumbnail());
            festival.setThumbnail(thumbnailPath);
            festival = festivalRepository.save(festival);
        }

        log.info("Festival created with id: {}", festival.getId());
        return toResponse(festival);
    }

    public FestivalResponse updateFestival(Long id, FestivalRequest request) throws IOException {
        log.info("Updating festival with id: {}", id);

        Festival festival = festivalRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Festival", id));

        // Check slug uniqueness if slug changed
        if (!festival.getSlug().equals(request.getSlug())) {
            if (festivalRepository.existsBySlugAndIdNot(request.getSlug(), id)) {
                throw new BadRequestException("Slug '" + request.getSlug() + "' đã tồn tại");
            }
        }

        festival.setName(request.getName());
        festival.setSlug(request.getSlug());
        festival.setShortDescription(request.getShortDescription());
        festival.setDescription(request.getDescription());
        festival.setProvince(request.getProvince());
        festival.setStartDate(parseDate(request.getStartDate()));
        festival.setEndDate(parseDate(request.getEndDate()));
        if (StringUtils.hasText(request.getStatus())) {
            festival.setStatus(request.getStatus());
        }

        // Update thumbnail if new one provided
        if (request.getThumbnail() != null && !request.getThumbnail().isEmpty()) {
            // Delete old thumbnail if exists
            if (StringUtils.hasText(festival.getThumbnail())) {
                fileStorageService.deleteFestivalFile(festival.getThumbnail());
            }
            String thumbnailPath = fileStorageService.saveFestivalThumbnail(festival.getId(), request.getThumbnail());
            festival.setThumbnail(thumbnailPath);
        }

        festival = festivalRepository.save(festival);
        log.info("Festival updated with id: {}", festival.getId());
        return toResponse(festival);
    }

    public void deleteFestival(Long id) {
        log.info("Deleting festival with id: {}", id);

        Festival festival = festivalRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Festival", id));

        // Delete thumbnail file if exists
        if (StringUtils.hasText(festival.getThumbnail())) {
            fileStorageService.deleteFestivalFile(festival.getThumbnail());
        }

        festivalRepository.delete(festival);
        log.info("Festival deleted with id: {}", id);
    }

    public ApiResponse<PageResponse<FestivalResponse>> getAllFestivals(String province, int page, int size) {
        log.info("Getting all festivals (admin), province filter: {}, page: {}, size: {}", province, page, size);

        Pageable pageable = PageRequest.of(page, size);
        String provinceFilter = StringUtils.hasText(province) ? province : null;

        Page<Festival> festivalPage = festivalRepository.findWithFilters(provinceFilter, pageable);
        PageResponse<FestivalResponse> pageResponse = PageResponse.from(festivalPage, this::toResponse);

        return ApiResponse.ok("OK", pageResponse);
    }

    /**
     * Lấy danh sách lễ hội ACTIVE cho public — có filter province và pagination.
     */
    public ApiResponse<PageResponse<FestivalResponse>> getActiveFestivals(String province, int page, int size) {
        log.info("Getting active festivals, province filter: {}, page: {}, size: {}", province, page, size);

        Pageable pageable = PageRequest.of(page, size, org.springframework.data.domain.Sort.by("startDate").ascending());
        String provinceFilter = StringUtils.hasText(province) ? province : null;

        Page<Festival> festivalPage = festivalRepository.findActiveWithFilters(provinceFilter, pageable);
        PageResponse<FestivalResponse> pageResponse = PageResponse.from(festivalPage, this::toResponse);

        return ApiResponse.ok("OK", pageResponse);
    }

    public FestivalResponse getFestivalById(Long id) {
        log.info("Getting festival by id: {}", id);

        Festival festival = festivalRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Festival", id));

        return toResponse(festival);
    }

    public FestivalResponse getFestivalBySlug(String slug) {
        log.info("Getting festival by slug: {}", slug);

        Festival festival = festivalRepository.findBySlug(slug)
                .orElseThrow(() -> new ResourceNotFoundException("Festival", "slug", slug));

        // Increment viewCount
        festival.setViewCount(festival.getViewCount() == null ? 1 : festival.getViewCount() + 1);
        festival = festivalRepository.save(festival);

        return toResponse(festival);
    }

    private LocalDate parseDate(String dateStr) {
        if (!StringUtils.hasText(dateStr)) {
            return null;
        }
        try {
            return LocalDate.parse(dateStr);
        } catch (DateTimeParseException e) {
            log.warn("Could not parse date: {}", dateStr);
            return null;
        }
    }

    private FestivalResponse toResponse(Festival festival) {
        FestivalResponse r = new FestivalResponse();
        r.setId(festival.getId());
        r.setName(festival.getName());
        r.setSlug(festival.getSlug());
        r.setShortDescription(festival.getShortDescription());
        r.setDescription(festival.getDescription());
        r.setProvince(festival.getProvince());
        r.setStartDate(festival.getStartDate());
        r.setEndDate(festival.getEndDate());
        r.setThumbnail(festival.getThumbnail());
        r.setStatus(festival.getStatus());
        r.setCreatedAt(festival.getCreatedAt());
        r.setViewCount(festival.getViewCount());
        return r;
    }
}
