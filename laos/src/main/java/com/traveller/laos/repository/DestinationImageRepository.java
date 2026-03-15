package com.traveller.laos.repository;

import com.traveller.laos.entity.DestinationImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface DestinationImageRepository extends JpaRepository<DestinationImage, Long> {
    List<DestinationImage> findByDestinationIdOrderBySortOrder(Long destinationId);
}
