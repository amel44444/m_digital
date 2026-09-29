package com.example.marketing.controller;

import com.example.marketing.entity.History;
import com.example.marketing.service.HistoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/history")
@RequiredArgsConstructor
public class HistoryController {

    private final HistoryService service;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<History> all() { return service.findAll(); }

    @GetMapping("/user/{userId}")
    public List<History> byUser(@PathVariable Long userId) { return service.findByUser(userId); }

    @GetMapping("/entity")
    public List<History> byEntity(@RequestParam String type, @RequestParam Long id) {
        return service.findByEntity(type, id);
    }
}
