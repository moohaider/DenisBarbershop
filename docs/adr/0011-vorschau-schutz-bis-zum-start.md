# ADR-0011: Vorschau-Schutz bis zum Start

- Status: angenommen
- Datum: 2026-11-28

## Kontext
Die neue Website soll schon unter `denis-barbershop.de` laufen, aber bis zum Start nur für Mo und Denis sichtbar sein. Besucher sollen statt einer Login-Maske eine kleine Seite „Bald online“ mit Telefon und Adresse sehen. Verworfen:
- **Versteckte Adresse ohne Passwort:** schützt nicht, Links gelangen über Verläufe und Vorschaudienste nach außen.
- **Cloudflare Access:** Besucher sähen nur eine Cloudflare-Anmeldung statt eines Platzhalters.

## Entscheidung
- **Startseite:** `/` wird nicht mehr vorgerendert. `src/hooks.server.ts` prüft bei jedem Aufruf den Zugang. Ohne Zugang zeigt `/` den Platzhalter (`ComingSoon.svelte`), mit Zugang die echte Seite.
- **Öffentlich bleiben** nur `/`, `/impressum`, `/datenschutz` und der Login. Alle anderen Pfade leiten ohne Zugang auf `/` um.
- **Login unter `/vorschau`:** Der Browser fragt per Basic Auth nach dem Passwort, der Benutzername ist egal. Bei richtigem Passwort setzt der Server das Cookie `vorschau` (HttpOnly, SameSite=Lax, Secure, 30 Tage). Es enthält einen HMAC-SHA256 des Passworts. Ein neues Passwort macht alle alten Cookies ungültig.
- **Abmelden** unter `/vorschau/abmelden`.
- **Steuerung:**
  - `SITE_LOCKED` in `wrangler.jsonc`. Gesperrt ist alles außer `"false"` (fail closed).
  - Passwort als Secret `PREVIEW_PASSWORD` (`npx wrangler secret put PREVIEW_PASSWORD` oder Cloudflare-Dashboard), lokal in `.dev.vars`. Fehlt es, ist kein Login möglich.
- **Zwischenspeichern:** Antworten bekommen `Cache-Control: private, no-store`, weil Platzhalter und echte Seite dieselbe URL haben.
- **E2E-Tests:** Sie laufen mit einem eigenen Test-Passwort (`--var`) und schalten per Cookie frei. Der Schutz selbst ist ebenfalls getestet.

## Folgen
+ Die Seite kann unter der echten Domain getestet werden, ohne öffentlich zu sein.
+ Der Datenschutztext bleibt richtig: Besucher bekommen kein Cookie, nur wer sich unter `/vorschau` anmeldet.
- Ein Worker-Aufruf pro Seitenaufruf von `/`. Bei dieser Last vernachlässigbar.
- **Zum Start:**
  - `SITE_LOCKED` auf `"false"` setzen und `prerender` in `src/routes/+page.server.ts` wieder auf `true`.
  - Die Unterscheidung in `+page.svelte` entfernen, ebenso `ComingSoon.svelte`, `src/lib/content/preview.ts`, die Route `vorschau/` und die Prüfung im Hook. Die Sicherheits-Header im Hook bleiben.
- Das Passwort ist nur ein Sichtschutz für eine Vorschau, kein Schutz für Kundendaten. Für `/admin` gilt weiter Cloudflare Access (ADR-0001).
