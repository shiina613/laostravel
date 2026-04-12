package com.traveller.laos.controller;

import com.traveller.laos.dto.PublicFestivalDto;
import com.traveller.laos.entity.Festival;
import com.traveller.laos.repository.FestivalRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/festivals")
@CrossOrigin(origins = "http://localhost:3000")
public class FestivalController {

    private final FestivalRepository festivalRepository;

    public FestivalController(FestivalRepository festivalRepository) {
        this.festivalRepository = festivalRepository;
    }

    @GetMapping
    public ResponseEntity<List<PublicFestivalDto>> getActiveFestivals(
            @RequestParam(defaultValue = "6") int limit) {
        List<PublicFestivalDto> result = festivalRepository.findByStatusOrderByStartDateAsc("ACTIVE")
                .stream()
                .limit(limit)
                .map(this::toDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(result);
    }

    private PublicFestivalDto toDto(Festival f) {
        return new PublicFestivalDto(
                f.getId(),
                f.getName(),
                f.getSlug(),
                f.getShortDescription(),
                f.getProvince(),
                f.getThumbnail(),
                f.getStartDate(),
                f.getEndDate()
        );
    }
}
