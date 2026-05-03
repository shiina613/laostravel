package com.traveller.laos.dto;

import lombok.Data;

@Data
public class ReviewRequest {
    private Integer rating;   // 1-5, nullable
    private String comment;   // nullable
}
