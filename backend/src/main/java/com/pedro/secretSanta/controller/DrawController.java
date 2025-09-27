package com.pedro.secretSanta.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.pedro.secretSanta.dto.DrawRequestDTO;
import com.pedro.secretSanta.service.DrawService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000") 
public class DrawController {

    private final DrawService drawService;

    @Autowired
    public DrawController(DrawService drawService) {
        this.drawService = drawService;
    }

    @PostMapping("/draw")
    public ResponseEntity<?> drawAndSendEmails(@RequestBody DrawRequestDTO drawRequest) {
        try {
            drawService.performDrawAndSendEmails(drawRequest.getGroupName(), drawRequest.getParticipants());
            return ResponseEntity.ok(Map.of("message", "Emails sent successfully!"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(Map.of("error", "An unexpected error occurred while sending emails."));
        }
    }

    @GetMapping("/test-email")
    public ResponseEntity<?> testEmailEndpoint(@RequestParam String to) {
        try {
            drawService.sendTestEmail(to);
            return ResponseEntity.ok(Map.of("message", "Test email sent to " + to));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(Map.of("error", "Failed to send test email.", "details", e.getMessage()));
        }
    }
}