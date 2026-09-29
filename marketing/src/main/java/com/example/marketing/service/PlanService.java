package com.example.marketing.service;

import com.example.marketing.dto.PlanDTO;
import com.example.marketing.entity.*;
import com.example.marketing.repository.ClientRepository;
import com.example.marketing.repository.CommunicationPlanRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PlanService {

    private final CommunicationPlanRepository repo;
    private final ClientRepository clientRepository;
    private final HistoryService historyService;

    public List<CommunicationPlan> findByClient(Long clientId) {
        return repo.findByClientIdOrderByYearAscMonthAsc(clientId);
    }

    public CommunicationPlan create(PlanDTO dto) {
        Client client = clientRepository.findById(dto.getClientId())
                .orElseThrow(() -> new RuntimeException("Client introuvable"));

        CommunicationPlan p = CommunicationPlan.builder()
                .client(client)
                .month(dto.getMonth())
                .year(dto.getYear())
                .objectives(dto.getObjectives())
                .themes(dto.getThemes())
                .targetAudience(dto.getTargetAudience())
                .build();

        CommunicationPlan saved = repo.save(p);
        historyService.log("CREATE", "Plan", saved.getId(), "Plan de communication créé");
        return saved;
    }

    public CommunicationPlan update(Long id, PlanDTO dto) {
        CommunicationPlan p = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Plan introuvable"));
        p.setObjectives(dto.getObjectives());
        p.setThemes(dto.getThemes());
        p.setTargetAudience(dto.getTargetAudience());
        historyService.log("UPDATE", "Plan", id, "Plan mis à jour");
        return repo.save(p);
    }
}

