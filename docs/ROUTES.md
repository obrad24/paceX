# Routes & Pages

## Route mapa

| Ruta | Tip | Layout grupa | Auth | Opis |
|------|-----|--------------|------|------|
| `/` | Static | root | Public | Landing page |
| `/login` | Static | `(auth)` | Guest only | Login forma |
| `/register` | Static | `(auth)` | Guest only | Registracija |
| `/forgot-password` | Static | `(auth)` | Guest only | Zaboravljena lozinka |
| `/reset-password` | Dynamic | `(auth)` | Guest only | Reset lozinke (`?token=`) |
| `/verify-email` | Dynamic | `(auth)` | Public | Verifikacija emaila (`?token=`) |
| `/dashboard` | Dynamic | `(app)` | Protected | Dashboard |
| `/settings` | Dynamic | `(app)` | Protected | Settings placeholder |
| `/profile/[username]` | Dynamic | `(app)` | Protected | Profil korisnika |
| `/api/auth/[...nextauth]` | API | — | Public | Auth.js handlers |

## Layout hijerarhija

```
app/layout.tsx                    # Root: Providers, fonts, metadata
├── app/page.tsx                  # Landing (SiteHeader)
├── app/(auth)/*/page.tsx         # Auth stranice (SiteHeader)
└── app/(app)/layout.tsx          # Zaštićen: AppHeader + auth check
    ├── dashboard/page.tsx
    ├── settings/page.tsx
    └── profile/[username]/page.tsx
```

## Layout komponente

### SiteHeader (`components/layout/site-header.tsx`)
- Za javne/auth stranice
- Logo, theme toggle, Sign in / Get started linkovi

### AppHeader (`components/layout/app-header.tsx`)
- Za ulogovane korisnike
- Logo, Dashboard link, theme toggle, user dropdown
- Dropdown: Profile, Settings, Sign out

## Route grupe

Next.js route groups `(auth)` i `(app)` **ne utiču na URL**.

- `(auth)` — auth forme sa `SiteHeader`
- `(app)` — zaštićene stranice sa `AppHeader` + server-side auth check

## Middleware matcher

```ts
[
  "/dashboard/:path*",
  "/profile/:path*",
  "/settings/:path*",
  "/admin/:path*",
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
]
```

**Napomena:** `(app)/layout.tsx` takođe radi `redirect("/login")` kao backup.

## Planirane rute

| Ruta | Feature |
|------|---------|
| `/activities` | Feature 4 |
| `/activities/[id]` | Feature 4 |
| `/leagues` | Feature 5 |
| `/leagues/[id]` | Feature 5 |
| `/leagues/create` | Feature 5 |
| `/leagues/join` | Feature 5 |
| `/feed` | Feature 8 |
| `/search` | Feature 12 |
| `/admin` | Feature 13 |
| `/admin/users` | Feature 13 |
| `/settings/integrations` | Feature 3 (Strava) |
| `/settings/profile` | Feature 2 |

## Metadata

Stranice koriste `export const metadata: Metadata` za title.

Root template: `%s | PaceX` (definisano u `app/layout.tsx`)

## Redirect pravila

| Uslov | Destinacija |
|-------|-------------|
| Neulogovan + protected route | `/login?callbackUrl=...` |
| Ulogovan + auth route | `/dashboard` |
| `/reset-password` bez tokena | `/forgot-password` |
| Neulogovan u `(app)/layout` | `/login` |

## API rute (planirane)

```
/api/auth/[...nextauth]     ✅ postoji
/api/users/search           ⏳ Feature 12
/api/leagues/search         ⏳ Feature 12
/api/strava/webhook         ⏳ Feature 3
/api/upload                 ⏳ Feature 2 (Cloudinary)
```
