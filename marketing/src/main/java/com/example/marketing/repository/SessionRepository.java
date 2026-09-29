package com.example.marketing.repository;

import com.example.marketing.entity.SessionSeance;
import com.example.marketing.entity.SessionStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface SessionRepository extends JpaRepository<SessionSeance, Long> {
    List<SessionSeance> findByClientId(Long clientId);
    List<SessionSeance> findByClientIdAndMonthAndYear(Long clientId, Integer month, Integer year);
    long countByClientIdAndMonthAndYearAndStatus(Long clientId, Integer month, Integer year, SessionStatus status);
}
