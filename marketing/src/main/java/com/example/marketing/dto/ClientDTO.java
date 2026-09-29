package com.example.marketing.dto;

import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class ClientDTO {
    private Long id;
    private Long userId;
    private String companyName;
    private String phone;
    private LocalDate contractStart;
    private LocalDate contractEnd;
    private BigDecimal monthlyPrice;
}
