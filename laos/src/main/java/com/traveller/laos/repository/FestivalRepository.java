package com.traveller.laos.repository;

import com.traveller.laos.entity.Festival;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface FestivalRepository extends JpaRepository<Festival, Long> {
    List<Festival> findByStatusOrderByStartDateAsc(String status);
}
