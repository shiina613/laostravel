package com.traveller.laos.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PublicArticleDto {
    private Long id;
    private String title;
    private String slug;
    private String summary;
    private String thumbnail;
    private LocalDateTime createdAt;
}
