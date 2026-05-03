package com.traveller.laos.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateUserStatusRequest {
    @NotBlank(message = "Status không được để trống")
    private String status; // "ACTIVE" hoặc "INACTIVE"
}
