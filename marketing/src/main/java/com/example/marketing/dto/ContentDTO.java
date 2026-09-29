package com.example.marketing.dto;

import com.example.marketing.entity.ContentStatus;
import com.example.marketing.entity.ContentType;
import lombok.Data;
import java.time.LocalDateTime;

@Data
public class ContentDTO {
    private Long id;
    private Long clientId;
    private String title;
    private String description;
    private ContentType type;
    private String fileUrl;
    private ContentStatus status;
    private LocalDateTime scheduledDate;
    private LocalDateTime publishedDate;
}
