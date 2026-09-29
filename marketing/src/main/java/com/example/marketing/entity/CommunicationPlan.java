package com.example.marketing.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "communication_plans")
@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class CommunicationPlan {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "client_id", nullable = false)
    private Client client;

    @Column(nullable = false)
    private Integer month;

    @Column(nullable = false)
    private Integer year;

    @Column(columnDefinition = "TEXT")
    private String objectives;

    @Column(columnDefinition = "TEXT")
    private String themes;

    @Column(name = "target_audience", columnDefinition = "TEXT")
    private String targetAudience;
}
