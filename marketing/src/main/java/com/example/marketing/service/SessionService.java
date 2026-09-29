package com.example.marketing.service;

import com.example.marketing.dto.SessionDTO;
import com.example.marketing.entity.*;
import com.example.marketing.repository.ClientRepository;
import com.example.marketing.repository.SessionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SessionService {

    private final SessionRepository repo;
    private final ClientRepository clientRepository;
    private final HistoryService historyService;

    public List<SessionSeance> findAll() { return repo.findAll(); }

    public List<SessionSeance> findByClient(Long clientId) { return repo.findByClientId(clientId); }

    public SessionSeance create(SessionDTO dto) {
        Client client = clientRepository.findById(dto.getClientId())
                .orElseThrow(() -> new RuntimeException("Client introuvable"));

        SessionSeance s = SessionSeance.builder()
                .client(client)
                .sessionDate(dto.getSessionDate())
                .month(dto.getMonth())
                .year(dto.getYear())
                .status(SessionStatus.PLANNED)
                .notes(dto.getNotes())
                .build();

        SessionSeance saved = repo.save(s);
        historyService.log("CREATE", "Session", saved.getId(), "Séance planifiée");
        return saved;
    }

    public SessionSeance markDone(Long id) {
        SessionSeance s = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Séance introuvable"));
        s.setStatus(SessionStatus.DONE);
        historyService.log("DONE", "Session", id, "Séance réalisée");
        return repo.save(s);
    }

    // Vérifie qu'un client a bien ses 4 séances dans le mois
    public long countDone(Long clientId, int month, int year) {
        return repo.countByClientIdAndMonthAndYearAndStatus(clientId, month, year, SessionStatus.DONE);
    }

    public void delete(Long id) {
        repo.deleteById(id);
        historyService.log("DELETE", "Session", id, "Suppression séance");
    }
}
