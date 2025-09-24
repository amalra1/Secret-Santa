package com.pedro.secretSanta.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pedro.secretSanta.dto.ParticipantDTO;
import com.resend.Resend;
import com.resend.core.exception.ResendException;
import com.resend.services.emails.model.CreateEmailOptions;
import com.resend.services.emails.model.CreateEmailResponse;

@Service
public class DrawService {

    private final Resend resend;

    @Autowired
    public DrawService(Resend resend) {
        this.resend = resend;
    }

    public void performDrawAndSendEmails(String groupName, List<ParticipantDTO> participants) {
        if (participants == null || participants.size() < 2) {
            throw new IllegalArgumentException("At least two participants are required.");
        }

        List<ParticipantDTO> givers = participants;
        List<ParticipantDTO> receivers = new ArrayList<>(participants);
        
        boolean validShuffle;
        do {
            Collections.shuffle(receivers);
            validShuffle = true;
            for (int i = 0; i < givers.size(); i++) {
                if (givers.get(i).getEmail().equalsIgnoreCase(receivers.get(i).getEmail())) {
                    validShuffle = false;
                    break;
                }
            }
        } while (!validShuffle);

        System.out.println("Draw completed. Starting to send emails...");
        for (int i = 0; i < givers.size(); i++) {
            sendSecretSantaEmail(groupName, givers.get(i), receivers.get(i));
        }
        System.out.println("Finished sending all emails.");
    }

    private void sendSecretSantaEmail(String groupName, ParticipantDTO giver, ParticipantDTO receiver) {
        String emailBodyHtml = String.format(
            "<html><body>" +
            "<h2>Hello, %s!</h2>" +
            "<p>The Secret Santa draw for the '<strong>%s</strong>' group has been completed!</p>" +
            "<p>You have drawn: <strong style='font-size: 1.2em;'>%s</strong></p>" +
            "<p>Happy holidays and happy gifting!</p>" +
            "<br/>" +
            "<p><em>Secret Santa App</em></p>" +
            "</body></html>",
            giver.getName(), groupName, receiver.getName()
        );

        CreateEmailOptions params = CreateEmailOptions.builder()
                .from("Secret Santa App <onboarding@resend.dev>")
                .to(giver.getEmail())
                .subject("Your Secret Santa for group: " + groupName)
                .html(emailBodyHtml)
                .build();

        try {
            // Log antes da chamada de rede
            System.out.println("-> Attempting to send email to: " + giver.getEmail());

            CreateEmailResponse data = resend.emails().send(params);

            // Log depois da chamada de rede (só vai aparecer se a chamada for bem-sucedida)
            System.out.println("<- Success! Email sent to " + giver.getEmail() + ". ID: " + data.getId());
        } catch (ResendException e) {
            // Log se a chamada de rede falhar
            System.err.println("<- FAILED to send email to: " + giver.getEmail());
            e.printStackTrace();
        }
    }

    public void sendTestEmail(String destinationEmail) {
        System.out.println("Executing test email send to: " + destinationEmail);

        CreateEmailOptions params = CreateEmailOptions.builder()
                .from("Test Email <onboarding@resend.dev>")
                .to(destinationEmail)
                .subject("Spring Boot + Resend Test")
                .html("<strong>This is a test email from your Secret Santa application!</strong><p>If you received this, it means the connection to Resend is working correctly.</p>")
                .build();

        try {
            System.out.println("-> Attempting to send TEST email via Resend...");
            CreateEmailResponse data = resend.emails().send(params);
            System.out.println("<- Success! Test email sent with ID: " + data.getId());
        } catch (ResendException e) {
            System.err.println("<- FAILED to send test email.");
            e.printStackTrace();
        }
    }
}