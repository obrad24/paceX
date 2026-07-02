# PaceX

Production-ready running leagues platform — compete with runners worldwide, sync Strava activities, and climb leaderboards.

## Tech Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS + shadcn/ui
- Prisma ORM + PostgreSQL
- Auth.js (NextAuth)
- Zod + React Hook Form + TanStack Query

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

Copy `.env.example` to `.env` and update values:

```bash
cp .env.example .env
```

Generate an auth secret:

```bash
openssl rand -base64 32
```

### 3. Set up the database

Start PostgreSQL, then run migrations:

```bash
npm run db:migrate
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Feature Progress

### ✅ Feature 1: Authentication
- Register, login, logout
- Forgot / reset password
- Email verification architecture
- Protected routes (middleware)
- User + Profile database models

### 🔜 Upcoming
- User profile editing + Cloudinary images
- Strava OAuth + activity sync
- Running leagues & rankings
- Social feed, badges, notifications
- Admin panel

## Project Structure

```
app/           # Next.js App Router pages & API routes
actions/       # Server actions
components/    # Shared UI components
features/      # Feature-specific modules
lib/           # Utilities, validations, Prisma client
server/        # Business logic & services
prisma/        # Database schema & migrations
types/         # Shared TypeScript types
emails/        # Email templates
docs/          # Project documentation (for AI & devs)
```

📖 **Full documentation:** [docs/README.md](./docs/README.md)

## Deployment

Designed for [Vercel](https://vercel.com) with PostgreSQL (Neon, Supabase, or Prisma Postgres).
