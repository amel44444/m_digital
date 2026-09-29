package com.example.marketing.service;

import com.example.marketing.dto.ClientDTO;
import com.example.marketing.entity.Client;
import com.example.marketing.entity.User;
import com.example.marketing.repository.ClientRepository;
import com.example.marketing.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ClientService {

    private final ClientRepository repo;
    private final UserRepository userRepository;
    private final HistoryService historyService;

    public List<Client> findAll() { return repo.findAll(); }

    public Client findById(Long id) {
        return repo.findById(id).orElseThrow(() -> new RuntimeException("Client introuvable"));
    }

    public Client create(ClientDTO dto) {
        User user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new RuntimeException("Utilisateur introuvable"));

        Client c = Client.builder()
                .user(user)
                .companyName(dto.getCompanyName())
                .phone(dto.getPhone())
                .contractStart(dto.getContractStart())
                .contractEnd(dto.getContractEnd())
                .monthlyPrice(dto.getMonthlyPrice())
                .build();

        Client saved = repo.save(c);
        historyService.log("CREATE", "Client", saved.getId(), "Nouveau client : " + dto.getCompanyName());
        return saved;
    }

    public Client update(Long id, ClientDTO dto) {
        Client c = findById(id);
        c.setCompanyName(dto.getCompanyName());
        c.setPhone(dto.getPhone());
        c.setContractStart(dto.getContractStart());
        c.setContractEnd(dto.getContractEnd());
        c.setMonthlyPrice(dto.getMonthlyPrice());
        historyService.log("UPDATE", "Client", id, "Mise à jour client");
        return repo.save(c);
    }

    public void delete(Long id) {
        repo.deleteById(id);
        historyService.log("DELETE", "Client", id, "Suppression client");
    }
}
