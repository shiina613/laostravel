package com.traveller.laos.controller;

import com.traveller.laos.dto.PublicDestinationDetailDto;
import com.traveller.laos.dto.PublicDestinationDto;
import com.traveller.laos.entity.Destination;
import com.traveller.laos.entity.DestinationImage;
import com.traveller.laos.repository.DestinationImageRepository;
import com.traveller.laos.repository.DestinationRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/destinations")
@CrossOrigin(origins = "http://localhost:3000")
public class DestinationController {

    private final DestinationRepository destinationRepository;
    private final DestinationImageRepository destinationImageRepository;

    public DestinationController(DestinationRepository destinationRepository,
                                  DestinationImageRepository destinationImageRepository) {
        this.destinationRepository = destinationRepository;
        this.destinationImageRepository = destinationImageRepository;
    }

    // GET /api/destinations?limit=6  — dùng cho homepage
    @GetMapping
    public ResponseEntity<List<PublicDestinationDto>> getActiveDestinations(
            @RequestParam(defaultValue = "100") int limit) {
        List<PublicDestinationDto> result = destinationRepository
                .findByStatusOrderByCreatedAtDesc("ACTIVE")
                .stream()
                .limit(limit)
                .map(this::toListDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(result);
    }

    // GET /api/destinations/{slug}  — trang chi tiết
    @GetMapping("/{slug}")
    public ResponseEntity<?> getBySlug(@PathVariable String slug) {
        return destinationRepository.findBySlug(slug)
                .filter(d -> "ACTIVE".equals(d.getStatus()))
                .map(d -> ResponseEntity.ok(toDetailDto(d)))
                .orElse(ResponseEntity.notFound().build());
    }

    private PublicDestinationDto toListDto(Destination d) {
        return new PublicDestinationDto(
                d.getId(),
                d.getName(),
                d.getSlug(),
                d.getShortDescription(),
                d.getProvince(),
                d.getThumbnail(),
                d.getCategory() != null ? d.getCategory().getName() : null
        );
    }

    private PublicDestinationDetailDto toDetailDto(Destination d) {
        List<String> imageUrls = destinationImageRepository
                .findByDestinationIdOrderBySortOrder(d.getId())
                .stream()
                .map(DestinationImage::getImageUrl)
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
