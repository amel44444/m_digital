package com.example.marketing.repository;

import com.example.marketing.entity.Statistic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface StatisticRepository extends JpaRepository<Statistic, Long> {
    List<Statistic> findByContentId(Long contentId);

    @Query("SELECT COALESCE(SUM(s.likes),0), COALESCE(SUM(s.comments),0), " +
            "COALESCE(SUM(s.shares),0), COALESCE(SUM(s.views),0) " +
            "FROM Statistic s WHERE s.content.client.id = :clientId")
    Object[] sumByClientId(@Param("clientId") Long clientId);
}
