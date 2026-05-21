package org.example.proiectps.service;

import org.example.proiectps.entity.User;
import org.springframework.stereotype.Service;

@Service
public class NotificationService {

    public void sendBanNotification(User user) {
        System.out.println("============================================");
        System.out.println("[EMAIL NOTIFICATION]");
        System.out.println("To: " + user.getEmail());
        System.out.println("Subject: Your account has been banned");
        System.out.println("Message: Dear " + user.getUsername() + ",");
        System.out.println("Your InstaLite account has been banned by a moderator.");
        System.out.println("If you believe this is a mistake, please contact support.");
        System.out.println("============================================");

        System.out.println("[SMS NOTIFICATION]");
        System.out.println("To: " + user.getUsername() + " (phone not stored)");
        System.out.println("Message: Your InstaLite account has been banned. Check your email for details.");
        System.out.println("============================================");
    }

    public void sendUnbanNotification(User user) {
        System.out.println("============================================");
        System.out.println("[EMAIL NOTIFICATION]");
        System.out.println("To: " + user.getEmail());
        System.out.println("Subject: Your account has been restored");
        System.out.println("Message: Dear " + user.getUsername() + ",");
        System.out.println("Your InstaLite account has been unbanned. You can log in again.");
        System.out.println("============================================");
    }
}