package com.example.marketing.dto;

import lombok.Data;

@Data
public class PlanDTO {
    private Long id;
    private Long clientId;
    private Integer month;
    private Integer year;
    private String objectives;
    private String themes;
    private String targetAudience;
}
