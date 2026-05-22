package org.example.proiectps.controller;

import lombok.RequiredArgsConstructor;
import org.example.proiectps.entity.User;
import org.example.proiectps.service.UserScoreService;
import org.example.proiectps.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    @Autowired
    private UserService userService;

    private final UserScoreService userScoreService;

    @PostMapping
    public User createUser(@RequestBody User user) {
        return userService.createUser(user);
    }

    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public Optional<User> getUserById(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    @PutMapping("/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody User user) {
        return userService.updateUser(id, user);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
    }

    @PutMapping("/{id}/ban")
    public User banUser(@PathVariable Long id) {
        return userService.banUser(id);
    }

    @PutMapping("/{id}/unban")
    public User unbanUser(@PathVariable Long id) {
        return userService.unbanUser(id);
    }

    @PutMapping("/{id}/role")
    public User changeRole(@PathVariable Long id, @RequestBody Map<String, String> body) {
        return userService.changeRole(id, body.get("role"));
    }

    @GetMapping("/{id}/score")
    public double getUserScore(@PathVariable Long id) {
        return userScoreService.getUserScore(id);
    }
}