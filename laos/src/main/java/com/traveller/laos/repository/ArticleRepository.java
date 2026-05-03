package com.traveller.laos.repository;

import com.traveller.laos.entity.Article;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ArticleRepository extends JpaRepository<Article, Long> {

    List<Article> findByStatusOrderByCreatedAtDesc(String status);

    Optional<Article> findBySlug(String slug);

    boolean existsBySlug(String slug);

    boolean existsBySlugAndIdNot(String slug, Long id);

    Page<Article> findAll(Pageable pageable);

    /**
     * Lấy bài viết ACTIVE cho public.
     */
    Page<Article> findByStatus(String status, Pageable pageable);

    List<Article> findTop5ByOrderByViewCountDesc();
}
