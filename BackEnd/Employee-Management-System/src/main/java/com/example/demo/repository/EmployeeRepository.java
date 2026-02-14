package com.example.demo.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    List<Employee> findByNameContainingIgnoreCase(String name);

    // Optional: search by department
    List<Employee> findByDepartmentContainingIgnoreCase(String department);

    Optional<Employee> findByUsername(String username);

    List<Employee> findByEmail(String email);

    @org.springframework.data.jpa.repository.Query("SELECT e FROM Employee e WHERE " +
            "LOWER(e.name) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(e.department) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(e.companyRole) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "CAST(e.id AS string) LIKE CONCAT('%', :keyword, '%')")
    org.springframework.data.domain.Page<Employee> searchEmployees(
            @org.springframework.data.repository.query.Param("keyword") String keyword,
            org.springframework.data.domain.Pageable pageable);
}
