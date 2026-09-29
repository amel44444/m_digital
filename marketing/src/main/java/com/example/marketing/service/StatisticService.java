package com.example.marketing.service;

import com.example.marketing.dto.StatisticDTO;
import com.example.marketing.entity.*;
import com.example.marketing.repository.ContentRepository;
import com.example.marketing.repository.StatisticRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StatisticService {

    private final StatisticRepository repo;
    private final ContentRepository contentRepository;
    private final HistoryService historyService;

    public List<Statistic> findByContent(Long contentId) {
        return repo.findByContentId(contentId);
    }

    public Statistic create(StatisticDTO dto) {
        Content c = contentRepository.findById(dto.getContentId())
                .orElseThrow(() -> new RuntimeException("Contenu introuvable"));

        Statistic s = Statistic.builder()
                .content(c)
                .likes(dto.getLikes() != null ? dto.getLikes() : 0)
                .comments(dto.getComments() != null ? dto.getComments() : 0)
                .shares(dto.getShares() != null ? dto.getShares() : 0)
                .views(dto.getViews() != null ? dto.getViews() : 0)
                .build();

        Statistic saved = repo.save(s);
        historyService.log("CREATE", "Statistic", saved.getId(), "Relevé statistiques");
        return saved;
    }

    public Object[] getTotalsForClient(Long clientId) {
        return repo.sumByClientId(clientId);
    }
}
