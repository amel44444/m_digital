package com.example.marketing.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "statistics")
@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class Statistic {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "content_id", nullable = false)
    private Content content;

    private Integer likes = 0;
    private Integer comments = 0;
    private Integer shares = 0;
    private Integer views = 0;

    @Column(name = "recorded_at")
    private LocalDateTime recordedAt = LocalDateTime.now();
}