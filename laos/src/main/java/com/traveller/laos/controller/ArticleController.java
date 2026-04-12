package com.traveller.laos.controller;

import com.traveller.laos.dto.PublicArticleDto;
import com.traveller.laos.entity.Article;
import com.traveller.laos.repository.ArticleRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/articles")
@CrossOrigin(origins = "http://localhost:3000")
public class ArticleController {

    private final ArticleRepository articleRepository;

    public ArticleController(ArticleRepository articleRepository) {
        this.articleRepository = articleRepository;
    }

    @GetMapping
    public ResponseEntity<List<PublicArticleDto>> getActiveArticles(
            @RequestParam(defaultValue = "3") int limit) {
        List<PublicArticleDto> result = articleRepository.findByStatusOrderByCreatedAtDesc("ACTIVE")
                .stream()
                .limit(limit)
                .map(this::toDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(result);
    }

    private PublicArticleDto toDto(Article a) {
        return new PublicArticleDto(
                a.getId(),
                a.getTitle(),
                a.getSlug(),
                a.getSummary(),
                a.getThumbnail(),
                a.getCreatedAt()
        );
    }
}
