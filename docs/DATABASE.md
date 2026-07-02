# Database Schema

**ORM:** Prisma 6  
**DB:** PostgreSQL  
**Client:** `@prisma/client` via `lib/prisma.ts` (singleton pattern)

## Implementirani modeli

### User
Centralni auth entitet.

| Polje | Tip | Napomena |
|-------|-----|----------|
| id | String (cuid) | PK |
| email | String | unique, indexed |
| emailVerified | DateTime? | null dok se ne verifikuje |
| password | String? | bcrypt hash, null za OAuth-only |
| role | Role enum | USER (default), ADMIN |
| banned | Boolean | default false |
| createdAt | DateTime | auto |
| updatedAt | DateTime | auto |

**Relacije:** `profile`, `accounts[]`, `sessions[]`

### Profile
Korisnički profil — odvojen od User radi fleksibilnosti.

| Polje | Tip | Napomena |
|-------|-----|----------|
| id | String (cuid) | PK |
| userId | String | unique FK → User |
| firstName | String | |
| lastName | String | |
| username | String | unique, indexed, lowercase pri čuvanju |
| image | String? | URL (Cloudinary u Feature 2) |
| bio | String? | |
| country | String? | za location lige |
| city | String? | indexed, za location lige |
| gender | Gender? | optional enum |
| birthYear | Int? | optional |
| createdAt | DateTime | |
| updatedAt | DateTime | |

### Account
Auth.js OAuth model — spreman za Strava provider.

Polja: `provider`, `providerAccountId`, `access_token`, `refresh_token`, `expires_at`, itd.

### Session
Auth.js session model (PrismaAdapter). Aktivne sesije koriste JWT, ali model postoji.

### VerificationToken
Auth.js + custom email verification.

- `identifier` = email
- `token` = random hex
- `expires` = DateTime

### PasswordResetToken
Custom model za reset lozinke.

- `email`, `token`, `expires`, `createdAt`

## Enum-i

```prisma
enum Role { USER, ADMIN }
enum Gender { MALE, FEMALE, OTHER, PREFER_NOT_TO_SAY }
```

## Planirani modeli (još nisu u šemi)

### Activity
```
- id, title, distance, pace, duration, elevation
- date, source (STRAVA), athleteId → User
- movingTime, elapsedTime, avgSpeed, maxSpeed
```

### League
```
- id, name, description, isPublic
- inviteCode, inviteLink
- startDate, endDate, logo
- ownerId → User
- isSystem (za location lige koje se ne brišu)
- type: CUSTOM | COUNTRY | REGION | CITY
```

### LeagueMember
```
- leagueId, userId, joinedAt, role (OWNER | MEMBER)
```

### Country / City
```
- Hijerarhija za automatske lige
- World → Continent → Country → Region → City
```

### Notification
```
- userId, type, message, read, metadata (JSON)
- tipovi: LEAGUE_JOIN, OVERTAKEN, COMMENT, LIKE, INVITE, WEEKLY_SUMMARY
```

### Badge / UserBadge
```
- Badge: name, description, icon, criteria
- UserBadge: userId, badgeId, earnedAt
```

### Comment / Like
```
- Comment: activityId, userId, content
- Like: activityId, userId (unique pair)
```

### Follow
```
- followerId, followingId (unique pair)
```

### StravaConnection (može biti deo Account)
```
- athleteId, accessToken, refreshToken, expirationDate
- Strava koristi Account model sa provider="strava"
```

## Relacije — planirani dijagram

```
User
 ├── Profile (1:1)
 ├── Account[] (1:N) — Strava OAuth
 ├── Activity[] (1:N)
 ├── LeagueMember[] (1:N)
 ├── League[] owned (1:N)
 ├── Follow[] as follower (1:N)
 ├── Follow[] as following (1:N)
 ├── Comment[] (1:N)
 ├── Like[] (1:N)
 ├── Notification[] (1:N)
 └── UserBadge[] (1:N)

League
 ├── LeagueMember[] (1:N)
 └── owner → User

Activity
 ├── Comment[] (1:N)
 └── Like[] (1:N)
```

## Migracije

```bash
npm run db:migrate    # prisma migrate dev
npm run db:push       # prisma db push (dev shortcut)
npm run db:generate   # prisma generate
npm run db:studio     # Prisma Studio GUI
```

## Indexes (trenutni)

- `users.email`
- `profiles.username`
- `profiles.city`
- `password_reset_tokens.email`

## Napomene za AI

- Username se čuva lowercase u `registerAction`
- Email se čuva lowercase
- `onDelete: Cascade` na Profile i Account relacijama
- Prisma 6 sa `url` u `schema.prisma` (ne Prisma 7 config)
