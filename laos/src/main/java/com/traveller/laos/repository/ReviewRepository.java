package com.traveller.laos.repository;

import com.traveller.laos.entity.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {

    List<Review> findByTargetTypeAndTargetIdOrderByCreatedAtDesc(String targetType, Long targetId);

    Optional<Review> findByTargetTypeAndTargetIdAndUserId(String targetType, Long targetId, Long userId);

    @Query("SELECT AVG(r.rating) FROM Review r WHERE r.targetType = :targetType AND r.targetId = :targetId AND r.rating IS NOT NULL")
    Double avgRating(String targetType, Long targetId);

    long countByTargetTypeAndTargetId(String targetType, Long targetId);

    // Task 8.2: Added methods for admin review management and dashboard
    Page<Review> findByTargetType(String targetType, Pageable pageable);

    Page<Review> findAll(Pageable pageable);

    List<Review> findTop5ByOrderByCreatedAtDesc();
}
