package com.traveller.laos.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReviewSummaryDto {
    private Double avgRating;
    private long totalReviews;
    private List<ReviewDto> reviews;
    private ReviewDto myReview; // review của user hiện tại (null nếu chưa review)
}
