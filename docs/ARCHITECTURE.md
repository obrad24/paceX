# Architecture

## Slojevi aplikacije

```
┌─────────────────────────────────────────────┐
│  UI Layer                                   │
│  app/ (RSC pages) + features/ + components/ │
└──────────────────┬──────────────────────────┘
                   │
┌──────────────────▼──────────────────────────┐
│  Actions Layer                              │
│  actions/*.actions.ts (Server Actions)      │
└──────────────────┬──────────────────────────┘
                   │
┌──────────────────▼──────────────────────────┐
│  Service Layer                              │
│  server/services/*.service.ts               │
└──────────────────┬──────────────────────────┘
                   │
┌──────────────────▼──────────────────────────┐
│  Data Layer                                 │
│  lib/prisma.ts → PostgreSQL                 │
└─────────────────────────────────────────────┘
```

## Server vs Client Components

### Server Components (default)
- Stranice u `app/`
- Layout-i
- Data fetching direktno iz Prisma
- `auth()` poziv za sesiju

### Client Components (`"use client"`)
- `components/providers.tsx` — TanStack Query + ThemeProvider
- `components/theme-toggle.tsx`
- `features/auth/components/*` — forme sa `useActionState`
- shadcn UI komponente koje koriste interaktivnost

## Autentifikacija — data flow

### Registracija
```
RegisterForm (client)
  → registerAction (server action)
    → Zod validacija
    → bcrypt hash lozinke
    → prisma.user.create + profile
    → createVerificationToken
    → sendVerificationEmail (Resend ili console u dev)
```

### Login
```
LoginForm (client)
  → loginAction (server action)
    → signIn("credentials") iz auth.ts
      → authorize(): prisma + bcrypt
      → JWT callback: role, username, emailVerified
    → redirect /dashboard
```

### Zaštita ruta
```
middleware.ts
  → auth() wrapper
  → protected routes → redirect /login
  → auth routes + logged in → redirect /dashboard
```

## Session model

- **Strategy:** JWT (ne database sessions za aktivnu sesiju)
- **PrismaAdapter:** prisutan za kompatibilnost sa Auth.js modelima
- **Session polja:** `id`, `role`, `username`, `emailVerified`, `name`, `image`

Tipovi prošireni u `types/next-auth.d.ts`.

## Validacija

- Sve auth forme validirane Zod šemama u `lib/validations/auth.ts`
- Server actions koriste `safeParse` i vraćaju `ActionState`:
  ```ts
  { success: boolean; message: string; errors?: Record<string, string[]> }
  ```

## Email sistem

- Apstrakcija: `server/services/email.service.ts`
- Template-i: `emails/auth-emails.ts`
- Dev mode: loguje u konzolu ako nema `RESEND_API_KEY`
- Production: Resend API

## Tokeni

| Tip | Model | TTL | Servis |
|-----|-------|-----|--------|
| Email verification | `VerificationToken` | 24h | `token.service.ts` |
| Password reset | `PasswordResetToken` | 1h | `token.service.ts` |

## State management

- **Server state:** Prisma + Server Components
- **Client cache:** TanStack Query (setup u Providers, još nema upotrebe)
- **Form state:** React `useActionState` + server actions
- **Toast:** sonner

## Styling

- Tailwind CSS v4 sa `@import "tailwindcss"`
- shadcn CSS variables u `app/globals.css`
- Primary boja: orange (`oklch` u `:root` i `.dark`)
- Utility: `cn()` iz `lib/utils.ts`

## API rute

Trenutno samo:
- `GET/POST /api/auth/[...nextauth]` — Auth.js handlers

Budući REST/API rute planirane u `app/api/` sa Zod validacijom.

## Middleware napomena

Next.js 16 prikazuje deprecation warning za `middleware` → preporučuje `proxy`. Trenutno koristimo klasični `middleware.ts` — pratiti Next.js docs pri upgrade-u.

## Performance plan

- Server Components za data fetching
- Image optimization (Next/Image)
- Lazy loading
- Pagination (budući feature-i)
- DB indexes (već na email, username, city)
- Caching strategija — još nije implementirana
