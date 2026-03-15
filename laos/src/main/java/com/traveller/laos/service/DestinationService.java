package com.traveller.laos.service;

import com.traveller.laos.dto.CategoryDto;
import com.traveller.laos.dto.CreateDestinationRequest;
import com.traveller.laos.dto.CreateDestinationResponse;
import com.traveller.laos.dto.DestinationImageDto;
import com.traveller.laos.dto.DestinationListDto;
import com.traveller.laos.dto.UpdateDestinationRequest;
import com.traveller.laos.entity.Category;
import com.traveller.laos.entity.Destination;
import com.traveller.laos.entity.DestinationImage;
import com.traveller.laos.repository.CategoryRepository;
import com.traveller.laos.repository.DestinationImageRepository;
import com.traveller.laos.repository.DestinationRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class DestinationService {
    private final DestinationRepository destinationRepository;
    private final DestinationImageRepository destinationImageRepository;
    private final CategoryRepository categoryRepository;
    private final FileStorageService fileStorageService;

    public DestinationService(DestinationRepository destinationRepository,
                             DestinationImageRepository destinationImageRepository,
                             CategoryRepository categoryRepository,
                             FileStorageService fileStorageService) {
        this.destinationRepository = destinationRepository;
        this.destinationImageRepository = destinationImageRepository;
        this.categoryRepository = categoryRepository;
        this.fileStorageService = fileStorageService;
    }

    @Transactional
    public CreateDestinationResponse createDestination(CreateDestinationRequest request) throws IOException {
        // Validate
        validateCreateRequest(request);

        // Kiểm tra slug không trùng
        if (destinationRepository.existsBySlug(request.getSlug())) {
            throw new RuntimeException("Slug đã tồn tại");
        }

        // Kiểm tra category tồn tại
        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Danh mục không tồn tại"));

        // Tạo destination trước để lấy id
        Destination destination = new Destination();
        destination.setName(request.getName());
        destination.setSlug(request.getSlug());
        destination.setShortDescription(request.getShortDescription());
        destination.setDescription(request.getDescription());
        destination.setProvince(request.getProvince());
        destination.setCategory(category);
        destination.setStatus(request.getStatus() != null ? request.getStatus() : "ACTIVE");
        destination = destinationRepository.save(destination);

        try {
            // Lưu thumbnail
            if (request.getThumbnail() != null && !request.getThumbnail().isEmpty()) {
                String thumbnailPath = fileStorageService.saveDestinationThumbnail(destination.getId(), request.getThumbnail());
                destination.setThumbnail(thumbnailPath);
                destination = destinationRepository.save(destination);
            }

            // Lưu ảnh phụ
            if (request.getImages() != null && request.getImages().length > 0) {
                int sortOrder = 1;
                for (MultipartFile imageFile : request.getImages()) {
                    if (imageFile != null && !imageFile.isEmpty()) {
                        String imagePath = fileStorageService.saveDestinationImage(destination.getId(), imageFile);
                        
                        DestinationImage destinationImage = new DestinationImage();
                        destinationImage.setDestination(destination);
                        destinationImage.setImageUrl(imagePath);
                        destinationImage.setSortOrder(sortOrder++);
                        destinationImageRepository.save(destinationImage);
                    }
                }
            }

            // Trả về response
            return mapToResponse(destination);
        } catch (IOException e) {
            // Xóa destination nếu có lỗi upload
            destinationRepository.delete(destination);
            throw new RuntimeException("Lỗi khi upload ảnh: " + e.getMessage());
        }
    }

    @Transactional
    public CreateDestinationResponse updateDestination(Long id, UpdateDestinationRequest request) throws IOException {
        // Validate
        validateUpdateRequest(request);

        // Tìm destination
        Destination destination = destinationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Địa điểm không tồn tại"));

        // Kiểm tra slug không trùng (ngoại trừ destination hiện tại)
        if (!destination.getSlug().equals(request.getSlug()) && destinationRepository.existsBySlug(request.getSlug())) {
            throw new RuntimeException("Slug đã tồn tại");
        }

        // Kiểm tra category tồn tại
        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Danh mục không tồn tại"));

        // Cập nhật thông tin
        destination.setName(request.getName());
        destination.setSlug(request.getSlug());
        destination.setShortDescription(request.getShortDescription());
        destination.setDescription(request.getDescription());
        destination.setProvince(request.getProvince());
        destination.setCategory(category);
        destination.setStatus(request.getStatus() != null ? request.getStatus() : "ACTIVE");

        // Cập nhật thumbnail nếu có
        if (request.getThumbnail() != null && !request.getThumbnail().isEmpty()) {
            String thumbnailPath = fileStorageService.saveDestinationThumbnail(destination.getId(), request.getThumbnail());
            destination.setThumbnail(thumbnailPath);
        }

        destination = destinationRepository.save(destination);

        // Thêm ảnh phụ nếu có
        if (request.getImages() != null && request.getImages().length > 0) {
            int sortOrder = destinationImageRepository.findByDestinationIdOrderBySortOrder(id).size() + 1;
            for (MultipartFile imageFile : request.getImages()) {
                if (imageFile != null && !imageFile.isEmpty()) {
                    String imagePath = fileStorageService.saveDestinationImage(destination.getId(), imageFile);
                    
                    DestinationImage destinationImage = new DestinationImage();
                    destinationImage.setDestination(destination);
                    destinationImage.setImageUrl(imagePath);
                    destinationImage.setSortOrder(sortOrder++);
                    destinationImageRepository.save(destinationImage);
                }
            }
        }

        return mapToResponse(destination);
    }

    @Transactional
    public void deleteDestination(Long id) {
        Destination destination = destinationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Địa điểm không tồn tại"));

        // Xóa ảnh phụ
        List<DestinationImage> images = destinationImageRepository.findByDestinationIdOrderBySortOrder(id);
        for (DestinationImage image : images) {
            fileStorageService.deleteFile(image.getImageUrl());
            destinationImageRepository.delete(image);
        }

        // Xóa thumbnail
        if (destination.getThumbnail() != null) {
            fileStorageService.deleteFile(destination.getThumbnail());
        }

        // Xóa folder
        try {
            Path destinationPath = Paths.get("uploads/destinations", id.toString());
            if (Files.exists(destinationPath)) {
                Files.deleteIfExists(destinationPath);
            }
        } catch (IOException e) {
            // Log error but don't throw
        }

        // Xóa destination
        destinationRepository.delete(destination);
    }

    public List<DestinationListDto> getAllDestinations() {
        return destinationRepository.findAll().stream()
                .map(this::mapToListDto)
                .collect(Collectors.toList());
    }

    public CreateDestinationResponse getDestinationById(Long id) {
        Destination destination = destinationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Địa điểm không tồn tại"));
        return mapToResponse(destination);
    }

    public List<CategoryDto> getAllCategories() {
        return categoryRepository.findAll().stream()
                .map(c -> new CategoryDto(c.getId(), c.getName(), c.getDescription()))
                .collect(Collectors.toList());
    }

    private void validateCreateRequest(CreateDestinationRequest request) {
        if (request.getName() == null || request.getName().trim().isEmpty()) {
            throw new RuntimeException("Tên địa điểm không được để trống");
        }
        if (request.getSlug() == null || request.getSlug().trim().isEmpty()) {
            throw new RuntimeException("Slug không được để trống");
        }
        if (request.getShortDescription() == null || request.getShortDescription().trim().isEmpty()) {
            throw new RuntimeException("Mô tả ngắn không được để trống");
        }
        if (request.getDescription() == null || request.getDescription().trim().isEmpty()) {
            throw new RuntimeException("Mô tả chi tiết không được để trống");
        }
        if (request.getProvince() == null || request.getProvince().trim().isEmpty()) {
            throw new RuntimeException("Tỉnh/thành không được để trống");
        }
        if (request.getCategoryId() == null) {
            throw new RuntimeException("Danh mục không được để trống");
        }
        if (request.getThumbnail() == null || request.getThumbnail().isEmpty()) {
            throw new RuntimeException("Ảnh thumbnail là bắt buộc");
        }
        if (!isValidImageFile(request.getThumbnail())) {
            throw new RuntimeException("Thumbnail phải là file ảnh hợp lệ (jpg, jpeg, png, webp)");
        }
        if (request.getImages() != null) {
            for (MultipartFile image : request.getImages()) {
                if (image != null && !image.isEmpty() && !isValidImageFile(image)) {
                    throw new RuntimeException("Các file ảnh phải là ảnh hợp lệ (jpg, jpeg, png, webp)");
                }
            }
        }
    }

    private void validateUpdateRequest(UpdateDestinationRequest request) {
        if (request.getName() == null || request.getName().trim().isEmpty()) {
            throw new RuntimeException("Tên địa điểm không được để trống");
        }
        if (request.getSlug() == null || request.getSlug().trim().isEmpty()) {
            throw new RuntimeException("Slug không được để trống");
        }
        if (request.getShortDescription() == null || request.getShortDescription().trim().isEmpty()) {
            throw new RuntimeException("Mô tả ngắn không được để trống");
        }
        if (request.getDescription() == null || request.getDescription().trim().isEmpty()) {
            throw new RuntimeException("Mô tả chi tiết không được để trống");
        }
        if (request.getProvince() == null || request.getProvince().trim().isEmpty()) {
            throw new RuntimeException("Tỉnh/thành không được để trống");
        }
        if (request.getCategoryId() == null) {
            throw new RuntimeException("Danh mục không được để trống");
        }
        if (request.getThumbnail() != null && !request.getThumbnail().isEmpty() && !isValidImageFile(request.getThumbnail())) {
            throw new RuntimeException("Thumbnail phải là file ảnh hợp lệ (jpg, jpeg, png, webp)");
        }
        if (request.getImages() != null) {
            for (MultipartFile image : request.getImages()) {
                if (image != null && !image.isEmpty() && !isValidImageFile(image)) {
                    throw new RuntimeException("Các file ảnh phải là ảnh hợp lệ (jpg, jpeg, png, webp)");
                }
            }
        }
    }

    private boolean isValidImageFile(MultipartFile file) {
        String contentType = file.getContentType();
        return contentType != null && (
                contentType.equals("image/jpeg") ||
                contentType.equals("image/png") ||
                contentType.equals("image/webp") ||
                contentType.equals("image/jpg")
        );
    }

    private CreateDestinationResponse mapToResponse(Destination destination) {
        List<DestinationImage> images = destinationImageRepository.findByDestinationIdOrderBySortOrder(destination.getId());
        List<DestinationImageDto> imageDtos = images.stream()
                .map(img -> new DestinationImageDto(img.getId(), img.getImageUrl(), img.getCaption(), img.getSortOrder()))
                .collect(Collectors.toList());

        CreateDestinationResponse response = new CreateDestinationResponse();
        response.setId(destination.getId());
        response.setName(destination.getName());
        response.setSlug(destination.getSlug());
        response.setShortDescription(destination.getShortDescription());
        response.setDescription(destination.getDescription());
        response.setProvince(destination.getProvince());
        response.setThumbnail(destination.getThumbnail());
        response.setCategoryId(destination.getCategory().getId());
        response.setStatus(destination.getStatus());
        response.setCreatedAt(destination.getCreatedAt());
        response.setImages(imageDtos);
        return response;
    }

    private DestinationListDto mapToListDto(Destination destination) {
        return new DestinationListDto(
                destination.getId(),
                destination.getName(),
                destination.getSlug(),
                destination.getProvince(),
                destination.getThumbnail(),
                destination.getCategory().getName(),
                destination.getStatus()
        );
    }
}
