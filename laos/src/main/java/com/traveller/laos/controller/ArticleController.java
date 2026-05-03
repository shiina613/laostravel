package com.traveller.laos.controller;

import com.traveller.laos.dto.ApiResponse;
import com.traveller.laos.dto.ArticleResponse;
import com.traveller.laos.dto.PageResponse;
import com.traveller.laos.service.ArticleService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/articles")
@CrossOrigin(origins = "http://localhost:3000")
public class ArticleController {

    private static final Logger log = LoggerFactory.getLogger(ArticleController.class);

    private final ArticleService articleService;

    public ArticleController(ArticleService articleService) {
        this.articleService = articleService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<PageResponse<ArticleResponse>>> getActiveArticles(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        log.info("GET /api/articles - page: {}, size: {}", page, size);
        ApiResponse<PageResponse<ArticleResponse>> response = articleService.getActiveArticles(page, size);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{slug}")
    public ResponseEntity<ApiResponse<ArticleResponse>> getBySlug(@PathVariable String slug) {
        log.info("GET /api/articles/{}", slug);
        ArticleResponse article = articleService.getArticleBySlug(slug);
        return ResponseEntity.ok(ApiResponse.ok("OK", article));
    }
}
