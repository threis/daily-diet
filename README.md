# 🥗 Daily Diet API

Daily Diet is a RESTful API built with Node.js, Fastify, and Prisma ORM
to manage users and their daily meals. It includes authentication with
JWT, data validation, and a SQLite database by default.

------------------------------------------------------------------------

## 🚀 Technologies Used

### Core Stack

-   Node.js -- JavaScript runtime
-   TypeScript -- Strongly typed JavaScript
-   Fastify -- High-performance web framework
-   Prisma ORM -- Database ORM and migrations
-   SQLite -- Default database
-   JWT (@fastify/jwt) -- Authentication via JSON Web Tokens
-   @fastify/cookie -- Cookie handling
-   Zod -- Schema validation
-   bcryptjs -- Password hashing
-   dotenv -- Environment variable management

### Development & Testing

-   Vitest -- Testing framework
-   tsx -- Run TypeScript files without manual compilation
-   tsup -- Bundler for production builds

------------------------------------------------------------------------

## 📦 Installation

### 1. Clone the repository

``` bash
git clone https://github.com/threis/daily-diet.git
cd daily-diet
```

### 2. Install dependencies

``` bash
npm install
```

------------------------------------------------------------------------

## ⚙️ Environment Variables

Create a `.env` file in the root directory based on `.env.example`.

Example:

``` env
NODE_ENV=dev

# Auth
JWT_SECRET=your-super-secret-key

# Database
DATABASE_URL="file:./dev.db"
```

### Environment Variables Explanation

  Variable       Description
  -------------- -----------------------------------------------------
  NODE_ENV       Application environment (`dev`, `production`, etc.)
  JWT_SECRET     Secret key used to sign JWT tokens
  DATABASE_URL   Database connection string (SQLite by default)

------------------------------------------------------------------------

## 🗄️ Database Setup

The project uses Prisma ORM with SQLite by default.

### Generate Prisma Client

``` bash
npx prisma generate
```

### Run Migrations

``` bash
npx prisma migrate dev
```

This will: - Create the SQLite database file - Apply migrations -
Generate Prisma Client

### Open Prisma Studio (Optional)

``` bash
npx prisma studio
```

------------------------------------------------------------------------

## ▶️ Running the Application

### Development Mode

``` bash
npm run dev
```

The server will start on:

http://localhost:3333

### Production Build

``` bash
npm run build
npm start
```

------------------------------------------------------------------------

## 🧪 Running Tests

``` bash
npm test
```

------------------------------------------------------------------------

## 📁 Project Structure (Example)

    .
    ├── prisma/
    │   ├── migrations/
    │   └── schema.prisma
    ├── src/
    │   ├── routes/
    │   ├── controllers/
    │   ├── middlewares/
    │   └── app.ts
    ├── .env.example
    ├── package.json
    └── tsconfig.json

------------------------------------------------------------------------

## 🔐 Authentication

Authentication is handled using JWT.

-   Tokens are signed using JWT_SECRET
-   Passwords are hashed using bcryptjs
-   Cookies are managed with @fastify/cookie

Make sure JWT_SECRET is properly set in production environments.

------------------------------------------------------------------------

## 🌍 Deployment

To deploy the project:

1.  Set environment variables in your hosting provider.
2.  Configure DATABASE_URL for production (e.g., PostgreSQL instead of
    SQLite).
3.  Run:

``` bash
npx prisma migrate deploy
npm run build
npm start
```

------------------------------------------------------------------------

## 📄 License

This project is licensed under the MIT License.
