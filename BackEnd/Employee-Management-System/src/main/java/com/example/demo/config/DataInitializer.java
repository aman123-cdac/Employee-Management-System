package com.example.demo.config;

import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Override
    public void run(String... args) throws Exception {
        String adminUsername = "admin";
        String adminEmail = "saurabhav2307586@gmail.com";

        System.out.println("--- DataInitializer: Checking Admin User ---");

        userRepository.findByUsername(adminUsername).ifPresentOrElse(
                user -> {
                    System.out.println("Admin user found. Updating email...");
                    user.setEmail(adminEmail);
                    userRepository.save(user);
                    System.out.println("Admin email updated to: " + adminEmail);
                },
                () -> {
                    System.out.println("Admin user not found. Creating...");
                    User newUser = new User();
                    newUser.setUsername(adminUsername);
                    newUser.setPassword("admin123");
                    newUser.setEmail(adminEmail);
                    newUser.setRole("ADMIN");
                    userRepository.save(newUser);
                    System.out.println("Admin user created with email: " + adminEmail);
                });

        System.out.println("--- DataInitializer: Complete ---");
    }
}
