package com.example.marketing.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class StatisticDTO {
    private Long id;
    private Long contentId;
    private Integer likes;
    private Integer comments;
    private Integer shares;
    private Integer views;
    private LocalDateTime recordedAt;
}
