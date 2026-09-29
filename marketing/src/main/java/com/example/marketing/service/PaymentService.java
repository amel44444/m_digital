package com.example.marketing.service;

import com.example.marketing.dto.PaymentDTO;
import com.example.marketing.entity.*;
import com.example.marketing.repository.ClientRepository;
import com.example.marketing.repository.PaymentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PaymentService {

    private final PaymentRepository repo;
    private final ClientRepository clientRepository;
    private final HistoryService historyService;

    public List<Payment> findByClient(Long clientId) { return repo.findByClientId(clientId); }

    public Payment create(PaymentDTO dto) {
        Client client = clientRepository.findById(dto.getClientId())
                .orElseThrow(() -> new RuntimeException("Client introuvable"));

        Payment p = Payment.builder()
                .client(client)
                .amount(dto.getAmount())
                .month(dto.getMonth())
                .year(dto.getYear())
                .status(PaymentStatus.PENDING)
                .build();

        Payment saved = repo.save(p);
        historyService.log("CREATE", "Payment", saved.getId(), "Paiement créé");
        return saved;
    }

    public Payment markPaid(Long id) {
        Payment p = repo.findById(id).orElseThrow(() -> new RuntimeException("Paiement introuvable"));
        p.setStatus(PaymentStatus.PAID);
        p.setPaymentDate(LocalDateTime.now());
        historyService.log("PAID", "Payment", id, "Paiement validé");
        return repo.save(p);
    }
}
