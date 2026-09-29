package com.example.marketing.service;

import com.example.marketing.entity.History;
import com.example.marketing.entity.User;
import com.example.marketing.repository.HistoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class HistoryService {

    private final HistoryRepository repo;

    public void log(String action, String entityType, Long entityId, String details) {
        User current = null;
        var auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.getPrincipal() instanceof User u) {
            current = u;
        }
        repo.save(History.builder()
                .user(current)
                .action(action)
                .entityType(entityType)
                .entityId(entityId)
                .details(details)
                .build());
    }

    public List<History> findAll() {
        return repo.findAllByOrderByCreatedAtDesc();
    }

    public List<History> findByUser(Long userId) {
        return repo.findByUserId(userId);
    }

    public List<History> findByEntity(String type, Long id) {
        return repo.findByEntityTypeAndEntityId(type, id);
    }
}
