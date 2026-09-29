package com.example.marketing.repository;

import com.example.marketing.entity.History;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface HistoryRepository extends JpaRepository<History, Long> {
    List<History> findByUserId(Long userId);
    List<History> findByEntityTypeAndEntityId(String entityType, Long entityId);
    List<History> findAllByOrderByCreatedAtDesc();
}
