package com.traveller.laos.repository;

import com.traveller.laos.entity.Destination;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface DestinationRepository extends JpaRepository<Destination, Long> {
    Optional<Destination> findBySlug(String slug);
    boolean existsBySlug(String slug);
    boolean existsBySlugAndIdNot(String slug, Long id);
    List<Destination> findByStatusOrderByCreatedAtDesc(String status);
    List<Destination> findTop5ByOrderByViewCountDesc();

    /**
     * Tìm kiếm địa điểm với filter tùy chọn: keyword (name), categoryId, province, region.
     * Chỉ trả về các địa điểm có status = 'ACTIVE'.
     */
    @Query("""
        SELECT d FROM Destination d
        WHERE d.status = 'ACTIVE'
          AND (:keyword IS NULL OR LOWER(d.name) LIKE LOWER(CONCAT('%', :keyword, '%')))
          AND (:categoryId IS NULL OR d.category.id = :categoryId)
          AND (:province IS NULL OR LOWER(d.province) LIKE LOWER(CONCAT('%', :province, '%')))
          AND (:region IS NULL OR d.region = :region)
        """)
    Page<Destination> findWithFilters(
            @Param("keyword") String keyword,
            @Param("categoryId") Long categoryId,
            @Param("province") String province,
            @Param("region") String region,
            Pageable pageable);

    /**
     * Lấy danh sách province duy nhất từ destinations (ACTIVE) — dùng cho public.
     */
    @Query("SELECT DISTINCT d.province FROM Destination d WHERE d.status = 'ACTIVE' AND d.province IS NOT NULL ORDER BY d.province")
    List<String> findDistinctActiveProvinces();

    /**
     * Lấy danh sách region duy nhất từ destinations (ACTIVE) — dùng cho public.
     */
    @Query("SELECT DISTINCT d.region FROM Destination d WHERE d.status = 'ACTIVE' AND d.region IS NOT NULL ORDER BY d.region")
    List<String> findDistinctActiveRegions();

    /**
     * Lấy danh sách province duy nhất từ tất cả destinations (bao gồm INACTIVE) — dùng cho admin.
     */
    @Query("SELECT DISTINCT d.province FROM Destination d WHERE d.province IS NOT NULL AND d.province <> ''")
    List<String> findDistinctProvinces();

    /**
     * Tìm kiếm địa điểm theo province (không phân biệt hoa thường) — dùng cho admin.
     */
    List<Destination> findByProvinceContainingIgnoreCase(String province);
}

