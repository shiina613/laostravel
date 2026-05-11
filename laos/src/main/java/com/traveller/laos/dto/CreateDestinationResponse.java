package com.traveller.laos.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateDestinationResponse {
    private Long id;
    private String name;
    private String slug;
    private String shortDescription;
    private String description;
    private String province;
    private String region;
    private String thumbnail;
    private Long categoryId;
    private String status;
    private LocalDateTime createdAt;
    private List<DestinationImageDto> images;
}
