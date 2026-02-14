package com.example.demo.controller;

import com.example.demo.entity.Employee;
import com.example.demo.service.EmployeeService;

import java.util.List;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/employees")
@CrossOrigin(origins = "http://localhost:5173")
public class EmployeeController {

    private final EmployeeService service;

    public EmployeeController(EmployeeService service) {
        this.service = service;
    }

    @GetMapping
    public org.springframework.data.domain.Page<Employee> getAll(
            @RequestParam(required = false) String search,
            org.springframework.data.domain.Pageable pageable) {
        return service.getAll(search, pageable);
    }

    @PostMapping
    public Employee add(@RequestBody Employee emp) {
        return service.add(emp);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

    // ✅ GET EMPLOYEE BY ID (EDIT)
    @GetMapping("/{id}")
    public Employee getById(@PathVariable Long id) {
        return service.getById(id);
    }

    // ✅ UPDATE EMPLOYEE
    @PutMapping("/{id}")
    public Employee updateEmployee(
            @PathVariable Long id,
            @RequestBody Employee emp) {
        return service.updateEmployee(id, emp);
    }

    // @GetMapping("/search")
    // public List<Employee> searchEmployee(@RequestParam String keyword) {
    // return service.searchByName(keyword);
    // }

    @GetMapping("/search")
    public List<Employee> searchEmployee(@RequestParam String keyword) {
        return service.searchByIdNameOrDepartment(keyword);
    }

    @GetMapping("/details/{id}")
    public Employee getFullEmployee(@PathVariable Long id) {
        return service.getById(id);
    }

}
