package com.example.marketing.repository;

import com.example.marketing.entity.CommunicationPlan;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CommunicationPlanRepository extends JpaRepository<CommunicationPlan, Long> {
    List<CommunicationPlan> findByClientIdOrderByYearAscMonthAsc(Long clientId);
}
