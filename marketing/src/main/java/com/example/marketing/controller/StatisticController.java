package com.example.marketing.controller;

import com.example.marketing.dto.StatisticDTO;
import com.example.marketing.entity.Statistic;
import com.example.marketing.service.StatisticService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/statistics")
@RequiredArgsConstructor
public class StatisticController {

    private final StatisticService service;

    @GetMapping("/content/{contentId}")
    public List<Statistic> byContent(@PathVariable Long contentId) {
        return service.findByContent(contentId);
    }

    @PostMapping
    public Statistic create(@RequestBody StatisticDTO dto) { return service.create(dto); }

    @GetMapping("/client/{clientId}/totals")
    public Object[] totals(@PathVariable Long clientId) {
        return service.getTotalsForClient(clientId);
    }
}
