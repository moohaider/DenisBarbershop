# 03 – Architektur

## Überblick

```
Browser ──► Cloudflare Worker (SvelteKit, SSR + Form Actions + API)
                 │
                 ├── D1 (Daten)
                 ├── Cron Triggers (Erinnerungen, Warteliste, Sync, Löschfristen)
                 ├── Brevo (E-Mail)
                 ├── WhatsApp Cloud API (Kunden) ◄── Webhook (Button-Antworten)
                 ├── Telegram Bot API (Denis)    ◄── Webhook (Inline-Buttons)
                 ├── Google Places API (Bewertungen, 1×/Tag)
                 └── Turnstile (Bot-Schutz)
/admin/* ── geschützt durch Cloudflare Access (JWT wird im Worker zusätzlich geprüft)
```

Alles läuft in **einem** SvelteKit-Projekt. Eine separate API (Hono o. ä.) ist nicht nötig.

## Ordnerstruktur

```
src/
  lib/
    content/              # alle UI-Texte, Leistungen-Seed, SEO-Texte
    components/           # UI-Komponenten (Button, Sheet, DayStrip, TimeGrid, …)
    booking/              # Client-State des Buchungsablaufs (Svelte 5 Runes)
    server/
      domain/             # REINE Geschäftslogik, keine I/O, 100 % getestet
        slots.ts          # freie Slots berechnen
        waitlist.ts       # Matching + Vergabe
        noshow.ts         # Regeln für Anzahlung/Sperre
        time.ts           # Europe/Berlin <-> UTC, Raster
      repo/               # Drizzle-Zugriffe (bookings, customers, waitlist, …)
      integrations/       # brevo.ts, whatsapp.ts, telegram.ts, google.ts, turnstile.ts (+ Fakes)
      jobs/               # Cron-Jobs, jeweils idempotent
      auth/               # Access-JWT-Prüfung, Tokens (HMAC)
      db/schema.ts        # Drizzle-Schema
  routes/
    +page.svelte          # Startseite
    buchen/               # No-JS-Fallback des Ablaufs
    termin/[token]/       # Termin ansehen/absagen
    warteliste/[token]/   # Platz bestätigen
    impressum/ datenschutz/
    admin/                # Tages-/Wochenansicht, Kunden, Einstellungen
    api/
      slots/+server.ts    # GET freie Slots (gecacht, kurz)
      webhooks/whatsapp/+server.ts
      webhooks/telegram/+server.ts
  hooks.server.ts         # Security-Header, Admin-Schutz, Request-ID
migrations/               # Drizzle/D1-Migrationen
tests/                    # E2E (Playwright)
docs/
```

## Datenmodell (D1 / SQLite)

Alle Zeitstempel `INTEGER` (Unix-Sekunden, UTC). IDs als ULID (`TEXT`).

```sql
staff            (id, name, active)
service          (id, category, name, duration_min, price_cents, sort, active)
opening_hours    (staff_id, weekday, opens_min, closes_min)        -- Minuten ab 00:00 lokal
booking_rule     (staff_id, weekday, mode)                         -- 'slots' | 'waitlist' | 'closed'
time_off         (id, staff_id, starts_at, ends_at, reason)

customer         (id, name, email_norm UNIQUE, phone_e164, created_at,
                  opt_whatsapp, opt_rebook_weeks, opt_review, note,
                  no_show_count, late_cancel_count, blocked, deleted_at)

booking          (id, staff_id, service_id, customer_id, starts_at, ends_at,
                  status,            -- 'confirmed' | 'cancelled' | 'late_cancelled' | 'no_show' | 'completed'
                  source,            -- 'web' | 'admin' | 'waitlist'
                  utm_source, manage_token_hash, created_at, cancelled_at)

booking_slot     (staff_id, slot_start, booking_id,
                  PRIMARY KEY (staff_id, slot_start))               -- verhindert Überschneidungen

waitlist_entry   (id, staff_id, service_id, customer_id, day_local,  -- 'YYYY-MM-DD'
                  window,            -- 'morning' | 'midday' | 'evening' | 'any'
                  status,            -- 'waiting' | 'offered' | 'booked' | 'expired' | 'cancelled'
                  created_at)

waitlist_offer   (id, slot_start, service_id, token_hash, expires_at, claimed_by_entry_id)

notification_log (id, kind, channel, ref_id, sent_at, provider_id, status)   -- Idempotenz
review_cache     (id, author, rating, text, relative_time, fetched_at)
place_summary    (rating, user_rating_count, fetched_at)
metric_daily     (day, key, count, PRIMARY KEY (day, key))                    -- anonyme Zähler
```

### Doppelbuchungen verhindern
- Raster 15 Minuten. Ein Termin von 45 Minuten belegt 3 Zeilen in `booking_slot`.
- Buchen = **ein D1-Batch** (transaktional): `INSERT booking` + `INSERT booking_slot` je Einheit.
- Kollidiert eine Einheit, schlägt der Primary Key fehl, der ganze Batch wird zurückgerollt → Fehler „Zeit gerade vergeben“ + Alternativen.
- Absage löscht die `booking_slot`-Zeilen im selben Batch, in dem der Status gesetzt wird.

### Wartelisten-Vergabe
- Bei Freiwerden: `waitlist.match(slotStart, freeMinutes, entries)` (rein) liefert passende Einträge.
- Ein `waitlist_offer` mit Token wird erzeugt, alle Kandidaten werden benachrichtigt.
- Bestätigung = Batch: `UPDATE waitlist_offer SET claimed_by_entry_id=? WHERE id=? AND claimed_by_entry_id IS NULL` + Buchung wie oben. Nur der erste gewinnt.

## Tokens und Links
- Verwaltungs- und Wartelisten-Links enthalten zufällige Tokens (32 Byte, base64url). In der DB nur der **SHA-256-Hash**.
- Wartelisten-Token 2 h gültig, Termin-Token bis zum Termin + 7 Tage.

## Integrationen

| Dienst | Zweck | Hinweise |
|---|---|---|
| Brevo (ADR-0009) | Transaktionsmails | Absender `termine@denis-barbershop.de`, Domain per DNS (SPF/DKIM/DMARC) verifizieren. Secret `BREVO_API_KEY`. Templates in `src/lib/content/mail/`. |
| WhatsApp Cloud API | Erinnerung, Warteliste (Zusatzkanal, ADR-0006) | Eigene Nummer, Meta-Business-Konto, freigegebene Templates mit Quick-Reply-Buttons. Webhook mit Signaturprüfung (`X-Hub-Signature-256`). |
| Telegram Bot API | Denis | Nur Denis' Chat-ID erlaubt. Inline-Buttons „Öffnen“. Keine Kundennamen. |
| Google Places API (New) | Bewertungen | Place Details 1×/Tag per Cron, Feldmaske nur `rating,userRatingCount,reviews`. Attribution „Bewertungen von Google“ anzeigen. |
| Turnstile | Bot-Schutz | Unsichtbar im Buchungsformular, serverseitig prüfen. |
| Cloudflare Access | Admin | Zusätzlich `Cf-Access-Jwt-Assertion` im Worker verifizieren. |
| Stripe Checkout | Anzahlung (Phase 3) | Nur für markierte Kunden. Webhook mit Signatur. |

Alle Integrationen implementieren ein Interface und haben einen **Fake** für Tests und lokale Entwicklung (`INTEGRATIONS=fake` in `.dev.vars`).

## Cron-Jobs

Ein einziger Trigger alle 5 Minuten (`wrangler.jsonc` → `triggers.crons: ["*/5 * * * *"]`). Welche Jobs fällig sind, entscheidet die reine Funktion `dueJobs()` nach Ortszeit `Europe/Berlin` (ADR-0007).

| Fällig (Ortszeit) | Job |
|---|---|
| alle 5 min | abgelaufene Wartelisten-Angebote schließen, nächste Kandidaten benachrichtigen |
| täglich ab 18:00 | Erinnerungen für morgen (Uhrzeit laut `docs/01-produkt.md`) |
| stündlich | Bewertungsbitten (2 h nach Termin, Opt-in) |
| täglich 03:00 lokal | „Zeit für den nächsten Schnitt“, Google-Sync, Löschfristen |

Jeder Job ist **idempotent** (prüft `notification_log`) und darf doppelt laufen.

## Sicherheit
- Security-Header in `hooks.server.ts`: CSP (strikt, Nonces), HSTS, `X-Content-Type-Options`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy`.
- Rate-Limiting für Buchen und Webhooks (Cloudflare Rate Limiting Rules oder Durable Object/KV-Zähler).
- Admin-Routen: Access + JWT-Prüfung + CSRF (SvelteKit Standard).
- Webhooks: Signatur prüfen, sonst 401.
