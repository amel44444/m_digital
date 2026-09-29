package com.example.marketing.repository;

import com.example.marketing.entity.Payment;
import com.example.marketing.entity.PaymentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
    List<Payment> findByClientId(Long clientId);
    Optional<Payment> findByClientIdAndMonthAndYear(Long clientId, Integer month, Integer year);
    List<Payment> findByStatus(PaymentStatus status);
}
