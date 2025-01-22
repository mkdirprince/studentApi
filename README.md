# Student Management Api

A simple Node.js project using Node/Express,TypeScript and Postgres managed with `pnpm` for a [SRE bootcamp exercises](https://one2n.io/sre-bootcamp/sre-bootcamp-exercises)

## Prerequisites

- [Node.js](https://nodejs.org/) (LTS version recommended)
- [Express](https://expressjs.com)
- [pnpm](https://pnpm.io/)
- [Typescript](https://www.typescriptlang.org)
- [Postgres](https://www.postgresql.org)
- [DrizzleORM](https://orm.drizzle.team)

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

### 4.. Start the Development Server

```bash
pnpm dev
```

## API Endpoints

- GET /v1/api/students - Get all students
- GET /v1/api/students/:id - Get student by ID
- POST /v1/api/students - Create new student
- PUT /v1/api/students/:id - Update student
- DELETE /v1/api/students/:id - Delete student
