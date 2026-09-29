package com.example.marketing.dto;

import com.example.marketing.entity.PaymentStatus;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class PaymentDTO {
    private Long id;
    private Long clientId;
    private BigDecimal amount;
    private Integer month;
    private Integer year;
    private PaymentStatus status;
    private LocalDateTime paymentDate;
}
