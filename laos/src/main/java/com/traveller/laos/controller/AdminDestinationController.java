package com.traveller.laos.controller;

import com.traveller.laos.dto.CategoryDto;
import com.traveller.laos.dto.CreateDestinationRequest;
import com.traveller.laos.dto.CreateDestinationResponse;
import com.traveller.laos.dto.DestinationListDto;
import com.traveller.laos.dto.UpdateDestinationRequest;
import com.traveller.laos.service.DestinationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/admin/destinations")
@CrossOrigin(origins = "http://localhost:3000")
public class AdminDestinationController {
    private final DestinationService destinationService;

    public AdminDestinationController(DestinationService destinationService) {
        this.destinationService = destinationService;
    }

    @PostMapping
    public ResponseEntity<?> createDestination(
            @RequestParam String name,
            @RequestParam String slug,
            @RequestParam String shortDescription,
            @RequestParam String description,
            @RequestParam String province,
            @RequestParam Long categoryId,
            @RequestParam(required = false) String status,
            @RequestParam MultipartFile thumbnail,
            @RequestParam(required = false) MultipartFile[] images) {
        try {
            CreateDestinationRequest request = new CreateDestinationRequest();
            request.setName(name);
            request.setSlug(slug);
            request.setShortDescription(shortDescription);
            request.setDescription(description);
            request.setProvince(province);
            request.setCategoryId(categoryId);
            request.setStatus(status);
            request.setThumbnail(thumbnail);
            request.setImages(images);

            CreateDestinationResponse response = destinationService.createDestination(request);
            return ResponseEntity.ok(response);
        } catch (IOException e) {
            return ResponseEntity.badRequest().body(new Object() {
                public String message = "Lỗi khi upload ảnh: " + e.getMessage();
            });
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(new Object() {
                public String message = e.getMessage();
            });
        }
    }

    @GetMapping
    public ResponseEntity<List<DestinationListDto>> getAllDestinations(
            @RequestParam(required = false) String province) {
        List<DestinationListDto> destinations = destinationService.getAllDestinations(province);
        return ResponseEntity.ok(destinations);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getDestinationById(@PathVariable Long id) {
        try {
            CreateDestinationResponse destination = destinationService.getDestinationById(id);
            return ResponseEntity.ok(destination);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(new Object() {
                public String message = e.getMessage();
            });
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteDestination(@PathVariable Long id) {
        try {
            destinationService.deleteDestination(id);
            return ResponseEntity.ok(new Object() {
                public String message = "Xóa địa điểm thành công";
            });
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(new Object() {
                public String message = e.getMessage();
            });
        }
    }
    @PutMapping("/{id}")
    public ResponseEntity<?> updateDestination(
            @PathVariable Long id,
            @RequestParam String name,
            @RequestParam String slug,
            @RequestParam String shortDescription,
            @RequestParam String description,
            @RequestParam String province,
            @RequestParam Long categoryId,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) MultipartFile thumbnail,
            @RequestParam(required = false) MultipartFile[] images) {
        try {
            UpdateDestinationRequest request = new UpdateDestinationRequest();
            request.setName(name);
            request.setSlug(slug);
            request.setShortDescription(shortDescription);
            request.setDescription(description);
            request.setProvince(province);
            request.setCategoryId(categoryId);
            request.setStatus(status);
            request.setThumbnail(thumbnail);
            request.setImages(images);

            CreateDestinationResponse response = destinationService.updateDestination(id, request);
            return ResponseEntity.ok(response);
        } catch (IOException e) {
            return ResponseEntity.badRequest().body(new Object() {
                public String message = "Lỗi khi upload ảnh: " + e.getMessage();
            });
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(new Object() {
                public String message = e.getMessage();
            });
        }
    }



    @GetMapping("/categories")
    public ResponseEntity<List<CategoryDto>> getCategories() {
        List<CategoryDto> categories = destinationService.getAllCategories();
        return ResponseEntity.ok(categories);
    }
}
