package com.traveller.laos.service;

import com.traveller.laos.dto.ApiResponse;
import com.traveller.laos.dto.CategoryDto;
import com.traveller.laos.dto.CreateDestinationRequest;
import com.traveller.laos.dto.CreateDestinationResponse;
import com.traveller.laos.dto.DestinationImageDto;
import com.traveller.laos.dto.DestinationListDto;
import com.traveller.laos.dto.PageResponse;
import com.traveller.laos.dto.UpdateDestinationRequest;
import com.traveller.laos.entity.Category;
import com.traveller.laos.entity.Destination;
import com.traveller.laos.entity.Image;
import com.traveller.laos.exception.BadRequestException;
import com.traveller.laos.exception.ResourceNotFoundException;
import com.traveller.laos.repository.CategoryRepository;
import com.traveller.laos.repository.ImageRepository;
import com.traveller.laos.repository.DestinationRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class DestinationService {

    private static final Logger log = LoggerFactory.getLogger(DestinationService.class);
    private static final String TARGET_TYPE = "DESTINATION";

    private final DestinationRepository destinationRepository;
    private final ImageRepository imageRepository;
    private final CategoryRepository categoryRepository;
    private final FileStorageService fileStorageService;

    public DestinationService(DestinationRepository destinationRepository,
                              ImageRepository imageRepository,
                              CategoryRepository categoryRepository,
                              FileStorageService fileStorageService) {
        this.destinationRepository = destinationRepository;
        this.imageRepository = imageRepository;
        this.categoryRepository = categoryRepository;
        this.fileStorageService = fileStorageService;
    }

    @Transactional
    public CreateDestinationResponse createDestination(CreateDestinationRequest request) throws IOException {
        validateCreateRequest(request);

        if (destinationRepository.existsBySlug(request.getSlug()))
            throw new BadRequestException("Slug đã tồn tại");

        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Danh mục", request.getCategoryId()));

        Destination destination = new Destination();
        destination.setName(request.getName());
        destination.setSlug(request.getSlug());
        destination.setShortDescription(request.getShortDescription());
        destination.setDescription(request.getDescription());
        destination.setProvince(request.getProvince());
        destination.setRegion(request.getRegion());
        destination.setCategory(category);
        destination.setStatus(request.getStatus() != null ? request.getStatus() : "ACTIVE");
        destination = destinationRepository.save(destination);

        try {
            if (request.getThumbnail() != null && !request.getThumbnail().isEmpty()) {
                String thumbnailPath = fileStorageService.saveDestinationThumbnail(destination.getId(), request.getThumbnail());
                destination.setThumbnail(thumbnailPath);
                destination = destinationRepository.save(destination);
            }

            if (request.getImages() != null && request.getImages().length > 0) {
                int sortOrder = 1;
                for (MultipartFile imageFile : request.getImages()) {
                    if (imageFile != null && !imageFile.isEmpty()) {
                        String imagePath = fileStorageService.saveDestinationImage(destination.getId(), imageFile);
                        Image img = new Image();
                        img.setTargetType(TARGET_TYPE);
                        img.setTargetId(destination.getId());
                        img.setImageUrl(imagePath);
                        img.setSortOrder(sortOrder++);
                        imageRepository.save(img);
                    }
                }
            }
            return mapToResponse(destination);
        } catch (IOException e) {
            destinationRepository.delete(destination);
            throw e;
        }
    }

    @Transactional
    public CreateDestinationResponse updateDestination(Long id, UpdateDestinationRequest request) throws IOException {
        validateUpdateRequest(request);

        Destination destination = destinationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Địa điểm", id));

        if (!destination.getSlug().equals(request.getSlug()) && destinationRepository.existsBySlug(request.getSlug()))
            throw new BadRequestException("Slug đã tồn tại");

        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Danh mục", request.getCategoryId()));

        destination.setName(request.getName());
        destination.setSlug(request.getSlug());
        destination.setShortDescription(request.getShortDescription());
        destination.setDescription(request.getDescription());
        destination.setProvince(request.getProvince());
        destination.setRegion(request.getRegion());
        destination.setCategory(category);
        destination.setStatus(request.getStatus() != null ? request.getStatus() : "ACTIVE");

        if (request.getThumbnail() != null && !request.getThumbnail().isEmpty()) {
            String thumbnailPath = fileStorageService.saveDestinationThumbnail(destination.getId(), request.getThumbnail());
            destination.setThumbnail(thumbnailPath);
        }
        destination = destinationRepository.save(destination);

        if (request.getImages() != null && request.getImages().length > 0) {
            int sortOrder = imageRepository.findByTargetTypeAndTargetIdOrderBySortOrder(TARGET_TYPE, id).size() + 1;
            for (MultipartFile imageFile : request.getImages()) {
                if (imageFile != null && !imageFile.isEmpty()) {
                    String imagePath = fileStorageService.saveDestinationImage(destination.getId(), imageFile);
                    Image img = new Image();
                    img.setTargetType(TARGET_TYPE);
                    img.setTargetId(destination.getId());
                    img.setImageUrl(imagePath);
                    img.setSortOrder(sortOrder++);
                    imageRepository.save(img);
                }
            }
        }
        return mapToResponse(destination);
    }

    @Transactional
    public void deleteDestination(Long id) {
        Destination destination = destinationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Địa điểm", id));

        List<Image> images = imageRepository.findByTargetTypeAndTargetIdOrderBySortOrder(TARGET_TYPE, id);
        for (Image image : images) {
            fileStorageService.deleteFile(image.getImageUrl());
        }
        imageRepository.deleteByTargetTypeAndTargetId(TARGET_TYPE, id);

        if (destination.getThumbnail() != null)
            fileStorageService.deleteFile(destination.getThumbnail());

        try {
            Path destPath = Paths.get("uploads/destinations", id.toString());
            if (Files.exists(destPath)) Files.deleteIfExists(destPath);
        } catch (IOException ignored) {}

        destinationRepository.delete(destination);
    }

    /**
     * Xóa một ảnh phụ theo ID — dùng cho admin.
     */
    @Transactional
    public void deleteDestinationImage(Long imageId) {
        Image image = imageRepository.findById(imageId)
                .orElseThrow(() -> new ResourceNotFoundException("Ảnh", imageId));

        // Xóa file vật lý
        fileStorageService.deleteFile(image.getImageUrl());

        // Xóa record trong DB
        imageRepository.delete(image);
    }

    /**
     * Tìm kiếm địa điểm với filter và phân trang — dùng cho public API.
     * Chỉ trả về ACTIVE destinations.
     */
    public ApiResponse<PageResponse<DestinationListDto>> getDestinations(
            String keyword, Long categoryId, String province, String region,
            String sortBy, String sortDir, int page, int size) {

        log.info("getDestinations - keyword: {}, categoryId: {}, province: {}, region: {}, sortBy: {}, sortDir: {}, page: {}, size: {}",
                keyword, categoryId, province, region, sortBy, sortDir, page, size);

        // Validate sortBy để tránh injection
        String safeSortBy = List.of("createdAt", "viewCount", "name").contains(sortBy) ? sortBy : "createdAt";
        Sort sort = "asc".equalsIgnoreCase(sortDir)
                ? Sort.by(safeSortBy).ascending()
                : Sort.by(safeSortBy).descending();
        Pageable pageable = PageRequest.of(page, size, sort);

        String kw = StringUtils.hasText(keyword) ? keyword.trim() : null;
        String prov = StringUtils.hasText(province) ? province.trim() : null;
        String reg = StringUtils.hasText(region) ? region.trim() : null;

        Page<Destination> resultPage = destinationRepository.findWithFilters(kw, categoryId, prov, reg, pageable);
        PageResponse<DestinationListDto> pageResponse = PageResponse.from(resultPage, this::mapToListDto);

        return ApiResponse.ok("OK", pageResponse);
    }

    /**
     * Lấy tất cả destinations — dùng cho admin panel (không filter status).
     * Nếu province được cung cấp, lọc theo province (không phân biệt hoa thường).
     */
    public List<DestinationListDto> getAllDestinations(String province) {
        if (StringUtils.hasText(province)) {
            return destinationRepository.findByProvinceContainingIgnoreCase(province.trim())
                    .stream()
                    .map(this::mapToListDto)
                    .collect(Collectors.toList());
        }
        return destinationRepository.findAll().stream()
                .map(this::mapToListDto)
                .collect(Collectors.toList());
    }

    /**
     * Lấy tất cả destinations — dùng cho admin panel (không filter status).
     * @deprecated Dùng {@link #getAllDestinations(String)} thay thế.
     */
    @Deprecated
    public List<DestinationListDto> getAllDestinations() {
        return getAllDestinations(null);
    }

    public CreateDestinationResponse getDestinationById(Long id) {
        Destination destination = destinationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Địa điểm", id));
        return mapToResponse(destination);
    }

    public List<CategoryDto> getAllCategories() {
        return categoryRepository.findAll().stream()
                .map(c -> new CategoryDto(c.getId(), c.getName(), c.getDescription()))
                .collect(Collectors.toList());
    }

    private CreateDestinationResponse mapToResponse(Destination destination) {
        List<Image> images = imageRepository.findByTargetTypeAndTargetIdOrderBySortOrder(TARGET_TYPE, destination.getId());
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
        response.setRegion(destination.getRegion());
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
                destination.getRegion(),
                destination.getThumbnail(),
                destination.getCategory() != null ? destination.getCategory().getName() : null,
                destination.getStatus(),
                destination.getViewCount()
        );
    }

    private void validateCreateRequest(CreateDestinationRequest request) {
        if (request.getName() == null || request.getName().isBlank()) throw new BadRequestException("Tên địa điểm không được để trống");
        if (request.getSlug() == null || request.getSlug().isBlank()) throw new BadRequestException("Slug không được để trống");
        if (request.getShortDescription() == null || request.getShortDescription().isBlank()) throw new BadRequestException("Mô tả ngắn không được để trống");
        if (request.getDescription() == null || request.getDescription().isBlank()) throw new BadRequestException("Mô tả chi tiết không được để trống");
        if (request.getProvince() == null || request.getProvince().isBlank()) throw new BadRequestException("Tỉnh/thành không được để trống");
        if (request.getCategoryId() == null) throw new BadRequestException("Danh mục không được để trống");
        if (request.getThumbnail() == null || request.getThumbnail().isEmpty()) throw new BadRequestException("Ảnh thumbnail là bắt buộc");
        if (!isValidImageFile(request.getThumbnail())) throw new BadRequestException("Thumbnail phải là file ảnh hợp lệ");
        if (request.getImages() != null)
            for (MultipartFile f : request.getImages())
                if (f != null && !f.isEmpty() && !isValidImageFile(f)) throw new BadRequestException("File ảnh không hợp lệ");
    }

    private void validateUpdateRequest(UpdateDestinationRequest request) {
        if (request.getName() == null || request.getName().isBlank()) throw new BadRequestException("Tên địa điểm không được để trống");
        if (request.getSlug() == null || request.getSlug().isBlank()) throw new BadRequestException("Slug không được để trống");
        if (request.getShortDescription() == null || request.getShortDescription().isBlank()) throw new BadRequestException("Mô tả ngắn không được để trống");
        if (request.getDescription() == null || request.getDescription().isBlank()) throw new BadRequestException("Mô tả chi tiết không được để trống");
        if (request.getProvince() == null || request.getProvince().isBlank()) throw new BadRequestException("Tỉnh/thành không được để trống");
        if (request.getCategoryId() == null) throw new BadRequestException("Danh mục không được để trống");
        if (request.getThumbnail() != null && !request.getThumbnail().isEmpty() && !isValidImageFile(request.getThumbnail()))
            throw new BadRequestException("Thumbnail phải là file ảnh hợp lệ");
        if (request.getImages() != null)
            for (MultipartFile f : request.getImages())
                if (f != null && !f.isEmpty() && !isValidImageFile(f)) throw new BadRequestException("File ảnh không hợp lệ");
    }

    private boolean isValidImageFile(MultipartFile file) {
        String ct = file.getContentType();
        return ct != null && (ct.equals("image/jpeg") || ct.equals("image/png") || ct.equals("image/webp") || ct.equals("image/jpg"));
    }
}
