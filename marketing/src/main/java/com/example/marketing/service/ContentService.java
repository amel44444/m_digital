package com.example.marketing.service;

import com.example.marketing.dto.ContentDTO;
import com.example.marketing.entity.*;
import com.example.marketing.repository.ClientRepository;
import com.example.marketing.repository.ContentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ContentService {

    private final ContentRepository repo;
    private final ClientRepository clientRepository;
    private final HistoryService historyService;

    public List<Content> findAll() { return repo.findAll(); }

    public List<Content> findByClient(Long clientId) { return repo.findByClientId(clientId); }

    public Content findById(Long id) {
        return repo.findById(id).orElseThrow(() -> new RuntimeException("Contenu introuvable"));
    }

    public Content create(ContentDTO dto) {
        Client client = clientRepository.findById(dto.getClientId())
                .orElseThrow(() -> new RuntimeException("Client introuvable"));

        Content c = Content.builder()
                .client(client)
                .title(dto.getTitle())
                .description(dto.getDescription())
                .type(dto.getType())
                .fileUrl(dto.getFileUrl())
                .status(ContentStatus.DRAFT)
                .scheduledDate(dto.getScheduledDate())
                .build();

        Content saved = repo.save(c);
        historyService.log("CREATE", "Content", saved.getId(), "Nouveau contenu : " + dto.getTitle());
        return saved;
    }

    public Content update(Long id, ContentDTO dto) {
        Content c = findById(id);
        c.setTitle(dto.getTitle());
        c.setDescription(dto.getDescription());
        c.setType(dto.getType());
        c.setFileUrl(dto.getFileUrl());
        c.setScheduledDate(dto.getScheduledDate());
        historyService.log("UPDATE", "Content", id, "Mise à jour contenu");
        return repo.save(c);
    }

    // 🔐 Sécuriser un contenu avant publication (étape clé du plan)
    public Content secure(Long id) {
        Content c = findById(id);
        c.setStatus(ContentStatus.SECURED);
        historyService.log("SECURE", "Content", id, "Contenu sécurisé");
        return repo.save(c);
    }

    public Content publish(Long id) {
        Content c = findById(id);
        if (c.getStatus() != ContentStatus.SECURED && c.getStatus() != ContentStatus.REVIEW) {
            throw new RuntimeException("Le contenu doit être sécurisé avant publication");
        }
        c.setStatus(ContentStatus.PUBLISHED);
        c.setPublishedDate(LocalDateTime.now());
        historyService.log("PUBLISH", "Content", id, "Contenu publié");
        return repo.save(c);
    }

    public Content changeStatus(Long id, ContentStatus status) {
        Content c = findById(id);
        c.setStatus(status);
        historyService.log("STATUS_CHANGE", "Content", id, "Nouveau statut : " + status);
        return repo.save(c);
    }

    public void delete(Long id) {
        repo.deleteById(id);
        historyService.log("DELETE", "Content", id, "Suppression contenu");
    }
}
