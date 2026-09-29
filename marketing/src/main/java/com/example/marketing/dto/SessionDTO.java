package com.example.marketing.dto;

import com.example.marketing.entity.SessionStatus;
import lombok.Data;
import java.time.LocalDateTime;

@Data
public class SessionDTO {
    private Long id;
    private Long clientId;
    private LocalDateTime sessionDate;
    private Integer month;
    private Integer year;
    private SessionStatus status;
    private String notes;
}
