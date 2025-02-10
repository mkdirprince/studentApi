# Student Management Api

A simple Node.js project using Node/Express,TypeScript and Postgres managed with `pnpm` for a [SRE bootcamp exercises](https://one2n.io/sre-bootcamp/sre-bootcamp-exercises)

## Prerequisites

- [Node.js](https://nodejs.org/) (LTS version recommended)
- [Express](https://expressjs.com)
- [pnpm](https://pnpm.io/)
- [Typescript](https://www.typescriptlang.org)
- [Postgres](https://www.postgresql.org)
- [DrizzleORM](https://orm.drizzle.team)
- [Docker](https://www.docker.com)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone git@github.com/mkdirprince/studentApi
cd studentApi
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Add environemnt variable for main and test databases

- Copy `.env.example` to `.env`
- Update database credentials

### 4. Set up postgres database

You can use docker to start a progres docker image and connect your app to it

```bash
docker compose -f docker-compose.dev.yml up -d
```

### 6. Push testing database schema

```bash
pnpm run db:push:test
```

### 7. Test api

Ensure the database is up and running following from step 4.

```bash
pnpm test
```

### 8. Start the Development Server

```bash
pnpm run dev
```

## Production

To run the app in production

```bash
tsc

docker compose up -d
```

Check if the container is running

```bash
docker ps
```

## API Endpoints

| Method     | Endpoint               | Description                                  |
| ---------- | ---------------------- | -------------------------------------------- |
| **GET**    | `/v1/api/students`     | Retrieve a list of all students.             |
| **GET**    | `/v1/api/students/:id` | Retrieve details of a student by ID.         |
| **POST**   | `/v1/api/students`     | Add a new student to the database.           |
| **PUT**    | `/v1/api/students/:id` | Update details of an existing student by ID. |
| **DELETE** | `/v1/api/students/:id` | Remove a student by ID.                      |
