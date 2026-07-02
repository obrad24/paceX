# Authentication

## Pregled

PaceX koristi **Auth.js v5** (`next-auth@5.0.0-beta.31`) sa **Credentials** providerom.

| Aspekt | Vrednost |
|--------|----------|
| Konfiguracija | `auth.ts` (root) |
| API route | `app/api/auth/[...nextauth]/route.ts` |
| Adapter | `@auth/prisma-adapter` |
| Session strategy | JWT |
| Password hashing | bcryptjs (12 rounds) |
| Sign-in page | `/login` |

## Fajlovi

```
auth.ts                          # NextAuth config, handlers, auth(), signIn, signOut
middleware.ts                    # Route protection
actions/auth.actions.ts          # Server actions
lib/validations/auth.ts          # Zod schemas
server/services/token.service.ts # Verification + reset tokens
server/services/email.service.ts # Email delivery abstraction
emails/auth-emails.ts            # HTML email templates
types/next-auth.d.ts             # Session/JWT type extensions
```

## Server Actions

| Action | Opis | Redirect |
|--------|------|----------|
| `registerAction` | Kreira User + Profile, šalje verification email | Ne |
| `loginAction` | Credentials sign-in | `/dashboard` |
| `forgotPasswordAction` | Šalje reset email (ne otkriva da li email postoji) | Ne |
| `resetPasswordAction` | Menja lozinku po tokenu | Ne |
| `verifyEmailAction` | Verifikuje email (server component) | Ne |
| `logoutAction` | signOut | `/` |

## Zod šeme

### registerSchema
- firstName, lastName (1-50 chars)
- username (3-30, alphanumeric + underscore)
- email
- password (min 8, uppercase, lowercase, number)
- confirmPassword (mora match)
- country, city (optional)

### loginSchema
- email, password

### forgotPasswordSchema
- email

### resetPasswordSchema
- password + confirmPassword (ista pravila kao register)

## JWT / Session polja

Prošireno u `types/next-auth.d.ts`:

```ts
session.user: {
  id: string
  role: Role          // USER | ADMIN
  username: string
  emailVerified: Date | null
  name?: string
  email?: string
  image?: string
}
```

JWT callback osvežava podatke iz baze na svaki request.

## Middleware logika

### Zaštićene rute (zahtevaju login)
- `/dashboard/*`
- `/profile/*`
- `/settings/*`
- `/admin/*`

### Auth rute (redirect na dashboard ako si ulogovan)
- `/login`
- `/register`
- `/forgot-password`
- `/reset-password`

### Nezaštićene rute
- `/` (landing)
- `/verify-email`
- `/api/auth/*`

## Email Verification Flow

1. Registracija → `createVerificationToken(email)` → token u `VerificationToken`
2. Email sa linkom: `/verify-email?token=...`
3. `verifyEmailAction(token)` → postavlja `user.emailVerified = now()`
4. Briše token iz baze

**TTL:** 24 sata

**Dev:** Bez `RESEND_API_KEY` — email se loguje u terminal

## Password Reset Flow

1. Forgot password forma → `createPasswordResetToken(email)`
2. Email sa linkom: `/reset-password?token=...`
3. Reset forma → `resetPasswordAction` → bcrypt hash → update user
4. Briše `PasswordResetToken`

**TTL:** 1 sat

**Security:** Uvek vraća istu poruku ("If an account exists...") da ne otkriva email

## Ban sistem

- `user.banned = true` → `authorize()` vraća null
- Još nema admin UI za ban

## Budući auth provideri

### Strava OAuth (Feature 3)
- Koristi postojeći `Account` model
- `provider: "strava"`
- Token refresh u sync servisu

### Email provider
- Resend API (`RESEND_API_KEY`)
- From: `EMAIL_FROM` env var

## Pozivanje auth u kodu

### Server Component
```ts
import { auth } from "@/auth";

const session = await auth();
if (!session?.user) redirect("/login");
```

### Server Action
```ts
import { signIn, signOut } from "@/auth";
```

### Middleware
```ts
import { auth } from "@/auth";
export default auth((request) => { ... });
```

## Poznata ograničenja

- Profili su trenutno zaštićeni (nije javni pristup)
- Email verification nije obavezan za login (samo upozorenje na dashboardu)
- Nema rate limiting na auth endpointima
- Nema 2FA
