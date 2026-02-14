package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String username;

    @Column(unique = true)
    private String email;

    private String password;
    @Column(nullable = false)
    private String role; // ADMIN or USER

    private String resetToken;
    private java.time.LocalDateTime resetTokenExpiry;

}
