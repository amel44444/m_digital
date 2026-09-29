package com.example.marketing.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "contents")
@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class Content {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "client_id", nullable = false)
    private Client client;

    @Column(nullable = false, length = 200)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(length = 30)
    private ContentType type;

    @Column(name = "file_url", length = 500)
    private String fileUrl;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private ContentStatus status = ContentStatus.DRAFT;

    @Column(name = "scheduled_date")
    private LocalDateTime scheduledDate;

    @Column(name = "published_date")
    private LocalDateTime publishedDate;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();
}
