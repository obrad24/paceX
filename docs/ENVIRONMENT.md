# Environment Variables

Kopiraj `.env.example` u `.env` i popuni vrednosti.

## Obavezne (za rad aplikacije)

### DATABASE_URL
```
postgresql://USER:PASSWORD@HOST:PORT/pacex?schema=public
```
PostgreSQL connection string.

**Primer lokalno:**
```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/pacex?schema=public"
```

### AUTH_SECRET
Secret za Auth.js JWT enkripciju.

**Generisanje:**
```bash
openssl rand -base64 32
```

### AUTH_URL
Base URL aplikacije (za email linkove i OAuth callbacks).

**Lokalno:**
```
AUTH_URL="http://localhost:3000"
```

**Production:**
```
AUTH_URL="https://your-domain.vercel.app"
```

## Opcione (po feature-u)

### Email — Resend

| Varijabla | Opis |
|-----------|------|
| `RESEND_API_KEY` | Resend API ključ |
| `EMAIL_FROM` | From adresa, npr. `PaceX <noreply@pacex.app>` |

**Bez RESEND_API_KEY:** U development modu emailovi se loguju u terminal.

### Strava OAuth (Feature 3)

| Varijabla | Opis |
|-----------|------|
| `STRAVA_CLIENT_ID` | Strava app client ID |
| `STRAVA_CLIENT_SECRET` | Strava app client secret |

**Callback URL (planirano):**
```
{AUTH_URL}/api/auth/callback/strava
```

### Cloudinary (Feature 2)

| Varijabla | Opis |
|-----------|------|
| `CLOUDINARY_CLOUD_NAME` | Cloud name |
| `CLOUDINARY_API_KEY` | API key |
| `CLOUDINARY_API_SECRET` | API secret |

## NODE_ENV ponašanje

| Env | Ponašanje |
|-----|-----------|
| `development` | Email log u konzolu, Prisma warn log |
| `production` | Resend obavezan za email, Prisma error log only |

## Vercel deployment

Postavi env varijable u Vercel dashboard:
1. `DATABASE_URL` — Neon/Supabase/Prisma Postgres
2. `AUTH_SECRET`
3. `AUTH_URL` — production domain
4. `RESEND_API_KEY` + `EMAIL_FROM`
5. (kasnije) Strava i Cloudinary ključevi

## Sigurnost

- `.env` je u `.gitignore`
- Nikad ne commituj secrets
- `AUTH_SECRET` mora biti različit između env-ova
- U production koristi jaku lozinku za DB

## Prisma napomena

Prisma 6 učitava `DATABASE_URL` direktno iz `.env` preko `schema.prisma`:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

Nema `prisma.config.ts` (uklonjen jer Prisma 7 zahteva adapter).
