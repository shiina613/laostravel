package com.traveller.laos.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DestinationListDto {
    private Long id;
    private String name;
    private String slug;
    private String province;
    private String region;
    private String thumbnail;
    private String categoryName;
    private String status;
    private Integer viewCount;
}
