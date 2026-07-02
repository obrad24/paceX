# Development Conventions

Pravila za AI agente i developere pri radu na PaceX projektu.

## Opšta pravila

1. **Feature-by-feature** — ne implementirati sve odjednom
2. **Stani posle svakog feature-a** — čekaj potvrdu korisnika
3. **Minimalan scope** — samo tražene promene
4. **Bez over-engineering-a** — jednostavna rešenja
5. **Prati postojeće konvencije** — čitaj okolni kod pre pisanja

## Next.js 16 napomene

- Pročitaj `AGENTS.md` — Next.js 16 ima breaking changes
- Docs u `node_modules/next/dist/docs/` za tačne API-je
- `middleware` je deprecated u korist `proxy` — pratiti pri refactor-u
- Server Components su default
- `"use client"` samo kad je neophodno

## Struktura novog feature-a

```
1. docs/FEATURES.md        — ažuriraj status
2. prisma/schema.prisma    — novi modeli (ako treba)
3. lib/validations/        — Zod šeme
4. server/services/        — business logika
5. actions/                — server actions
6. features/<name>/        — UI komponente
7. app/                    — stranice/rute
8. docs/*.md               — ažuriraj relevantnu dokumentaciju
```

## Imenovanje

| Tip | Konvencija | Primer |
|-----|------------|--------|
| Komponente | PascalCase | `LoginForm.tsx` |
| Server actions fajl | `*.actions.ts` | `auth.actions.ts` |
| Services | `*.service.ts` | `email.service.ts` |
| Validations | po domenu | `lib/validations/auth.ts` |
| DB tabele | snake_case (@@map) | `users`, `profiles` |
| Prisma modeli | PascalCase | `User`, `Profile` |

## Server Actions pattern

```ts
"use server";

export type ActionState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
};

export async function myAction(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const parsed = schema.safeParse(...);
  if (!parsed.success) {
    return { success: false, message: "...", errors: parsed.error.flatten().fieldErrors };
  }
  // business logic
  return { success: true, message: "..." };
}
```

## Forme (client)

- Koristi `useActionState` sa server actions
- Toast preko `sonner` za feedback
- Zod errors prikazuj ispod input polja
- `aria-invalid` na inputima sa greškama

## Auth u zaštićenim stranicama

```ts
const session = await auth();
if (!session?.user) redirect("/login");
```

Middleware je prvi sloj, layout je backup.

## Baza podataka

- Uvek lowercase za email i username pri čuvanju
- bcrypt 12 rounds za lozinke
- Cascade delete na Profile
- Dodaj `@@index` za često pretraživana polja
- Migracije: `npm run db:migrate`

## UI / Styling

- shadcn/ui komponente iz `components/ui/`
- `cn()` za conditional classes
- Primary boja: orange (Strava-inspired)
- Cards: `rounded-2xl`, `border-border/60`
- Empty states: dashed border, muted background
- Skeleton loaders za loading states

## Error handling

- Server actions: vraćaj `ActionState`, ne throw (osim redirect)
- Login: hvataj `AuthError` i `isRedirectError`
- Email: ne fail-uj registraciju ako email ne može da se pošalje u dev
- API rute (buduće): typed responses + proper HTTP status

## Šta NE raditi

- Ne commitovati `.env`
- Ne hardcode-ovati secrets
- Ne koristiti `as any` bez razloga
- Ne brisati shadcn ui fajlove bez potrebe
- Ne praviti duplu business logiku u komponentama
- Ne preskakati Zod validaciju na serveru
- Ne implementirati više feature-a bez potvrde

## Testiranje pre predaje

```bash
npm run db:generate
npm run build
npm run lint
```

## Dokumentacija

Posle svakog feature-a ažuriraj:
- `docs/FEATURES.md` — status
- `docs/DATABASE.md` — ako ima schema promena
- `docs/ROUTES.md` — ako ima novih ruta
- `docs/FILE-MAP.md` — ako ima novih fajlova/foldera
