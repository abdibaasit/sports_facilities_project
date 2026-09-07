# 🏟️ Sports Facilities Booking System

A full-stack web application designed for browsing, searching, and booking sports facilities. The system supports multi-role authentication (**USER** & **ADMIN**), facility availability management, and automated booking tracking.

---

## 🚀 Features

### 👤 User Features
- **User Authentication**: Secure registration, login, and JWT-based authentication.
- **Facility Discovery**: Browse available facilities across multiple categories (Football Pitch, Basketball Court, Tennis Court, Swimming Pool, Gym, etc.).
- **Smart Search & Filter**: Search available facilities by date, day of week, start time, end time, and facility type.
- **Facility Booking**: Book available time slots and receive instant booking confirmation codes.
- **Booking Management**: View personal booking history and cancel upcoming bookings.

### 🛡️ Admin Features
- **Facility Management**: Add new facilities, update facility details, upload facility photos, and remove existing facilities.
- **Booking Oversight**: View all bookings across the platform, search bookings by confirmation code, and manage user reservations.
- **User Management**: View registered users and manage user accounts.

---

## 🛠️ Technology Stack

### Backend
- **Framework**: Java 17, Spring Boot 3
- **Security**: Spring Security, JWT (JSON Web Tokens)
- **Database & ORM**: PostgreSQL, Spring Data JPA / Hibernate
- **Build Tool**: Maven
- **Containerization**: Docker & Docker Compose (PostgreSQL & pgAdmin4)

### Frontend
- **Framework**: React.js
- **Styling**: React Bootstrap, CSS3
- **HTTP Client**: Axios
- **Routing**: React Router DOM

---

## 📁 Project Structure

```text
sportsFacility/
├── backend/
│   └── SportsFacilities-system-booking/
│       ├── src/                      # Spring Boot Java source files & resources
│       ├── .env.example              # Environment variables template for backend
│       ├── docker-compose.yml        # PostgreSQL & pgAdmin services configuration
│       ├── pom.xml                   # Maven dependencies configuration
│       └── mvnw                      # Maven Wrapper script
├── frontend/
│   ├── src/                          # React components, pages & services
│   ├── public/                       # Static assets & public files
│   ├── .env.example                  # Environment variables template for frontend
│   └── package.json                  # Node dependencies and scripts
└── README.md                         # Project documentation
```

---

## ⚙️ Getting Started

### Prerequisites
Make sure you have the following installed on your machine:
- **Java JDK 17** or higher
- **Node.js** (v16 or higher) and `npm`
- **Docker** & **Docker Compose** (optional, for local PostgreSQL setup)
- **Git**

---

### 1️⃣ Environment Configuration

Create `.env` files for both the backend and frontend based on the provided `.env.example` templates.

#### Backend `.env` Setup
Navigate to `backend/SportsFacilities-system-booking/` and create `.env`:
```bash
cp backend/SportsFacilities-system-booking/.env.example backend/SportsFacilities-system-booking/.env
```
Example `.env` content:
```env
# Database Configuration
DB_URL=jdbc:postgresql://localhost:5435/sportsFacilities_db
DB_USERNAME=boss
DB_PASSWORD=root

# Security Secrets
JWT_SECRET=843567893696976453275974432697R634976R738467TR678T34865R6834R8763T478378637664538745673865783678548735687R3

# Default Admin Credentials
ADMIN_EMAIL=admin@gmail.com
ADMIN_PASSWORD=admin123

# Docker pgAdmin Credentials
PGADMIN_EMAIL=admin@admin.com
PGADMIN_PASSWORD=root
```

#### Frontend `.env` Setup
Navigate to `frontend/` and create `.env`:
```bash
cp frontend/.env.example frontend/.env
```
Example `.env` content:
```env
REACT_APP_API_BASE_URL=http://localhost:4040
```

---

### 2️⃣ Database Setup (Docker Compose)

Start the PostgreSQL database and pgAdmin using Docker Compose:

```bash
cd backend/SportsFacilities-system-booking
docker-compose up -d
```
- **PostgreSQL Database**: Running on `localhost:5435`
- **pgAdmin 4**: Accessible at `http://localhost:5050`

---

### 3️⃣ Running the Backend (Spring Boot)

Open a terminal and navigate to the backend folder:

```bash
cd backend/SportsFacilities-system-booking
./mvnw spring-boot:run
```
The backend server will start on `http://localhost:4040`.

---

### 4️⃣ Running the Frontend (React)

Open another terminal and navigate to the frontend folder:

```bash
cd frontend
npm install
npm start
```
The React frontend application will launch at `http://localhost:3000`.

---

## 📡 API Overview

| Endpoint | Method | Access | Description |
|---|---|---|---|
| `/auth/register` | `POST` | Public | Register a new user account |
| `/auth/login` | `POST` | Public | Authenticate user & return JWT token |
| `/facilities/all` | `GET` | Public | Get all facilities |
| `/facilities/available` | `GET` | Public | Search available facilities with filters |
| `/facilities/add` | `POST` | Admin | Create a new facility |
| `/facilities/update/{id}` | `PUT` | Admin | Update facility details |
| `/facilities/delete/{id}` | `DELETE` | Admin | Delete a facility |
| `/bookings/book/{facilityId}/{userId}` | `POST` | User/Admin | Create a new booking reservation |
| `/bookings/all` | `GET` | Admin | View all bookings |
| `/bookings/by-confirmation/{code}` | `GET` | Public | Get booking details by confirmation code |
| `/bookings/cancel/{id}` | `DELETE` | User/Admin | Cancel a booking |

---

## 🔒 Security Best Practices
- **Environment Variables**: Sensitive configuration parameters (database credentials, JWT keys, admin passwords) are managed strictly via `.env` files.
- **Git Protection**: `.env` files and user-uploaded media files are ignored by version control (`.gitignore`).
- **Role-Based Access Control**: Protected API routes require valid JWT authorization headers.

---

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 👤 Author
Developed by **[Abdibaasit](https://github.com/abdibaasit)**.