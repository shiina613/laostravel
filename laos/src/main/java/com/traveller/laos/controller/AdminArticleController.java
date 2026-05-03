package com.traveller.laos.controller;

import com.traveller.laos.dto.ApiResponse;
import com.traveller.laos.dto.ArticleRequest;
import com.traveller.laos.dto.ArticleResponse;
import com.traveller.laos.dto.PageResponse;
import com.traveller.laos.service.ArticleService;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/api/admin/articles")
@CrossOrigin(origins = "http://localhost:3000")
public class AdminArticleController {

    private static final Logger log = LoggerFactory.getLogger(AdminArticleController.class);

    private final ArticleService articleService;

    public AdminArticleController(ArticleService articleService) {
        this.articleService = articleService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<PageResponse<ArticleResponse>>> getAllArticles(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        log.info("Admin GET /api/admin/articles - page: {}, size: {}", page, size);
        ApiResponse<PageResponse<ArticleResponse>> response = articleService.getAllArticles(page, size);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ArticleResponse>> getArticleById(@PathVariable Long id) {
        log.info("Admin GET /api/admin/articles/{}", id);
        ArticleResponse article = articleService.getArticleById(id);
        return ResponseEntity.ok(ApiResponse.ok("OK", article));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<ArticleResponse>> createArticle(
            @ModelAttribute @Valid ArticleRequest request) throws IOException {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        log.info("Admin POST /api/admin/articles - title: {}, author: {}", request.getTitle(), username);
        ArticleResponse article = articleService.createArticle(request, username);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.ok("Tạo bài viết thành công", article));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<ArticleResponse>> updateArticle(
            @PathVariable Long id,
            @ModelAttribute ArticleRequest request) throws IOException {
        log.info("Admin PUT /api/admin/articles/{}", id);
        ArticleResponse article = articleService.updateArticle(id, request);
        return ResponseEntity.ok(ApiResponse.ok("Cập nhật bài viết thành công", article));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<?>> deleteArticle(@PathVariable Long id) {
        log.info("Admin DELETE /api/admin/articles/{}", id);
        articleService.deleteArticle(id);
        return ResponseEntity.ok(ApiResponse.ok("Xóa bài viết thành công"));
    }
}
