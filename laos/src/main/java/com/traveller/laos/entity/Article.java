package com.traveller.laos.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "articles")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Article {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 200, nullable = false)
    private String title;

    @Column(length = 220, nullable = false, unique = true)
    private String slug;

    @Column(length = 255)
    private String summary;

    @Column(columnDefinition = "TEXT")
    private String content;

    @Column(length = 255)
    private String thumbnail;

    @ManyToOne
    @JoinColumn(name = "author_id")
    private User author;

    @Column(nullable = false, updatable = false, columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime createdAt;

    @Column(columnDefinition = "INT DEFAULT 0")
    private Integer viewCount;

    @Column(length = 20, columnDefinition = "VARCHAR(20) DEFAULT 'ACTIVE'")
    private String status;

    @PrePersist
    protected void onCreate() {
        if (createdAt == null) {
            createdAt = LocalDateTime.now();
        }
        if (viewCount == null) {
            viewCount = 0;
        }
        if (status == null) {
            status = "ACTIVE";
        }
    }
}
