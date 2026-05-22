package org.example.notificationservice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/notify")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    @PostMapping("/ban")
    public ResponseEntity<?> notifyBan(@RequestBody NotificationRequest request) {
        notificationService.sendBanNotification(request.getEmail(), request.getUsername());
        return ResponseEntity.ok(Map.of("status", "Notification sent"));
    }

    @PostMapping("/unban")
    public ResponseEntity<?> notifyUnban(@RequestBody NotificationRequest request) {
        notificationService.sendUnbanNotification(request.getEmail(), request.getUsername());
        return ResponseEntity.ok(Map.of("status", "Notification sent"));
    }

    @GetMapping("/health")
    public ResponseEntity<?> health() {
        return ResponseEntity.ok(Map.of("status", "UP", "service", "notification-service"));
    }
}