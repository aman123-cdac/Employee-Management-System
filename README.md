# Employee Management System

![Java](https://img.shields.io/badge/Java-17-orange)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.0+-green)
![React](https://img.shields.io/badge/React-18-blue)
![Vite](https://img.shields.io/badge/Vite-4.0+-purple)
![MySQL](https://img.shields.io/badge/MySQL-8.0-lightgrey)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0+-teal)

A comprehensive, full-stack **Employee Management System** designed to streamline HR operations. This application provides a robust backend API built with Spring Boot and a modern, responsible frontend interface developed with React and Tailwind CSS.

## 🚀 Key Features

*   **🔐 Secure Authentication**: JWT-based login and signup system with role-based access control.
*   **👥 Employee Management**: Full CRUD (Create, Read, Update, Delete) capabilities for employee records.
*   **🔑 Password Recovery**: Secure email-based password reset flow with token validation.
*   **🎨 Modern UI/UX**: clean, responsive interface featuring glassmorphism design, smooth animations, and interactive elements.
*   **📱 Responsive Design**: Fully optimized for desktop, tablet, and mobile devices.
*   **🔍 Search & Filter**: Efficiently search and filter employee records.

## 🛠️ Technology Stack

### Backend
*   **Java 17**: Core programming language.
*   **Spring Boot**: Main framework for REST API development.
*   **Spring Security**: Handling authentication and authorization (JWT).
*   **Spring Data JPA / Hibernate**: ORM for database interactions.
*   **MySQL**: Relational database management system.
*   **JavaMailSender**: For sending emails (e.g., password reset).

### Frontend
*   **React.js**: JavaScript library for building user interfaces.
*   **Vite**: Next-generation frontend tooling.
*   **Tailwind CSS**: Utility-first CSS framework for styling.
*   **React Router**: For client-side routing.
*   **Axios**: For making HTTP requests to the backend.
*   **React Toastify**: For beautiful toast notifications.
*   **Lucide React**: Modern icon set.

## 📸 Screenshots

*(Add screenshots of your application here, e.g., Dashboard, Employee List, Login Page)*

## ⚙️ Getting Started

Follow these instructions to set up the project locally.

### Prerequisites
Ensure you have the following installed:
*   **Java Development Kit (JDK) 17** or higher
*   **Node.js** and **npm** (Node Package Manager)
*   **MySQL Server**
*   **Maven**

### 📥 Installation

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/aman123-cdac/Employee-Management-System.git
    cd Employee-Management-System
    ```

2.  **🗄️ Database Setup**
    *   Open your MySQL Workbench or CLI.
    *   Create a database named `employee_db` (or update `application.properties` to match your DB name).
    ```sql
    CREATE DATABASE employee_db;
    ```

3.  **🔙 Backend Setup**
    *   Navigate to the backend directory:
        ```bash
        cd BackEnd/Employee-Management-System
        ```
    *   Configure the database connection in `src/main/resources/application.properties`:
        ```properties
        spring.datasource.url=jdbc:mysql://localhost:3306/employee_db
        spring.datasource.username=your_username
        spring.datasource.password=your_password
        
        # Email Configuration (for password reset)
        spring.mail.username=your_email@gmail.com
        spring.mail.password=your_app_password
        ```
    *   Run the application:
        ```bash
        mvn spring-boot:run
        ```
    *   The backend server will start at `http://localhost:8080`.

4.  **🎨 Frontend Setup**
    *   Navigate to the frontend directory:
        ```bash
        cd FrontEnd
        ```
    *   Install dependencies:
        ```bash
        npm install
        ```
    *   Start the development server:
        ```bash
        npm run dev
        ```
    *   The application will be accessible at `http://localhost:5173`.

## 🔌 API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **POST** | `/api/auth/register` | Register a new user/admin |
| **POST** | `/api/auth/login` | Authenticate user & get token |
| **POST** | `/api/auth/forgot-password` | Request password reset link |
| **POST** | `/api/auth/reset-password` | Reset password with token |
| **GET** | `/api/employees` | Get all employees |
| **POST** | `/api/employees` | Add a new employee |
| **GET** | `/api/employees/{id}` | Get employee details |
| **PUT** | `/api/employees/{id}` | Update employee info |
| **DELETE** | `/api/employees/{id}` | Delete an employee |

## 🤝 Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.

## 📄 License

This project Is Open Source so Everyone can use it.
