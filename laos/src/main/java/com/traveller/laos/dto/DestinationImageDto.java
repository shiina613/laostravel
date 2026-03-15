package com.traveller.laos.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DestinationImageDto {
    private Long id;
    private String imageUrl;
    private String caption;
    private Integer sortOrder;
}
