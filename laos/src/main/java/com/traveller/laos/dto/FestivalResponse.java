package com.traveller.laos.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FestivalResponse {
    private Long id;
    private String name;
    private String slug;
    private String shortDescription;
    private String description;
    private String province;
    private LocalDate startDate;
    private LocalDate endDate;
    private String thumbnail;
    private String status;
    private LocalDateTime createdAt;
    private Integer viewCount;
}
