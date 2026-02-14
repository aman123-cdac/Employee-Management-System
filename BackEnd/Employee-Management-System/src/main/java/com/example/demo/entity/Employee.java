package com.example.demo.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import lombok.Data;

@Entity
@Data
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
    private String department;

    // 🔹 Personal Details
    private String phone;
    private String address;
    private String maritalStatus;
    private String education;

    // 🔹 Company Details
    private String companyRole;
    private Double salary;

    // 🔹 Photo
    @Lob
    @Column(columnDefinition = "LONGTEXT")
    private String photo;
    // store image name or Base64 string

    private String username;

    private java.time.LocalDate joinedDate;
    private java.time.LocalDateTime createdAt;

    @jakarta.persistence.PrePersist
    protected void onCreate() {
        createdAt = java.time.LocalDateTime.now();
        if (joinedDate == null) {
            joinedDate = java.time.LocalDate.now();
        }
    }
}
