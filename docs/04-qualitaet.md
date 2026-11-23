# 04 – Qualität, Betrieb und Datenschutz

## Tests

| Ebene | Werkzeug | Was |
|---|---|---|
| Unit | Vitest | Alles in `server/domain/`: Slots, Raster, Ladenschluss, Vorlauf, Sperrzeiten, Sommerzeit (letzter So im März/Oktober), Warteliste-Matching, No-Show-Regeln. Ziel: 100 % Zweigabdeckung. |
| Integration | Vitest + `@cloudflare/vitest-pool-workers` | Repos gegen echte lokale D1, Doppelbuchung (zwei parallele Batches → genau einer gewinnt), Wartelisten-Claim-Race, Cron-Idempotenz, Webhook-Signaturen. |
| E2E | Playwright | Buchung Mittwoch komplett, Warteliste, Absage per Link, Admin-Grundfunktionen, No-JS-Buchung. Viewports: iPhone 13, Pixel 7, Desktop. |
| Barrierefreiheit | `@axe-core/playwright` | Jede Seite und jeder Buchungsschritt ohne Verstöße. |
| Visuell | Playwright Screenshots | Startseite, Sheet-Schritte (hell/dunkel-Bereiche). |

Testdaten über Factories, nie echte Kundendaten.

## CI (GitHub Actions)

Bei jedem Push/PR:
1. `npm ci`
2. `npm run check` · `npm run lint` · `npm run test`
3. `npm run build`
4. `npm run test:e2e` gegen `wrangler dev` mit lokaler D1 und Fake-Integrationen
5. Lighthouse CI (Budgets unten)

Auf `main`: Migrationen `remote` anwenden, danach `wrangler deploy`. Preview-Deployments für PRs.

## Performance-Budgets
- Lighthouse Mobile: Performance ≥ 95, Accessibility 100, Best Practices 100, SEO 100.
- LCP < 2,0 s (4G), CLS < 0,05, INP < 200 ms.
- JS auf der Startseite < 60 kB gzip. Schriften self-hosted, `font-display: swap`, nur benötigte Schnitte.
- Bilder: AVIF/WebP, responsive `srcset`, feste Seitenverhältnisse, Lazy Loading unterhalb des Hero.

## Barrierefreiheit (WCAG 2.2 AA)
- Dialog/Sheet: Fokus-Falle, `Esc` schließt, Fokus kehrt zum Auslöser zurück.
- Tagesleiste und Zeitraster als Radio-Gruppen (Pfeiltasten).
- Statusänderungen (Slot vergeben, Fehler) über `aria-live`.
- `prefers-reduced-motion` respektieren.

## Monitoring und Betrieb
- Workers Logs / Logpush, strukturierte Logs mit Request-ID, **ohne** personenbezogene Daten.
- Fehler-Alarm an Denis' Telegram nur für kritische Fälle (z. B. WhatsApp-Template abgelehnt, Cron fehlgeschlagen) – an Mo per E-Mail.
- Tägliches D1-Backup (Time Travel ist aktiv; zusätzlich wöchentlicher Export).
- Uptime-Check auf `/` und `/api/health`.

## Datenschutz (DSGVO)

> Keine Rechtsberatung. Vor dem Launch Impressum und Datenschutzerklärung prüfen lassen.

- **Rechtsgrundlagen:** Buchung, Bestätigung, Erinnerung = Vertragserfüllung (Art. 6 Abs. 1 lit. b). WhatsApp, „nächster Schnitt“, Bewertungsbitte = **Einwilligung** (Checkbox, nicht vorausgewählt außer WhatsApp bei Warteliste – prüfen), jederzeit widerrufbar per Link.
- **Auftragsverarbeitung (AVV):** Cloudflare, Resend, Meta (WhatsApp Business), Google, ggf. Stripe. Telegram: kein AVV → keine Kundendaten an Telegram.
- **Datensparsamkeit:** Nur Name, E-Mail, optional Telefon. Keine Geburtsdaten, keine Freitexte im Buchungsformular.
- **Löschfristen:** Termine und Wartelisten-Einträge 12 Monate nach dem Termin anonymisieren. Inaktive Kunden ohne Konto nach 24 Monaten löschen. Konto-Löschung sofort auf Wunsch.
- **Externe Inhalte:** Instagram, TikTok, Google Maps nur nach Klick (Zwei-Klick-Lösung). Bewertungen werden serverseitig geladen und ausgeliefert (keine Google-Requests aus dem Browser).
- **Keine Cookies** außer technisch notwendigen (Admin, später Konto-Session). Damit kein Cookie-Banner.
- „Daten auf diesem Gerät merken“ nutzt `localStorage`, nur nach Zustimmung (Checkbox), jederzeit löschbar.
- Impressum mit vollständigem Namen, Anschrift, Kontakt und ggf. USt-IdNr. von Denis.
