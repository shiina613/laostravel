package com.traveller.laos.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateDestinationRequest {
    private String name;
    private String slug;
    private String shortDescription;
    private String description;
    private String province;
    private Long categoryId;
    private String status;
    private MultipartFile thumbnail;
    private MultipartFile[] images;
}
