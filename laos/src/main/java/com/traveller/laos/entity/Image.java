package com.traveller.laos.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "images")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Image {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // DESTINATION | FESTIVAL | ARTICLE
    @Column(length = 20, nullable = false)
    private String targetType;

    @Column(nullable = false)
    private Long targetId;

    @Column(length = 255, nullable = false)
    private String imageUrl;

    @Column(length = 255)
    private String caption;

    @Column(columnDefinition = "INT DEFAULT 0")
    private Integer sortOrder;

    @PrePersist
    protected void onCreate() {
        if (sortOrder == null) sortOrder = 0;
    }
}
