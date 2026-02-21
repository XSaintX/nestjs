# 📋 Task Management Application
> This project was built while following the Udemy Course: NestJS Zero to Hero - Modern TypeScript Back-end Development <br />
> A RESTful task management API built with NestJS, featuring JWT authentication, role-based access, and full CRUD operations.

---

## 📖 Overview

Task Management API is a backend application that allows authenticated users to create, organize, and track tasks. It was built to practice building production-ready APIs with NestJS, focusing on clean architecture, security, and maintainability.

---

## ✨ Features

- **JWT Authentication** — Secure signup/signin with token-based sessions
- **Task CRUD** — Create, read, update, and delete personal tasks
- **Task Status Tracking** — Move tasks through `OPEN → IN_PROGRESS → DONE`
- **User Isolation** — Users can only access their own tasks
- **Input Validation** — DTO-level validation with class-validator
- **Environment Config** — Schema-validated config for dev and prod environments
- **Response Transformation** — Consistent API response shape via interceptor

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | NestJS |
| Language | TypeScript |
| Database | PostgreSQL (TypeORM) |
| Auth | JWT + Passport.js |
| Validation | class-validator / class-transformer |
| Config | @nestjs/config with Joi schema |

---

## 🚀 Setup

### Prerequisites

- Node.js >= 18
- PostgreSQL running locally or via Docker

### Installation

```bash
# Clone the repository
git clone https://github.com/XSaintX/starting_with_nestjs.git
cd task-management

# Install dependencies
npm install

### Running the App

```bash
# Development
npm run start:dev

# Production
npm run build
npm run start:prod
```

The API will be available at `http://localhost:3000`.

---

## 📡 API Docs

### Auth

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | `/auth/signup` | Register a new user | No |
| POST | `/auth/signin` | Login and receive JWT | No |

### Tasks

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| GET | `/tasks` | Get all tasks for current user | ✅ |
| GET | `/tasks/:id` | Get a single task | ✅ |
| POST | `/tasks` | Create a new task | ✅ |
| PATCH | `/tasks/:id/status` | Update task status | ✅ |
| DELETE | `/tasks/:id` | Delete a task | ✅ |

#### Example — Create Task

```http
POST /tasks
Authorization: Bearer 
Content-Type: application/json

{
  "title": "Build the README",
  "description": "Write clean, structured documentation"
}
```

#### Example — Update Task Status

```http
PATCH /tasks/:id/status
Authorization: Bearer 
Content-Type: application/json

{
  "status": "IN_PROGRESS"
}
```

---

## 🧠 What I Learned

- **NestJS module architecture** — How to structure scalable apps with modules, controllers, services, and repositories
- **JWT & Passport integration** — Implementing auth guards and custom decorators (`@GetUser`) to access request context cleanly
- **TypeORM with PostgreSQL** — Defining entities, repositories, and performing filtered queries
- **Config validation** — Using Joi schemas to validate environment variables at startup and prevent misconfigured deployments
- **DTOs & Pipes** — Enforcing input shape at the boundary layer with `ValidationPipe`
- **Interceptors** — Transforming response data globally via `TransformInterceptor`
