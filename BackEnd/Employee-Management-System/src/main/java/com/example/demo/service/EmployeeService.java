package com.example.demo.service;

import com.example.demo.entity.Employee;
import com.example.demo.repository.EmployeeRepository;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
public class EmployeeService {

    private final EmployeeRepository repository;
    private final com.example.demo.repository.UserRepository userRepository;
    // We need to inject PasswordEncoder if we want to hash passwords,
    // but current system seems to use plain text or we need to check SecurityConfig

    public EmployeeService(EmployeeRepository repository, com.example.demo.repository.UserRepository userRepository) {
        this.repository = repository;
        this.userRepository = userRepository;
    }

    public org.springframework.data.domain.Page<Employee> getAll(String search,
            org.springframework.data.domain.Pageable pageable) {
        if (search != null && !search.trim().isEmpty()) {
            return repository.searchEmployees(search.trim(), pageable);
        }
        return repository.findAll(pageable);
    }

    public Employee add(Employee emp) {
        Employee savedEmp = repository.save(emp);

        // Auto-create User account if username is provided
        if (emp.getUsername() != null && !emp.getUsername().isEmpty()) {
            // Check if username OR email already exists to prevent crash
            boolean userExists = userRepository.findByUsername(emp.getUsername()).isPresent();
            boolean emailExists = userRepository.findByEmail(emp.getEmail()).isPresent();

            if (!userExists && !emailExists) {
                com.example.demo.entity.User newUser = new com.example.demo.entity.User();
                newUser.setUsername(emp.getUsername());
                newUser.setEmail(emp.getEmail()); // SYNC EMAIL
                newUser.setPassword("welcome123"); // Default password
                newUser.setRole("USER");
                userRepository.save(newUser);
            } else {
                System.out.println("Skipping User creation: Username or Email already exists for " + emp.getName());
            }
        }

        return savedEmp;
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }

    // ✅ GET BY ID
    public Employee getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found"));
    }

    // ✅ UPDATE
    public Employee updateEmployee(Long id, Employee emp) {
        Employee existing = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        existing.setName(emp.getName());
        existing.setEmail(emp.getEmail());
        existing.setDepartment(emp.getDepartment());

        return repository.save(existing);
    }

    public List<Employee> searchByIdNameOrDepartment(String keyword) {

        // 1️⃣ If keyword is numeric → search by ID
        if (keyword.matches("\\d+")) {
            Long id = Long.parseLong(keyword);
            return repository.findById(id)
                    .map(List::of)
                    .orElse(Collections.emptyList());
        }

        // 2️⃣ Search by name
        List<Employee> byName = repository.findByNameContainingIgnoreCase(keyword);
        if (!byName.isEmpty()) {
            return byName;
        }

        // 3️⃣ If not found by name → search by department
        return repository.findByDepartmentContainingIgnoreCase(keyword);
    }

    public Employee getByUsername(String username) {
        return repository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Employee not found"));
    }

}
