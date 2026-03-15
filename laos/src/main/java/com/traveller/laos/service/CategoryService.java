package com.traveller.laos.service;

import com.traveller.laos.dto.CategoryResponse;
import com.traveller.laos.dto.CreateCategoryRequest;
import com.traveller.laos.dto.UpdateCategoryRequest;
import com.traveller.laos.entity.Category;
import com.traveller.laos.repository.CategoryRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoryService {
    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public CategoryResponse createCategory(CreateCategoryRequest request) {
        // Validate
        validateCreateRequest(request);

        // Trim whitespace
        String name = request.getName().trim();
        String description = request.getDescription() != null ? request.getDescription().trim() : "";

        // Check if name already exists
        if (categoryRepository.existsByName(name)) {
            throw new RuntimeException("Tên danh mục đã tồn tại");
        }

        // Create category
        Category category = new Category();
        category.setName(name);
        category.setDescription(description);
        category = categoryRepository.save(category);

        return mapToResponse(category);
    }

    public CategoryResponse updateCategory(Long id, UpdateCategoryRequest request) {
        // Validate
        validateUpdateRequest(request);

        // Find category
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Danh mục không tồn tại"));

        // Trim whitespace
        String name = request.getName().trim();
        String description = request.getDescription() != null ? request.getDescription().trim() : "";

        // Check if name already exists (excluding current category)
        if (!category.getName().equals(name) && categoryRepository.existsByName(name)) {
            throw new RuntimeException("Tên danh mục đã tồn tại");
        }

        // Update category
        category.setName(name);
        category.setDescription(description);
        category = categoryRepository.save(category);

        return mapToResponse(category);
    }

    public void deleteCategory(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Danh mục không tồn tại"));
        categoryRepository.delete(category);
    }

    public List<CategoryResponse> getAllCategories() {
        return categoryRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public CategoryResponse getCategoryById(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Danh mục không tồn tại"));
        return mapToResponse(category);
    }

    private void validateCreateRequest(CreateCategoryRequest request) {
        if (request.getName() == null || request.getName().trim().isEmpty()) {
            throw new RuntimeException("Tên danh mục không được để trống");
        }
    }

    private void validateUpdateRequest(UpdateCategoryRequest request) {
        if (request.getName() == null || request.getName().trim().isEmpty()) {
            throw new RuntimeException("Tên danh mục không được để trống");
        }
    }

    private CategoryResponse mapToResponse(Category category) {
        return new CategoryResponse(category.getId(), category.getName(), category.getDescription());
    }
}
