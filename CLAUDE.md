# Denis Barbershop – Website mit Online-Terminbuchung

Website und Buchungssystem für **Denis Barbershop**, Dehnhaide 6, 22081 Hamburg (Barmbek).
Ein Salon, ein Barbier (Denis). Domain: `denis-barbershop.de` (registriert bei Strato, DNS bei Cloudflare).

Ziel der Website, in dieser Reihenfolge:
1. Neukunden aus der Umgebung gewinnen (lokale Google-Suche, Social Media, Empfehlungen).
2. Bestandskunden dazu bringen, ab sofort online zu buchen statt anzurufen.
3. No-Shows und leere Slots minimieren (Erinnerungen, Absage per WhatsApp, Warteliste).

## Pflichtlektüre vor jeder größeren Änderung

| Datei | Inhalt |
|---|---|
| `docs/01-produkt.md` | Geschäftsregeln: Leistungen, Öffnungszeiten, Mittwochs-Termine, Warteliste, No-Shows |
| `docs/02-ux-und-marketing.md` | Seitenaufbau, Buchungsablauf, CTAs, Texte, Design-Tokens, SEO |
| `docs/03-architektur.md` | Stack, Ordnerstruktur, Datenmodell, API, Integrationen, Slot-Logik |
| `docs/04-qualitaet.md` | Tests, CI, Sicherheit, Barrierefreiheit, Performance, DSGVO |
| `docs/05-roadmap.md` | Phasen mit Akzeptanzkriterien und offene Punkte |
| `docs/design/prototyp.html` | Freigegebener visueller Entwurf (Referenz für Look & Texte) |

Wenn eine Anforderung in den Docs fehlt oder widersprüchlich ist: nachfragen, nicht raten. Getroffene Entscheidungen in `docs/adr/` als kurzen ADR festhalten.

## Stack

- **SvelteKit 3 + Svelte 5 (Runes)** (siehe ADR-0002), TypeScript `strict`, `@sveltejs/adapter-cloudflare`, Deployment auf **Cloudflare Workers**
- **Cloudflare D1** (SQLite) mit **Drizzle ORM** und Drizzle-Migrationen
- **Tailwind CSS v4** mit den Design-Tokens aus `docs/02-ux-und-marketing.md`
- **Resend** (E-Mail), **WhatsApp Cloud API** (Kunden), **Telegram Bot API** (Benachrichtigung an Denis)
- **Cloudflare Turnstile** (Bot-Schutz), **Cloudflare Access** (Schutz von `/admin`)
- **Cron Triggers** für Erinnerungen, Warteliste, Bewertungs-Sync und Datenlöschung
- Tests: **Vitest** (Unit/Integration, `@cloudflare/vitest-pool-workers` für D1), **Playwright** (E2E + axe)

## Befehle

```bash
npm run dev            # Vite-Dev-Server
npm run preview        # Build + wrangler dev (echte Workers-Runtime, lokale D1)
npm run deploy         # Build + wrangler deploy (normalerweise über Workers Builds)
npm run check          # svelte-check + tsc
npm run lint           # ESLint + Prettier --check
npm run test           # Vitest
npm run test:e2e       # Playwright
npm run db:generate    # ab Phase 1: Drizzle-Migration aus Schema erzeugen
npm run db:migrate:local
npm run db:migrate:remote
```

Vor jedem Commit müssen `check`, `lint` und `test` grün sein.

Imports aus `src/lib` laufen über `#lib/...` mit Dateiendung, z. B. `import { business } from '#lib/content/business.ts'` (SvelteKit 3, siehe ADR-0002).

## Regeln für Code

- **Geschäftslogik ist rein und getestet.** Slot-Berechnung, Wartelisten-Vergabe, No-Show-Regeln, Zeitzonen liegen in `src/lib/server/domain/` als reine Funktionen ohne I/O. Jede Regel aus `docs/01-produkt.md` hat mindestens einen Test.
- **I/O nur über Adapter.** DB-Zugriff in `src/lib/server/repo/`, externe Dienste in `src/lib/server/integrations/` hinter Interfaces, damit sie in Tests ersetzt werden können.
- **Zeit:** In der DB immer UTC (`INTEGER`, Unix-Sekunden). Umrechnung nach `Europe/Berlin` nur an den Rändern (Anzeige, Eingabe). Sommerzeitwechsel ist ein Pflicht-Testfall.
- **Doppelbuchungen** verhindert die Datenbank über eindeutige Slot-Belegung (siehe `docs/03-architektur.md`), nicht der Anwendungscode allein.
- **Validierung** aller Eingaben mit **Zod** an jeder Grenze (Form Actions, API, Webhooks).
- **Keine Secrets im Code.** Lokal `.dev.vars`, produktiv `wrangler secret put`. `.dev.vars` steht in `.gitignore`.
- **Fehler** nie stumm schlucken. Nutzerfehler mit klarer deutscher Meldung, Systemfehler loggen (strukturiert, ohne personenbezogene Daten).
- **Personenbezogene Daten** (Name, E-Mail, Telefon) nie in Logs, URLs oder Analytics.
- **Progressive Enhancement:** Buchung muss über SvelteKit Form Actions auch ohne JavaScript funktionieren.
- **Barrierefreiheit:** WCAG 2.2 AA. Jede Komponente per Tastatur bedienbar, sichtbarer Fokus, Labels an allen Feldern.
- Kleine, fokussierte Commits nach **Conventional Commits** (`feat:`, `fix:`, `refactor:`, `test:`, `docs:`, `chore:`).

## Sprache und Texte

- UI-Texte auf **Deutsch, Du-Form**, kurz, freundlich, konkret. Keine Floskeln.
- Code, Bezeichner und Commit-Messages auf Englisch. Docs auf Deutsch.
- Alle UI-Texte liegen zentral in `src/lib/content/` (nicht verstreut in Komponenten).

## Was du nicht tun sollst

- Keine Bewertungen, Testimonials oder Zahlen erfinden. Platzhalter klar als Platzhalter kennzeichnen.
- Keine Tracking- oder Analytics-Skripte ohne Rücksprache (DSGVO, Cookie-Banner vermeiden).
- Keine Instagram-, TikTok- oder Google-Inhalte ohne vorherigen Klick des Besuchers laden (Zwei-Klick-Lösung).
- Keine neuen Abhängigkeiten ohne kurze Begründung im PR bzw. Commit.
