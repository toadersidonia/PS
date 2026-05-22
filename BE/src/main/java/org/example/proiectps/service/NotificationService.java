package org.example.proiectps.service;

import org.example.proiectps.entity.User;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
public class NotificationService {

    @Value("${notification.service.url:http://localhost:8081}")
    private String notificationServiceUrl;

    private final RestTemplate restTemplate = new RestTemplate();

    public void sendBanNotification(User user) {
        sendNotification(user, "/notify/ban", "ban");
    }

    public void sendUnbanNotification(User user) {
        sendNotification(user, "/notify/unban", "unban");
    }

    private void sendNotification(User user, String endpoint, String type) {
        try {
            String url = notificationServiceUrl + endpoint;

            Map<String, String> request = new HashMap<>();
            request.put("email", user.getEmail());
            request.put("username", user.getUsername());

            ResponseEntity<Map> response = restTemplate.postForEntity(url, request, Map.class);

            if (response.getStatusCode().is2xxSuccessful()) {
                System.out.println("[MICROSERVICE] " + type + " notification sent for " + user.getUsername());
            } else {
                System.out.println("[MICROSERVICE ERROR] Unexpected status: " + response.getStatusCode());
            }
        } catch (Exception e) {
            System.out.println("[MICROSERVICE ERROR] Failed to call notification service: " + e.getMessage());
        }
    }
}