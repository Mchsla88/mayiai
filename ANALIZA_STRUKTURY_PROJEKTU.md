# 📋 Analiza Struktury Projektu mayiai

## 🎯 Podsumowanie Wykonawcze

**Nazwa projektu:** mayiai  
**Typ aplikacji:** Platforma szkoleniowa Next.js 14 (App Router)  
**Rozmiar projektu:** ~304 MB (bez node_modules)  
**Język:** TypeScript + React 18  
**Data analizy:** 3 grudnia 2024

---

## 📂 Struktura Głównych Katalogów

```
/home/ubuntu/mayiai/
├── app/                    # Next.js 14 App Router (strony i API)
├── components/             # Komponenty React wielokrotnego użytku
├── lib/                    # Logika biznesowa i utilsy
├── prisma/                 # Schema bazy danych i migracje
├── public/                 # Pliki statyczne (246 MB - głównie multimedia)
├── scripts/                # Skrypty administracyjne i seedowanie
├── types/                  # Definicje TypeScript
└── hooks/                  # Custom React hooks
```

---

## 🗂️ Szczegółowa Struktura Stron (App Directory)

### Strony Publiczne
- **`/`** - Strona główna (`app/page.tsx`)
- **`/o-nas`** - O firmie
- **`/oferta`** - Oferta usług
- **`/kontakt`** - Formularz kontaktowy
- **`/blog`** - Blog z artykułami (dynamic routing: `[slug]`)
- **`/ebooki`** - Katalog e-booków
- **`/uslugi`** - Strona usług

### Strony Prawne
- **`/polityka-prywatnosci`**
- **`/polityka-cookies`**
- **`/regulamin-zakupow`**
- **`/regulamin-zwrotow`**

### Strony Szkoleń
- **`/szkolenia`** - Lista szkoleń
- **`/szkolenia/mlody-influencer`** - Główny kurs dla młodych influencerów
- **`/szkolenia/dzieci`** - Szkolenia dla dzieci
- **`/szkolenia/nauczyciele`** - Szkolenia dla nauczycieli

### Strefy Chronione (wymagają logowania)
- **`/auth/login`** - Logowanie
- **`/auth/register`** - Rejestracja
- **`/dashboard`** - Panel użytkownika
- **`/admin`** - Panel administratora
- **`/ebook`** - Dostęp do e-booków

---

## 🔌 API Routes

### Uwierzytelnianie
- `POST /api/auth/[...nextauth]` - NextAuth.js endpoints
- `POST /api/signup` - Rejestracja nowego użytkownika

### Panel Administracyjny
- `/api/admin/users` - Zarządzanie użytkownikami
- `/api/admin/trainings` - Zarządzanie szkoleniami
- `/api/admin/discounts` - Kody rabatowe
- `/api/admin/grant` - Przyznawanie dostępu do szkoleń
- `/api/admin/password` - Reset hasła

### Płatności
- `POST /api/payu/order` - Tworzenie zamówienia PayU
- `POST /api/payu/notify` - Webhook PayU (powiadomienia o płatnościach)

### Funkcje Użytkownika
- `/api/progress` - Postęp w szkoleniach
- `/api/achievements` - System osiągnięć
- `/api/ebook/progress` - Postęp czytania e-booków
- `/api/user/subscription` - Status subskrypcji

### Pozostałe
- `/api/contact` - Formularz kontaktowy
- `/api/indexnow` - IndexNow (SEO)
- `/api/test-db` - Testy połączenia z bazą
- `/api/debug-health` - Healthcheck

---

## 🎨 Główne Komponenty

### Layout Components
- **`components/header.tsx`** - Nagłówek strony
- **`components/navbar.tsx`** - Nawigacja
- **`components/footer.tsx`** - Stopka

### Funkcjonalne Komponenty
- **`components/auth/`** - Komponenty uwierzytelniania
- **`components/dashboard/`** - Komponenty panelu użytkownika
- **`components/admin/`** - Komponenty panelu admin
- **`components/ebook/`** - Czytnik e-booków
- **`components/payu/`** - Integracja płatności PayU
- **`components/forms/`** - Formularze
- **`components/sections/`** - Sekcje stron

### UI Components (Shadcn/ui)
- **`components/ui/`** - Biblioteka komponentów UI (Radix UI + Tailwind)
  - Buttons, Cards, Dialogs, Forms, Tabs, itp.

### Specialized
- **`components/certificate-generator.tsx`** - Generator certyfikatów
- **`components/training-slider.tsx`** - Slider szkoleń
- **`components/infographics.tsx`** - Infografiki

---

## 📦 Package.json - Kluczowe Zależności

### Framework & Core
```json
{
  "next": "14.2.28",
  "react": "18.2.0",
  "react-dom": "18.2.0",
  "typescript": "5.2.2"
}
```

### Uwierzytelnianie & Baza Danych
```json
{
  "next-auth": "4.24.11",
  "@next-auth/prisma-adapter": "1.0.7",
  "@prisma/client": "6.7.0",
  "prisma": "6.7.0",
  "bcryptjs": "2.4.3"
}
```

### AWS S3 (Przechowywanie plików)
```json
{
  "@aws-sdk/client-s3": "^3.908.0",
  "@aws-sdk/s3-request-presigner": "^3.908.0"
}
```

### Email (Resend)
```json
{
  "resend": "^6.5.2"
}
```

### UI Components (Radix UI)
- Pełna biblioteka komponentów Radix UI (accordion, dialog, dropdown, tabs, itp.)

### Styling
```json
{
  "tailwindcss": "3.3.3",
  "tailwindcss-animate": "1.0.7",
  "tailwind-merge": "2.5.2",
  "framer-motion": "10.18.0"
}
```

### Forms & Validation
```json
{
  "react-hook-form": "7.53.0",
  "@hookform/resolvers": "3.9.0",
  "yup": "1.3.0",
  "zod": "3.23.8"
}
```

### Charts & Visualization
```json
{
  "chart.js": "4.4.9",
  "react-chartjs-2": "5.3.0",
  "plotly.js": "2.35.3",
  "react-plotly.js": "2.6.0",
  "recharts": "2.15.3"
}
```

### Markdown & Content
```json
{
  "react-markdown": "^10.1.0",
  "remark-gfm": "^4.0.1",
  "gray-matter": "4.0.3"
}
```

---

## 💾 Baza Danych - PostgreSQL (Neon)

### Provider
**Neon PostgreSQL** (serverless)  
- Pooling URL: `ep-solitary-mud-ab5kf614-pooler.eu-west-2.aws.neon.tech`
- Direct URL: `ep-solitary-mud-ab5kf614.eu-west-2.aws.neon.tech`

### Główne Modele (schema.prisma)

#### Użytkownicy & Uwierzytelnianie
- **User** - Użytkownicy (role: USER, ADMIN)
- **Account** - Konta OAuth
- **Session** - Sesje użytkowników
- **VerificationToken** - Tokeny weryfikacyjne

#### Biznesowe
- **Training** - Szkolenia (title, price, level, duration)
- **UserTraining** - Dostęp użytkownika do szkoleń
- **Order** - Zamówienia (integracja PayU)
- **DiscountCode** - Kody rabatowe

#### E-booki & Treści
- **Ebook** - E-booki
- **EbookChapter** - Rozdziały e-booków
- **EbookProgress** - Postęp czytania
- **BlogPost** - Posty blogowe
- **PageContent** - Zawartość stron

#### Gamifikacja
- **UserProgress** - Postęp w rozdziałach
- **Achievement** - Osiągnięcia
- **UserAchievement** - Odblokowane osiągnięcia
- **QuizResult** - Wyniki quizów
- **Project** - Projekty użytkowników

#### Pozostałe
- **Subscription** - Subskrypcje (EBOOK_ACCESS, PREMIUM_MEMBERSHIP)
- **ContactFormSubmission** - Wiadomości z formularza kontaktowego

---

## 🌐 Zewnętrzne API & Integracje

### 1. **PayU** (Płatności)
- Environment: `PAYU_ENVIRONMENT`
- MD5 Key: `PAYU_MD`
- Webhooks: `/api/payu/notify`

### 2. **Resend** (Email)
- API Key: `RESEND_API_KEY`
- Wysyłanie:
  - Email powitalny po zakupie
  - Powiadomienia o dostępie do szkoleń

### 3. **AWS S3** (Przechowywanie plików)
- Konfiguracja: `lib/aws-config.ts`
- Bucket: `AWS_BUCKET_NAME`
- Folder prefix: `AWS_FOLDER_PREFIX`

### 4. **NextAuth.js** (Uwierzytelnianie)
- Secret: `NEXTAUTH_SECRET`
- Credentials Provider (email + hasło)
- Session strategy: JWT

### 5. **Neon PostgreSQL** (Baza danych)
- Pooling: `POSTGRES_PRISMA_URL`
- Direct: `POSTGRES_URL_NON_POOLING`

---

## 📁 Duże Pliki & Multimedia

### Top 10 Największych Plików

| Rozmiar | Plik | Opis |
|---------|------|------|
| 90 MB | `public/wstep.mp4` | Film wprowadzający |
| 18 MB | `public/6-film.mp4` | Materiał szkoleniowy #6 |
| 16 MB | `public/5-film.mp4` | Materiał szkoleniowy #5 |
| 15 MB | `public/3-film.mp4` | Materiał szkoleniowy #3 |
| 15 MB | `public/1-film.mp4` | Materiał szkoleniowy #1 |
| 8.1 MB | `public/4-film.mp4` | Materiał szkoleniowy #4 |
| 6.8 MB | `public/7-film.mp4` | Materiał szkoleniowy #7 |
| 6.4 MB | `public/hero/winter-scene.png` | Grafika hero |
| 6.1 MB | `public/8-film.mp4` | Materiał szkoleniowy #8 |
| 6.1 MB | `public/2-film.mp4` | Materiał szkoleniowy #2 |

### Statystyki Wielkości
- **Katalog `public/`**: 246 MB
- **Katalog `prisma/`**: 260 KB
- **Całość (bez node_modules, .git)**: 304 MB

### Typy Plików w `public/`
- **Filmy MP4**: ~190 MB (9 filmów szkoleniowych)
- **Obrazy PNG**: ~50 MB (hero, ilustracje, grafiki psów-maskotek)
- **PDF**: 3 MB (`mlody_influencer_kurs_COMPLETE.pdf`)
- **Audio MP3**: 2 pliki (slajdy audio)

---

## 🔐 Zmienne Środowiskowe (wymagane)

### Baza Danych (PostgreSQL)
- `POSTGRES_PRISMA_URL` ✅ (skonfigurowane)
- `POSTGRES_URL_NON_POOLING` ✅ (skonfigurowane)

### Uwierzytelnianie
- `NEXTAUTH_SECRET` ⚠️ (wymagane - brak w .env.production)
- `NEXT_PUBLIC_APP_URL` ⚠️ (używane w emailach)

### Płatności
- `PAYU_ENVIRONMENT` ⚠️ (brak w .env.production)
- `PAYU_MD` ⚠️ (brak w .env.production)

### Email
- `RESEND_API_KEY` ⚠️ (brak w .env.production)

### AWS S3 (opcjonalne)
- `AWS_BUCKET_NAME`
- `AWS_FOLDER_PREFIX`

### CMS (opcjonalne)
- `CMS_WEBHOOK_SECRET`

---

## 🛠️ Skrypty Administracyjne

Katalog `scripts/` zawiera:

### Zarządzanie użytkownikami
- `create-admin.ts` - Tworzenie konta admin
- `reset-admin-password.ts` - Reset hasła admin
- `check-admin-access.ts` - Sprawdzanie dostępu admin
- `grant-all-to-user.ts` - Przyznawanie wszystkich szkoleń użytkownikowi
- `test-delete-user.ts` - Testowanie usuwania użytkownika

### Zarządzanie szkoleniami
- `seed-trainings.ts` - Seedowanie szkoleń
- `seed-mlody-influencer.ts` - Seedowanie kursu "Młody Influencer"
- `check-user-trainings.ts` - Sprawdzanie szkoleń użytkownika
- `list-trainings.ts` - Lista wszystkich szkoleń
- `clean-trainings.ts` - Czyszczenie szkoleń

### Baza danych
- `list-tables.ts` - Lista tabel w bazie
- `clean-production-db.ts` - Czyszczenie bazy produkcyjnej
- `seed.ts` - Główny skrypt seedowania

### Deployment
- `prepare-deploy.ts` - Przygotowanie do wdrożenia

### Konwersja & Debugging
- `convert-md-to-tsx.js` - Konwersja Markdown na TSX
- `diagnose-auth.ts` - Diagnostyka uwierzytelniania
- `debug-access.ts` - Debug dostępu
- `test-admin-api.sh` - Test API admin

---

## 🚀 Uruchamianie Projektu

### Wymagania
```bash
Node.js >= 18.x
npm lub yarn
PostgreSQL database (Neon)
```

### Instalacja
```bash
cd /home/ubuntu/mayiai
npm install
# lub
yarn install
```

### Migracje bazy danych
```bash
npx prisma generate
npx prisma migrate dev
```

### Seedowanie danych
```bash
npm run prisma:seed
# lub
npx tsx scripts/seed.ts
```

### Development
```bash
npm run dev
# Aplikacja dostępna na http://localhost:3000
```

### Production Build
```bash
npm run build
npm run start
```

---

## 📋 Konfiguracja (pliki)

- **`next.config.js`** - Konfiguracja Next.js (ESLint, TypeScript, images, headers bezpieczeństwa)
- **`tailwind.config.ts`** - Konfiguracja Tailwind CSS
- **`components.json`** - Konfiguracja Shadcn/ui
- **`tsconfig.json`** - Konfiguracja TypeScript
- **`postcss.config.js`** - PostCSS
- **`.yarnrc.yml`** - Yarn configuration
- **`vercel.json`** - Konfiguracja deploymentu Vercel

---

## 🔍 Uwagi & Rekomendacje

### ✅ Mocne strony
1. **Nowoczesny stack** - Next.js 14, TypeScript, Prisma
2. **Dobrze zorganizowana struktura** - Czytelny podział na moduły
3. **Solidna autoryzacja** - NextAuth.js z JWT
4. **System gamifikacji** - Osiągnięcia, postęp, quizy
5. **Integracja płatności** - PayU
6. **SEO-friendly** - robots.txt, sitemap, structured data

### ⚠️ Potencjalne problemy
1. **Brakujące zmienne środowiskowe** w `.env.production`:
   - `NEXTAUTH_SECRET`
   - `PAYU_ENVIRONMENT`, `PAYU_MD`
   - `RESEND_API_KEY`
   
2. **Duże pliki multimedialne** (246 MB) - rozważyć:
   - Przeniesienie na CDN
   - Kompresję video
   - Lazy loading

3. **Duplikacja plików** - `mlody-influencer-backup` zawiera kopie plików

4. **Dev database** - `prisma/dev.db` (SQLite) obecna w repo - należy usunąć z .gitignore

### 🎯 Rekomendacje przed deployment
1. **Utworzyć plik `.env`** z wszystkimi wymaganymi zmiennymi
2. **Usunąć lub zignorować** `prisma/dev.db`
3. **Skonfigurować S3** dla przechowywania plików multimedialnych
4. **Dodać monitoring** (Sentry, LogRocket)
5. **Zabezpieczyć endpointy admin** - middleware sprawdzający rolę
6. **Backup bazy danych** - automatyczne snapshoty Neon

---

## 📊 Statystyki Projektu

- **Liczba plików TypeScript/JavaScript**: ~150+
- **Liczba API routes**: 20+
- **Liczba stron**: 25+
- **Modeli Prisma**: 20
- **Komponenty React**: 100+
- **Skrypty administracyjne**: 20+

---

## 🎓 Główne Funkcje Aplikacji

### Dla Użytkowników
✅ Przeglądanie oferty szkoleń i e-booków  
✅ Rejestracja i logowanie  
✅ Zakup szkoleń (PayU)  
✅ Dostęp do materiałów szkoleniowych  
✅ Śledzenie postępu  
✅ System osiągnięć  
✅ Quizy i projekty  
✅ Dashboard użytkownika  

### Dla Administratorów
✅ Zarządzanie użytkownikami  
✅ Przyznawanie dostępu do szkoleń  
✅ Zarządzanie treściami  
✅ Kody rabatowe  
✅ Przeglądanie zamówień  
✅ Reset haseł  

---

## 🏁 Podsumowanie

Projekt **mayiai** to profesjonalna platforma szkoleniowa zbudowana na nowoczesnym stacku technologicznym. Aplikacja jest gotowa do deployment po skonfigurowaniu zmiennych środowiskowych i rozwiązaniu kwestii przechowywania plików multimedialnych.

### Gotowość do deployment: 85%
**Brakujące elementy:**
- [ ] Konfiguracja zmiennych środowiskowych
- [ ] Optymalizacja plików multimedialnych
- [ ] Testy końcowe integracji PayU
- [ ] Backup & monitoring

**Czas szacowany do pełnego deployment: 2-3 godziny**

---

*Analiza wykonana automatycznie dnia 3 grudnia 2024*
