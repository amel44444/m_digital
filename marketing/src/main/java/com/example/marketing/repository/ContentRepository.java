package com.example.marketing.repository;

import com.example.marketing.entity.Content;
import com.example.marketing.entity.ContentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ContentRepository extends JpaRepository<Content, Long> {
    List<Content> findByClientId(Long clientId);
    List<Content> findByClientIdAndStatus(Long clientId, ContentStatus status);
    List<Content> findByStatus(ContentStatus status);
}
