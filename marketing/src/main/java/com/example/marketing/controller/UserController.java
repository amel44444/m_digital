package com.example.marketing.controller;

import com.example.marketing.dto.UserDTO;
import com.example.marketing.entity.User;
import com.example.marketing.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService service;

    @GetMapping
    public List<User> all() { return service.findAll(); }

    @GetMapping("/{id}")
    public User one(@PathVariable Long id) { return service.findById(id); }

    @PutMapping("/{id}")
    public User update(@PathVariable Long id, @RequestBody UserDTO dto) {
        return service.update(id, dto);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) { service.delete(id); }
}
