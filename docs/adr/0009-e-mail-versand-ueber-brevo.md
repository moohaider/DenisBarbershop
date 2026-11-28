# ADR-0009: E-Mail-Versand über Brevo

- Status: angenommen
- Datum: 2026-11-28

## Kontext
E-Mail ist der Pflichtkanal für Bestätigung, Erinnerung und Warteliste (ADR-0006). Ein Worker kann Mails nicht selbst zustellen, es braucht einen Versanddienst. Vorgabe: zum Start 0 € Kosten, Daten möglichst in der EU. Erwartet werden grob 500–1.000 Mails im Monat (Schätzung). Verglichen wurden:
- **Resend:** kostenlos, aber Datenspeicherung in den USA.
- **Scaleway TEM und Lettermint:** in der EU, aber nur 300 Mails im Monat frei.
- **Cloudflare Email Sending:** Beta, im Free-Plan nur an bestätigte eigene Adressen.

## Entscheidung
- Transaktionsmails gehen über die **Brevo Transactional Email API** (HTTPS, `fetch` aus dem Worker), Free-Plan mit 300 Mails pro Tag.
- Absender `termine@denis-barbershop.de`, Domain bei Brevo per DNS in Cloudflare verifizieren (SPF, DKIM, DMARC).
- API-Schlüssel als Secret `BREVO_API_KEY` (`wrangler secret put`), lokal in `.dev.vars`.
- Umsetzung in `src/lib/server/integrations/brevo.ts` hinter dem `Notifier`-Interface (ADR-0006), mit Fake für Tests.
- Ersetzt den bisher geplanten Dienst Resend (`CLAUDE.md`, `docs/03-architektur.md`).

## Folgen
+ Kein Monatsbeitrag, keine Kreditkarte, Server in der EU.
+ Anbieterwechsel betrifft nur `brevo.ts`.
- Vor dem Start prüfen: AVV abschließen und dessen Anhang 2 (Unterauftragsverarbeiter, laut einem Prüfdienst mindestens einer in den USA) lesen; klären, ob der Free-Plan ein Brevo-Logo in Transaktionsmails einfügt.
- Brevo ist vor allem eine Marketing-Plattform; Kontakte dürfen dort nicht für Newsletter landen.
