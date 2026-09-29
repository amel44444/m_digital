package com.example.marketing.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class HistoryDTO {
    private Long id;
    private Long userId;
    private String action;
    private String entityType;
    private Long entityId;
    private String details;
    private LocalDateTime createdAt;
}
