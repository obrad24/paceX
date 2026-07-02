# PaceX — Project Overview

## Šta je PaceX?

PaceX je production-ready web aplikacija inspirisana Stravom, ali sa fokusom na **running lige i takmičenja**. Korisnici se takmiče u leaderboard-ima, prate aktivnosti (preko Strava sync-a), prate jedni druge i zarađuju badge-ove.

## Glavne funkcionalnosti (plan)

1. **Autentifikacija** — registracija, login, reset lozinke, verifikacija emaila
2. **Profil korisnika** — edit profila, Cloudinary slike, statistike
3. **Strava integracija** — OAuth, sync trčanja, auto refresh tokena
4. **Aktivnosti** — istorija trčanja, distance, pace, elevation
5. **Running lige** — kreiranje, invite kod/link, public/private
6. **Rankings** — automatski leaderboard po distance, runs, pace, elevation
7. **Automatske location lige** — country, region, city (ne brišu se)
8. **Feed** — like, comment na aktivnosti
9. **Notifikacije** — league join, overtaken, comments, likes, invites
10. **Badge-ovi** — achievement sistem
11. **Following** — follow/unfollow sistem
12. **Search** — korisnici i lige
13. **Admin panel** — upravljanje korisnicima, ligama, statistikama

## Tech Stack

| Tehnologija | Verzija / Napomena |
|-------------|-------------------|
| Next.js | 16.2 (App Router) — spec originalno tražio v15 |
| React | 19 |
| TypeScript | 5 |
| Tailwind CSS | 4 |
| shadcn/ui | v4 (base-nova style) |
| Prisma ORM | 6.19 |
| PostgreSQL | primary database |
| Auth.js | next-auth v5 beta |
| Zod | 4 — validacija |
| React Hook Form | instaliran, delimično korišćen |
| TanStack Query | Providers setup, još nema query-ja |
| Cloudinary | planirano (Feature 2) |
| Strava OAuth | planirano (Feature 3) |
| Vercel | target deployment |

## Dizajn smernice

- Modern, premium, minimal UI
- Inspiracija: Strava, Garmin Connect, GitHub, Linear, Notion
- Orange primary boja (Strava-like `#fc4c02` ton)
- Rounded cards, smooth animacije
- Dark/light mode (`next-themes`)
- Responsive layout
- Server Components gde god je moguće
- Client Components samo kad je neophodno (forme, theme toggle, providers)

## Arhitekturni principi

- Clean architecture — business logika van UI-ja
- Feature-by-feature razvoj (ne sve odjednom)
- Type-safe kod
- Zod validacija na serveru
- Server Actions za mutacije
- Reusable komponente
- SOLID, bez duplikacije
- Loading/empty/skeleton states
- Toast notifikacije (sonner)

## Folder struktura (cilj)

```
app/           # Next.js rute i API
actions/       # Server actions
components/    # Shared UI
features/      # Feature-specifični moduli
lib/           # Utils, prisma, validacije
hooks/         # Custom hooks (još prazno)
server/        # Services, business logika
prisma/        # Schema i migracije
types/         # TypeScript tipovi
utils/         # Helper funkcije (još prazno)
emails/        # Email template-i
docs/          # Ova dokumentacija
```

## Razvojni workflow

Za svaki feature:

1. Objasni arhitekturu
2. Kreiraj/ažuriraj DB šemu
3. Implementiraj backend
4. Implementiraj frontend
5. Validacija
6. Testiranje
7. **Stani i čekaj potvrdu** pre sledećeg feature-a

## Budući feature-i (samo arhitektura)

- Garmin, Polar, Coros, Apple Health integracije
- OCR competitions
- Monthly challenges
- Team leagues
- AI running insights
- Premium subscriptions
- Push notifications
- React Native mobile app
