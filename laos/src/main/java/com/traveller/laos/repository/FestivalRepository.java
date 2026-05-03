package com.traveller.laos.repository;

import com.traveller.laos.entity.Festival;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FestivalRepository extends JpaRepository<Festival, Long> {

    List<Festival> findByStatusOrderByStartDateAsc(String status);

    Optional<Festival> findBySlug(String slug);

    boolean existsBySlug(String slug);

    boolean existsBySlugAndIdNot(String slug, Long id);

    List<Festival> findByProvinceContainingIgnoreCase(String province);

    List<Festival> findAllByOrderByCreatedAtDesc();

    @Query("SELECT f FROM Festival f WHERE (:province IS NULL OR LOWER(f.province) LIKE LOWER(CONCAT('%', :province, '%'))) ORDER BY f.createdAt DESC")
    Page<Festival> findWithFilters(@Param("province") String province, Pageable pageable);

    /**
     * Lấy lễ hội ACTIVE cho public, có filter province.
     */
    @Query("SELECT f FROM Festival f WHERE f.status = 'ACTIVE' AND (:province IS NULL OR LOWER(f.province) LIKE LOWER(CONCAT('%', :province, '%')))")
    Page<Festival> findActiveWithFilters(@Param("province") String province, Pageable pageable);

    /**
     * Lấy danh sách province duy nhất từ festivals (ACTIVE).
     */
    @Query("SELECT DISTINCT f.province FROM Festival f WHERE f.status = 'ACTIVE' AND f.province IS NOT NULL ORDER BY f.province")
    List<String> findDistinctActiveProvinces();

    /**
     * Lấy danh sách province duy nhất từ tất cả festivals (bao gồm INACTIVE).
     */
    @Query("SELECT DISTINCT f.province FROM Festival f WHERE f.province IS NOT NULL AND f.province <> ''")
    List<String> findDistinctProvinces();
}
