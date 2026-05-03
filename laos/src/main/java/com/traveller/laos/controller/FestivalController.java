package com.traveller.laos.controller;

import com.traveller.laos.dto.ApiResponse;
import com.traveller.laos.dto.FestivalResponse;
import com.traveller.laos.dto.PageResponse;
import com.traveller.laos.service.FestivalService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/festivals")
@CrossOrigin(origins = "http://localhost:3000")
public class FestivalController {

    private static final Logger log = LoggerFactory.getLogger(FestivalController.class);

    private final FestivalService festivalService;

    public FestivalController(FestivalService festivalService) {
        this.festivalService = festivalService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<PageResponse<FestivalResponse>>> getActiveFestivals(
            @RequestParam(required = false) String province,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        log.info("GET /api/festivals - province: {}, page: {}, size: {}", province, page, size);
        ApiResponse<PageResponse<FestivalResponse>> response = festivalService.getActiveFestivals(province, page, size);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{slug}")
    public ResponseEntity<ApiResponse<FestivalResponse>> getBySlug(@PathVariable String slug) {
        log.info("GET /api/festivals/{}", slug);
        FestivalResponse festival = festivalService.getFestivalBySlug(slug);
        return ResponseEntity.ok(ApiResponse.ok("OK", festival));
    }
}
