package com.example.marketing.controller;

import com.example.marketing.dto.ContentDTO;
import com.example.marketing.entity.*;
import com.example.marketing.service.*;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/contents")
@RequiredArgsConstructor
public class ContentController {

    private final ContentService service;
    private final FileStorageService fileService;

    @GetMapping
    public List<Content> all() { return service.findAll(); }

    @GetMapping("/client/{clientId}")
    public List<Content> byClient(@PathVariable Long clientId) {
        return service.findByClient(clientId);
    }

    @GetMapping("/{id}")
    public Content one(@PathVariable Long id) { return service.findById(id); }

    @PostMapping
    public Content create(@RequestBody ContentDTO dto) { return service.create(dto); }

    @PutMapping("/{id}")
    public Content update(@PathVariable Long id, @RequestBody ContentDTO dto) {
        return service.update(id, dto);
    }

    @PostMapping("/{id}/upload")
    public Content upload(@PathVariable Long id, @RequestParam("file") MultipartFile file) {
        String url = fileService.store(file);
        ContentDTO dto = new ContentDTO();
        dto.setFileUrl(url);
        return service.update(id, dto);
    }

    // 🔐 Sécuriser (avant publication)
    @PostMapping("/{id}/secure")
    public Content secure(@PathVariable Long id) { return service.secure(id); }

    // 🚀 Publier
    @PostMapping("/{id}/publish")
    public Content publish(@PathVariable Long id) { return service.publish(id); }

    @PatchMapping("/{id}/status")
    public Content changeStatus(@PathVariable Long id, @RequestParam String status) {
        return service.changeStatus(id, ContentStatus.valueOf(status));
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) { service.delete(id); }
}
