package com.traveller.laos.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DashboardDto {

    private long totalDestinations;
    private long totalFestivals;
    private long totalArticles;
    private long totalUsers;
    private long totalReviews;

    private List<DestinationListDto> topDestinations;
    private List<ReviewAdminDto> latestReviews;
}
