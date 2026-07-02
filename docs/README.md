# PaceX — Project Documentation

Dokumentacija za analizu i razvoj projekta. Koristi ove fajlove kao ulaznu tačku pre nego što menjaš kod.

## Sadržaj

| Fajl | Opis |
|------|------|
| [PROJECT.md](./PROJECT.md) | Vizija, cilj, tech stack, dizajn smernice |
| [ARCHITECTURE.md](./ARCHITECTURE.md) | Arhitektura, slojevi, pattern-i, data flow |
| [DATABASE.md](./DATABASE.md) | Prisma šema, relacije, planirani modeli |
| [FEATURES.md](./FEATURES.md) | Status feature-a, roadmap, redosled razvoja |
| [AUTH.md](./AUTH.md) | Autentifikacija, sesije, tokeni, email flow |
| [ROUTES.md](./ROUTES.md) | Sve rute, layout grupe, zaštita |
| [FILE-MAP.md](./FILE-MAP.md) | Mapa fajlova i odgovornosti |
| [CONVENTIONS.md](./CONVENTIONS.md) | Pravila razvoja za AI i developere |
| [ENVIRONMENT.md](./ENVIRONMENT.md) | Env varijable i konfiguracija |

## Brzi kontekst

- **Naziv:** PaceX
- **Tip:** Web app sličan Stravi, fokus na running lige i takmičenja
- **Trenutna faza:** Feature 1 završen (autentifikacija + osnova)
- **Framework:** Next.js 16 (App Router), TypeScript, Prisma 6, PostgreSQL
- **Auth:** Auth.js v5 (NextAuth beta), credentials provider, JWT sesije

## Kako koristiti ovu dokumentaciju

1. Pročitaj `PROJECT.md` za širi kontekst
2. Proveri `FEATURES.md` šta je urađeno i šta sledi
3. Za backend/auth promene → `AUTH.md` + `DATABASE.md`
4. Za nove stranice/komponente → `ROUTES.md` + `FILE-MAP.md` + `CONVENTIONS.md`

## Ažuriranje

Ažuriraj relevantne `.md` fajlove posle svakog završenog feature-a.
