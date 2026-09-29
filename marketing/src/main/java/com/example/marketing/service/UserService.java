package com.example.marketing.service;

import com.example.marketing.dto.UserDTO;
import com.example.marketing.entity.User;
import com.example.marketing.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository repo;
    private final HistoryService historyService;

    public List<User> findAll() { return repo.findAll(); }

    public User findById(Long id) {
        return repo.findById(id).orElseThrow(() -> new RuntimeException("Utilisateur introuvable"));
    }

    public User update(Long id, UserDTO dto) {
        User u = findById(id);
        u.setFullName(dto.getFullName());
        u.setRole(dto.getRole());
        u.setEnabled(dto.getEnabled());
        historyService.log("UPDATE", "User", id, "Mise à jour utilisateur");
        return repo.save(u);
    }

    public void delete(Long id) {
        repo.deleteById(id);
        historyService.log("DELETE", "User", id, "Suppression utilisateur");
    }
}
