# Features — Status & Roadmap

## Legenda

- ✅ Završeno
- 🚧 U toku
- ⏳ Planirano
- 🔮 Budućnost (samo arhitektura)

---

## Feature 1: Foundation + Authentication ✅

**Status:** Završeno

### Urađeno
- [x] Next.js scaffold (TypeScript, Tailwind, ESLint)
- [x] shadcn/ui komponente (button, input, card, avatar, dropdown, skeleton, sonner)
- [x] Dark/light mode
- [x] Landing page
- [x] Registracija (User + Profile)
- [x] Login / Logout
- [x] Forgot password
- [x] Reset password
- [x] Email verification (arhitektura + stranica)
- [x] Middleware zaštita ruta
- [x] Dashboard placeholder
- [x] Settings placeholder
- [x] Profile stranica (basic, zaštićena)
- [x] Zod validacija
- [x] Server actions
- [x] Toast notifikacije
- [x] Prisma schema (User, Profile, auth modeli)

### Fajlovi
- `auth.ts`, `middleware.ts`, `actions/auth.actions.ts`
- `features/auth/components/*`
- `app/(auth)/*`, `app/(app)/*`

---

## Feature 2: User Profile ⏳

**Sledeći na redu** — čeka potvrdu korisnika

### Plan
- [ ] Edit profila (firstName, lastName, username, bio, country, city, gender, birthYear)
- [ ] Cloudinary upload za profile image
- [ ] Settings stranica sa formom
- [ ] Puna profile stranica sa statistikama (placeholder vrednosti):
  - Total distance, total runs, longest run
  - Fastest 5K, fastest 10K
  - Longest weekly distance, current streak
  - Followers / Following count
- [ ] Javni profili (trenutno zaštićeni u `(app)` layout-u)

---

## Feature 3: Strava Integration ⏳

- [ ] Strava OAuth provider u Auth.js
- [ ] Čuvanje athleteId, accessToken, refreshToken, expirationDate
- [ ] Sync servis — samo running aktivnosti
- [ ] Auto token refresh
- [ ] Import: distance, moving time, elapsed time, pace, elevation, date, speeds

---

## Feature 4: Activities ⏳

- [ ] Activity model u Prisma
- [ ] Activity history stranica
- [ ] Prikaz: title, distance, pace, duration, elevation, date, source

---

## Feature 5: Running Leagues ⏳

- [ ] League CRUD
- [ ] Public / Private
- [ ] Invite code + invite link
- [ ] Owner: invite, remove, delete, edit
- [ ] Join via code/link

---

## Feature 6: League Rankings ⏳

- [ ] Auto-generisanje rankinga
- [ ] Metrike: total distance, runs, avg pace, elevation, longest run
- [ ] Default: total distance
- [ ] Auto update posle Strava sync-a

---

## Feature 7: Automatic Location Leagues ⏳

- [ ] Country / Region / City lige pri registraciji
- [ ] System leagues (ne brišu se)
- [ ] Hijerarhija: World → Europe → Country → Region → City

---

## Feature 8: Social Feed ⏳

- [ ] Feed sa aktivnostima
- [ ] Like / Comment
- [ ] Arhitektura za photos i activity maps

---

## Feature 9: Notifications ⏳

- [ ] Notification model
- [ ] Tipovi: league join, overtaken, comment, like, invite, weekly summary

---

## Feature 10: Badges ⏳

- [ ] Badge + UserBadge modeli
- [ ] Achievement logika (First Run, 10km, 50km, Marathon, itd.)

---

## Feature 11: Following System ⏳

- [ ] Follow / Unfollow
- [ ] Followers / Following na profilu

---

## Feature 12: Search ⏳

- [ ] Search users (username, name, city)
- [ ] Search leagues (name, country, city)

---

## Feature 13: Admin Panel ⏳

- [ ] Admin dashboard
- [ ] Manage users, ban, delete leagues
- [ ] Statistics, featured challenges
- [ ] Zaštita po `role: ADMIN`

---

## Budući feature-i 🔮

- Garmin, Polar, Coros, Apple Health
- OCR competitions
- Monthly challenges
- Team leagues
- AI running insights
- Premium subscriptions
- Push notifications
- React Native mobile app

---

## Redosled razvoja (preporučeni)

1. ✅ Auth
2. ⏳ Profile editing + Cloudinary
3. ⏳ Strava sync
4. ⏳ Activities
5. ⏳ Leagues + Rankings
6. ⏳ Location leagues
7. ⏳ Feed + Following
8. ⏳ Notifications + Badges
9. ⏳ Search
10. ⏳ Admin
