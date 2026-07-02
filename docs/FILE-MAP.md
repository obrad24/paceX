# File Map

Detaljna mapa fajlova sa opisom odgovornosti.

## Root

| Fajl | Odgovornost |
|------|-------------|
| `auth.ts` | Auth.js konfiguracija |
| `middleware.ts` | Zaštita ruta |
| `package.json` | Dependencies i npm scripts |
| `.env.example` | Template env varijabli |
| `components.json` | shadcn/ui konfiguracija |
| `next.config.ts` | Next.js config |
| `AGENTS.md` | Next.js 16 agent pravila (auto-generated) |

## app/

| Fajl | Odgovornost |
|------|-------------|
| `layout.tsx` | Root layout, Providers, metadata |
| `globals.css` | Tailwind + shadcn theme variables |
| `page.tsx` | Landing page |
| `(auth)/login/page.tsx` | Login stranica |
| `(auth)/register/page.tsx` | Register stranica |
| `(auth)/forgot-password/page.tsx` | Forgot password |
| `(auth)/reset-password/page.tsx` | Reset password (token iz query) |
| `(auth)/verify-email/page.tsx` | Email verification (server) |
| `(app)/layout.tsx` | Protected layout + AppHeader |
| `(app)/dashboard/page.tsx` | Dashboard sa stat placeholderima |
| `(app)/settings/page.tsx` | Settings placeholder |
| `(app)/profile/[username]/page.tsx` | Basic profil prikaz |
| `api/auth/[...nextauth]/route.ts` | Auth.js API handlers |

## actions/

| Fajl | Odgovornost |
|------|-------------|
| `auth.actions.ts` | register, login, forgot/reset password, verify, logout |

## components/

### components/ui/
shadcn generisane komponente — **ne editovati ručno osim ako treba**

- `button.tsx`, `input.tsx`, `label.tsx`, `card.tsx`
- `avatar.tsx`, `dropdown-menu.tsx`, `separator.tsx`
- `skeleton.tsx`, `sonner.tsx`

### components/layout/
| Fajl | Odgovornost |
|------|-------------|
| `site-header.tsx` | Header za javne stranice |
| `app-header.tsx` | Header za ulogovane korisnike |

### components/auth/
| Fajl | Odgovornost |
|------|-------------|
| `auth-card.tsx` | Wrapper card za auth forme |

### Ostalo
| Fajl | Odgovornost |
|------|-------------|
| `providers.tsx` | TanStack Query + ThemeProvider + Toaster |
| `theme-toggle.tsx` | Dark/light mode toggle |

## features/

Feature-based moduli. Svaki feature ima svoj folder.

```
features/
└── auth/
    └── components/
        ├── login-form.tsx
        ├── register-form.tsx
        ├── forgot-password-form.tsx
        └── reset-password-form.tsx
```

**Pravilo:** Novi feature-i idu u `features/<name>/` sa components, hooks, utils specifičnim za taj feature.

## lib/

| Fajl | Odgovornost |
|------|-------------|
| `prisma.ts` | Prisma client singleton |
| `utils.ts` | `cn()` helper (shadcn) |
| `validations/auth.ts` | Zod auth šeme |

**Planirano:**
- `lib/validations/profile.ts`
- `lib/validations/league.ts`
- `lib/cloudinary.ts`

## server/

```
server/
└── services/
    ├── email.service.ts    # Email delivery
    └── token.service.ts    # Verification + reset tokens
```

**Planirano:**
- `server/services/strava.service.ts`
- `server/services/sync.service.ts`
- `server/services/league.service.ts`
- `server/services/ranking.service.ts`

## emails/

| Fajl | Odgovornost |
|------|-------------|
| `auth-emails.ts` | Verification + password reset HTML templates |

## prisma/

| Fajl | Odgovornost |
|------|-------------|
| `schema.prisma` | Database schema |

## types/

| Fajl | Odgovornost |
|------|-------------|
| `next-auth.d.ts` | Auth.js type extensions |

## docs/

Projektna dokumentacija za AI analizu.

## Prazni / planirani folderi

Ovi folderi su u spec-u ali još ne postoje:
- `hooks/`
- `utils/` (odvojeno od lib/)

Kreirati ih kad zatrebaju.

## Import alias

`@/*` → root projekta (definisano u `tsconfig.json`)

Primeri:
```ts
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { LoginForm } from "@/features/auth/components/login-form";
```
