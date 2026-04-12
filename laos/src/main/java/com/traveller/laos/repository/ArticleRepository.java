package com.traveller.laos.repository;

import com.traveller.laos.entity.Article;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ArticleRepository extends JpaRepository<Article, Long> {
    List<Article> findByStatusOrderByCreatedAtDesc(String status);
}
