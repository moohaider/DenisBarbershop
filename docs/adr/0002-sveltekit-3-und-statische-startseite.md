# ADR-0002: SvelteKit 3 und statische Startseite in Phase 0

- Status: angenommen
- Datum: 2026-11-22

## Kontext

`CLAUDE.md` nennt SvelteKit 2. Beim Anlegen des Projekts ist SvelteKit 3 die aktuelle stabile Version, die der offizielle Generator (`sv create`) erzeugt. In Phase 0 gibt es noch keine Buchung, keine Datenbank und keine Integrationen.

## Entscheidung

- SvelteKit 3 (Svelte 5, Runes) statt 2. Alle übrigen Stack-Entscheidungen aus ADR-0001 bleiben.
- Alle Seiten werden in Phase 0 vorgerendert (`prerender = true` im Root-Layout) und von Cloudflare Workers Static Assets ausgeliefert. Sicherheits-Header kommen aus `_headers`, die CSP setzt SvelteKit als `<meta>`-Tag mit Hashes.
- D1, Drizzle, Zod, Resend usw. werden erst mit Phase 1 installiert, wenn sie gebraucht werden.
- Der Live-Status „Jetzt geöffnet“ wird im Browser berechnet. Die Logik liegt rein und getestet in `src/lib/domain/opening.ts` (nicht unter `server/`, weil sie auch im Client läuft).
- Schrift Archivo self-hosted als variable WOFF2-Dateien unter `static/fonts/` (Latin + Latin-Ext, deckt 400–800 ab, Lizenz OFL 1.1). Zwei feste Dateien statt eines npm-Pakets: weniger Abhängigkeiten, und die URL kann im `<head>` vorgeladen werden.

## Folgen

- Kein Worker-Aufruf pro Seitenaufruf, schnell und kostenlos.
- Neueste Version, kein Upgrade kurz nach dem Start.

* Ab Phase 1 müssen dynamische Routen (`/buchen`, `/termin/[token]`, `/admin`) `prerender = false` setzen, und die Header wandern zusätzlich in `hooks.server.ts`.
- Imports aus `src/lib` über `#lib/...` mit Dateiendung (`#lib/content/business.ts`), da SvelteKit 3 `$lib` durch Node-Subpath-Imports ersetzt.
