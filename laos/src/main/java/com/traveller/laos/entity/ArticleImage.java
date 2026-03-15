package com.traveller.laos.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "article_images")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ArticleImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "article_id", nullable = false)
    private Article article;

    @Column(length = 255, nullable = false)
    private String imageUrl;

    @Column(length = 255)
    private String caption;

    @Column(columnDefinition = "INT DEFAULT 0")
    private Integer sortOrder;

    @PrePersist
    protected void onCreate() {
        if (sortOrder == null) {
            sortOrder = 0;
        }
    }
}
