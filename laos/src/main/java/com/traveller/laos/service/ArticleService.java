package com.traveller.laos.service;

import com.traveller.laos.dto.ApiResponse;
import com.traveller.laos.dto.ArticleRequest;
import com.traveller.laos.dto.ArticleResponse;
import com.traveller.laos.dto.PageResponse;
import com.traveller.laos.entity.Article;
import com.traveller.laos.entity.User;
import com.traveller.laos.exception.BadRequestException;
import com.traveller.laos.exception.ResourceNotFoundException;
import com.traveller.laos.repository.ArticleRepository;
import com.traveller.laos.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.io.IOException;

@Service
public class ArticleService {

    private static final Logger log = LoggerFactory.getLogger(ArticleService.class);

    private final ArticleRepository articleRepository;
    private final UserRepository userRepository;
    private final FileStorageService fileStorageService;

    public ArticleService(ArticleRepository articleRepository,
                          UserRepository userRepository,
                          FileStorageService fileStorageService) {
        this.articleRepository = articleRepository;
        this.userRepository = userRepository;
        this.fileStorageService = fileStorageService;
    }

    public ArticleResponse createArticle(ArticleRequest request, String authorUsername) throws IOException {
        log.info("Creating article with slug: {}, author: {}", request.getSlug(), authorUsername);

        if (articleRepository.existsBySlug(request.getSlug())) {
            throw new BadRequestException("Slug '" + request.getSlug() + "' đã tồn tại");
        }

        User author = userRepository.findByUsername(authorUsername)
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", authorUsername));

        Article article = new Article();
        article.setTitle(request.getTitle());
        article.setSlug(request.getSlug());
        article.setSummary(request.getSummary());
        article.setContent(request.getContent());
        article.setAuthor(author);
        article.setStatus(StringUtils.hasText(request.getStatus()) ? request.getStatus() : "ACTIVE");

        // Save first to get ID for thumbnail path
        article = articleRepository.save(article);

        // Save thumbnail if provided
        if (request.getThumbnail() != null && !request.getThumbnail().isEmpty()) {
            String thumbnailPath = fileStorageService.saveArticleThumbnail(article.getId(), request.getThumbnail());
            article.setThumbnail(thumbnailPath);
            article = articleRepository.save(article);
        }

        log.info("Article created with id: {}", article.getId());
        return toResponse(article);
    }

    public ArticleResponse updateArticle(Long id, ArticleRequest request) throws IOException {
        log.info("Updating article with id: {}", id);

        Article article = articleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Article", id));

        // Check slug uniqueness if slug changed
        if (!article.getSlug().equals(request.getSlug())) {
            if (articleRepository.existsBySlugAndIdNot(request.getSlug(), id)) {
                throw new BadRequestException("Slug '" + request.getSlug() + "' đã tồn tại");
            }
        }

        article.setTitle(request.getTitle());
        article.setSlug(request.getSlug());
        article.setSummary(request.getSummary());
        article.setContent(request.getContent());
        if (StringUtils.hasText(request.getStatus())) {
            article.setStatus(request.getStatus());
        }

        // Update thumbnail if new one provided
        if (request.getThumbnail() != null && !request.getThumbnail().isEmpty()) {
            // Delete old thumbnail if exists
            if (StringUtils.hasText(article.getThumbnail())) {
                fileStorageService.deleteArticleFile(article.getThumbnail());
            }
            String thumbnailPath = fileStorageService.saveArticleThumbnail(article.getId(), request.getThumbnail());
            article.setThumbnail(thumbnailPath);
        }

        article = articleRepository.save(article);
        log.info("Article updated with id: {}", article.getId());
        return toResponse(article);
    }

    public void deleteArticle(Long id) {
        log.info("Deleting article with id: {}", id);

        Article article = articleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Article", id));

        // Delete thumbnail file if exists
        if (StringUtils.hasText(article.getThumbnail())) {
            fileStorageService.deleteArticleFile(article.getThumbnail());
        }

        articleRepository.delete(article);
        log.info("Article deleted with id: {}", id);
    }

    public ApiResponse<PageResponse<ArticleResponse>> getAllArticles(int page, int size) {
        log.info("Getting all articles (admin), page: {}, size: {}", page, size);

        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        Page<Article> articlePage = articleRepository.findAll(pageable);
        PageResponse<ArticleResponse> pageResponse = PageResponse.from(articlePage, this::toResponse);

        return ApiResponse.ok("OK", pageResponse);
    }

    /**
     * Lấy bài viết ACTIVE cho public — có pagination.
     */
    public ApiResponse<PageResponse<ArticleResponse>> getActiveArticles(int page, int size) {
        log.info("Getting active articles, page: {}, size: {}", page, size);

        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        Page<Article> articlePage = articleRepository.findByStatus("ACTIVE", pageable);
        PageResponse<ArticleResponse> pageResponse = PageResponse.from(articlePage, this::toResponse);

        return ApiResponse.ok("OK", pageResponse);
    }

    public ArticleResponse getArticleById(Long id) {
        log.info("Getting article by id: {}", id);

        Article article = articleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Article", id));

        return toResponse(article);
    }

    public ArticleResponse getArticleBySlug(String slug) {
        log.info("Getting article by slug: {}", slug);

        Article article = articleRepository.findBySlug(slug)
                .orElseThrow(() -> new ResourceNotFoundException("Article", "slug", slug));

        // Increment viewCount
        article.setViewCount(article.getViewCount() == null ? 1 : article.getViewCount() + 1);
        article = articleRepository.save(article);

        return toResponse(article);
    }

    private ArticleResponse toResponse(Article article) {
        ArticleResponse r = new ArticleResponse();
        r.setId(article.getId());
        r.setTitle(article.getTitle());
        r.setSlug(article.getSlug());
        r.setSummary(article.getSummary());
        r.setContent(article.getContent());
        r.setThumbnail(article.getThumbnail());
        r.setAuthorName(article.getAuthor() != null ? article.getAuthor().getFullName() : null);
        r.setStatus(article.getStatus());
        r.setCreatedAt(article.getCreatedAt());
        r.setViewCount(article.getViewCount());
        return r;
    }
}
