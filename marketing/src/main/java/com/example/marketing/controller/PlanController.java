package com.example.marketing.controller;

import com.example.marketing.dto.PlanDTO;
import com.example.marketing.entity.CommunicationPlan;
import com.example.marketing.service.PlanService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/plans")
@RequiredArgsConstructor
public class PlanController {

    private final PlanService service;

    @GetMapping("/client/{clientId}")
    public List<CommunicationPlan> byClient(@PathVariable Long clientId) {
        return service.findByClient(clientId);
    }

    @PostMapping
    public CommunicationPlan create(@RequestBody PlanDTO dto) { return service.create(dto); }

    @PutMapping("/{id}")
    public CommunicationPlan update(@PathVariable Long id, @RequestBody PlanDTO dto) {
        return service.update(id, dto);
    }
}
