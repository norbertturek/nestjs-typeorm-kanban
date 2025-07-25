# Kanban Board API

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)](https://nestjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TypeORM](https://img.shields.io/badge/TypeORM-262627?style=for-the-badge&logo=typescript&logoColor=white)](https://typeorm.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black)](https://swagger.io/)

A RESTful API for a Kanban board application built with NestJS, TypeORM, and PostgreSQL. This API allows you to manage projects, columns, and tasks with full CRUD operations.

## Features

- **Projects Management**: Create, read, update, and delete projects
- **Columns Management**: Organize work into customizable columns (e.g., To Do, In Progress, Done)
- **Tasks Management**: Create, update, delete, and move tasks between columns
- **RESTful API**: Follows REST principles with proper HTTP methods and status codes
- **Swagger Documentation**: Interactive API documentation available at `/api`
- **TypeScript**: Built with TypeScript for type safety and better developer experience
- **TypeORM**: Object-Relational Mapping for database operations

## Prerequisites

- Node.js (v16 or later)
- npm or yarn
- PostgreSQL (v12 or later)

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/kanban-backend-typeorm.git
cd kanban-backend-typeorm
```

### 2. Install dependencies

```bash
yarn install
```

### 3. Set up environment variables

Create a `.env` file in the root directory and add the following variables:

```env
# Server
PORT=3000

# Database
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=your_db_username
DB_PASSWORD=your_db_password
DB_NAME=kanban_db

# JWT (if implementing authentication later)
JWT_SECRET=your_jwt_secret
```

### 4. Database Setup

1. Make sure PostgreSQL is running
2. Create a new database named `kanban_db` (or your preferred name)
3. Update the `.env` file with your database credentials

### 5. Run database migrations

```bash
yarn run typeorm migration:run
```

### 6. Start the application

```bash
# Development mode
yarn run start:dev

# Production mode
yarn run build
yarn run start:prod
```

The API will be available at `http://localhost:3000`

## API Documentation

Interactive API documentation is available at `http://localhost:3000/api` when the application is running in development mode.

## API Endpoints

### Projects

- `GET /projects` - Get all projects
- `POST /projects` - Create a new project
- `GET /projects/:id` - Get a project by ID
- `PATCH /projects/:id` - Update a project
- `DELETE /projects/:id` - Delete a project

### Columns

- `GET /projects/:projectId/columns` - Get all columns for a project
- `POST /projects/:projectId/columns` - Create a new column in a project
- `GET /projects/:projectId/columns/:id` - Get a column by ID
- `PATCH /projects/:projectId/columns/:id` - Update a column
- `DELETE /projects/:projectId/columns/:id` - Delete a column

### Tasks

- `GET /columns/:columnId/tasks` - Get all tasks in a column
- `POST /columns/:columnId/tasks` - Create a new task in a column
- `GET /columns/:columnId/tasks/:id` - Get a task by ID
- `PATCH /columns/:columnId/tasks/:id` - Update a task
- `DELETE /columns/:columnId/tasks/:id` - Delete a task
- `POST /columns/:columnId/tasks/:id/move?targetColumnId=:targetId&order=:order` - Move a task to another column

## Example Usage

### Create a new project

```bash
curl -X POST http://localhost:3000/projects \
  -H "Content-Type: application/json" \
  -d '{"name": "My Kanban Project", "description": "A new project for task management"}'
```

### Create a new column

```bash
curl -X POST http://localhost:3000/projects/1/columns \
  -H "Content-Type: application/json" \
  -d '{"name": "In Progress", "order": 1}'
```

### Create a new task

```bash
curl -X POST http://localhost:3000/columns/1/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Implement authentication", "description": "Add JWT authentication to the API"}'
```

### Move a task to another column

```bash
curl -X POST "http://localhost:3000/columns/1/tasks/1/move?targetColumnId=2&order=2"
```

## Database Schema

### Project
- `id` (number, primary key)
- `name` (string)
- `description` (string, nullable)
- `createdAt` (timestamp)
- `updatedAt` (timestamp)

### ProjectColumn
- `id` (number, primary key)
- `name` (string)
- `order` (number)
- `projectId` (number, foreign key)
- `createdAt` (timestamp)
- `updatedAt` (timestamp)

### Task
- `id` (number, primary key)
- `title` (string)
- `description` (string, nullable)
- `order` (number)
- `columnId` (number, foreign key)
- `createdAt` (timestamp)
- `updatedAt` (timestamp)

## Development

### Running tests

```bash
# unit tests
yarn test

# e2e tests
yarn test:e2e

# test coverage
yarn test:cov
```

### Linting

```bash
yarn lint
```

### Formatting
With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
