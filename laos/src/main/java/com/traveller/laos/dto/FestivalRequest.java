package com.traveller.laos.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FestivalRequest {

    @NotBlank(message = "Tên lễ hội không được để trống")
    private String name;

    @NotBlank(message = "Slug không được để trống")
    private String slug;

    private String shortDescription;

    private String description;

    @NotBlank(message = "Tỉnh/thành không được để trống")
    private String province;

    private String startDate;  // String vì multipart form

    private String endDate;    // String vì multipart form

    private MultipartFile thumbnail;

    private String status;
}
