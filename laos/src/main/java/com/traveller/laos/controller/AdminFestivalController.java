package com.traveller.laos.controller;

import com.traveller.laos.dto.ApiResponse;
import com.traveller.laos.dto.FestivalRequest;
import com.traveller.laos.dto.FestivalResponse;
import com.traveller.laos.dto.PageResponse;
import com.traveller.laos.service.FestivalService;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/api/admin/festivals")
@CrossOrigin(origins = "http://localhost:3000")
public class AdminFestivalController {

    private static final Logger log = LoggerFactory.getLogger(AdminFestivalController.class);

    private final FestivalService festivalService;

    public AdminFestivalController(FestivalService festivalService) {
        this.festivalService = festivalService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<PageResponse<FestivalResponse>>> getAllFestivals(
            @RequestParam(required = false) String province,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        log.info("Admin GET /api/admin/festivals - province: {}, page: {}, size: {}", province, page, size);
        ApiResponse<PageResponse<FestivalResponse>> response = festivalService.getAllFestivals(province, page, size);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<FestivalResponse>> getFestivalById(@PathVariable Long id) {
        log.info("Admin GET /api/admin/festivals/{}", id);
        FestivalResponse festival = festivalService.getFestivalById(id);
        return ResponseEntity.ok(ApiResponse.ok("OK", festival));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<FestivalResponse>> createFestival(
            @ModelAttribute @Valid FestivalRequest request) throws IOException {
        log.info("Admin POST /api/admin/festivals - name: {}", request.getName());
        FestivalResponse festival = festivalService.createFestival(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.ok("Tạo lễ hội thành công", festival));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<FestivalResponse>> updateFestival(
            @PathVariable Long id,
            @ModelAttribute FestivalRequest request) throws IOException {
        log.info("Admin PUT /api/admin/festivals/{}", id);
        FestivalResponse festival = festivalService.updateFestival(id, request);
        return ResponseEntity.ok(ApiResponse.ok("Cập nhật lễ hội thành công", festival));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<?>> deleteFestival(@PathVariable Long id) {
        log.info("Admin DELETE /api/admin/festivals/{}", id);
        festivalService.deleteFestival(id);
        return ResponseEntity.ok(ApiResponse.ok("Xóa lễ hội thành công"));
    }
}
