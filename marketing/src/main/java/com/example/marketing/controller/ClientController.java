package com.example.marketing.controller;

import com.example.marketing.dto.ClientDTO;
import com.example.marketing.entity.Client;
import com.example.marketing.service.ClientService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/clients")
@RequiredArgsConstructor
public class ClientController {

    private final ClientService service;

    @GetMapping
    public List<Client> all() { return service.findAll(); }

    @GetMapping("/{id}")
    public Client one(@PathVariable Long id) { return service.findById(id); }

    @PostMapping
    public Client create(@RequestBody ClientDTO dto) { return service.create(dto); }

    @PutMapping("/{id}")
    public Client update(@PathVariable Long id, @RequestBody ClientDTO dto) {
        return service.update(id, dto);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) { service.delete(id); }
}
