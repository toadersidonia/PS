package org.example.proiectps.service;

import org.example.proiectps.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class NotificationService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendBanNotification(User user) {
        // Send real email
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(user.getEmail());
            message.setSubject("Your InstaLite account has been banned");
            message.setText(
                    "Dear " + user.getUsername() + ",\n\n" +
                            "Your InstaLite account has been banned by a moderator.\n" +
                            "You will no longer be able to log in or perform any actions.\n\n" +
                            "If you believe this is a mistake, please contact support.\n\n" +
                            "InstaLite Team"
            );
            mailSender.send(message);
            System.out.println("[EMAIL SENT] Ban notification sent to " + user.getEmail());
        } catch (Exception e) {
            System.out.println("[EMAIL ERROR] Failed to send ban notification: " + e.getMessage());
        }

        // SMS simulation (Twilio not configured)
        System.out.println("============================================");
        System.out.println("[SMS NOTIFICATION - SIMULATED]");
        System.out.println("To: " + user.getUsername() + " (phone not stored)");
        System.out.println("Message: Your InstaLite account has been banned.");
        System.out.println("============================================");
    }

    public void sendUnbanNotification(User user) {
        // Send real email
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(user.getEmail());
            message.setSubject("Your InstaLite account has been restored");
            message.setText(
                    "Dear " + user.getUsername() + ",\n\n" +
                            "Good news! Your InstaLite account has been unbanned.\n" +
                            "You can now log in and use the application again.\n\n" +
                            "Welcome back!\n\n" +
                            "InstaLite Team"
            );
            mailSender.send(message);
            System.out.println("[EMAIL SENT] Unban notification sent to " + user.getEmail());
        } catch (Exception e) {
            System.out.println("[EMAIL ERROR] Failed to send unban notification: " + e.getMessage());
        }

        System.out.println("============================================");
        System.out.println("[SMS NOTIFICATION - SIMULATED]");
        System.out.println("To: " + user.getUsername() + " (phone not stored)");
        System.out.println("Message: Your InstaLite account has been restored.");
        System.out.println("============================================");
    }
}