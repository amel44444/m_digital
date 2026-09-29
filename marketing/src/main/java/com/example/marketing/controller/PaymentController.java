package com.example.marketing.controller;

import com.example.marketing.dto.PaymentDTO;
import com.example.marketing.entity.Payment;
import com.example.marketing.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService service;

    @GetMapping("/client/{clientId}")
    public List<Payment> byClient(@PathVariable Long clientId) {
        return service.findByClient(clientId);
    }

    @PostMapping
    public Payment create(@RequestBody PaymentDTO dto) { return service.create(dto); }

    @PostMapping("/{id}/pay")
    public Payment markPaid(@PathVariable Long id) { return service.markPaid(id); }
}
