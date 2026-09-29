package com.example.marketing.controller;

import com.example.marketing.dto.SessionDTO;
import com.example.marketing.entity.SessionSeance;
import com.example.marketing.service.SessionService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sessions")
@RequiredArgsConstructor
public class SessionController {

    private final SessionService service;

    @GetMapping
    public List<SessionSeance> all() { return service.findAll(); }

    @GetMapping("/client/{clientId}")
    public List<SessionSeance> byClient(@PathVariable Long clientId) {
        return service.findByClient(clientId);
    }

    @PostMapping
    public SessionSeance create(@RequestBody SessionDTO dto) { return service.create(dto); }

    @PostMapping("/{id}/done")
    public SessionSeance markDone(@PathVariable Long id) { return service.markDone(id); }

    @GetMapping("/client/{clientId}/count")
    public long countDone(@PathVariable Long clientId,
                          @RequestParam int month,
                          @RequestParam int year) {
        return service.countDone(clientId, month, year);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) { service.delete(id); }
}
