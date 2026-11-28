# ADR-0007: Ein Cron-Trigger, Fälligkeit nach Ortszeit im Code

- Status: angenommen
- Datum: 2026-11-28

## Kontext
Cloudflare Cron Triggers laufen nur in UTC. Ein Job „täglich 18:00 Uhr in Hamburg“ müsste bei jeder Zeitumstellung angepasst werden. Außerdem ist die Zahl der Cron-Trigger je Konto begrenzt. Verworfen: je ein Trigger pro Job mit zwei UTC-Zeiten und Prüfung im Code (doppelte Konfiguration, leicht zu vergessen).

## Entscheidung
- In `wrangler.jsonc` steht **ein** Trigger: `"triggers": { "crons": ["*/5 * * * *"] }`.
- Der `scheduled`-Handler rechnet die Zeit nach `Europe/Berlin` um und fragt eine reine Funktion `dueJobs(localTime, lastRuns)` in `src/lib/server/domain/`, welche Jobs fällig sind (z. B. Erinnerungen ab 18:00, Nachtjobs ab 03:00, Warteliste bei jedem Lauf).
- Jeder Job ist idempotent und vermerkt seinen Lauf in der DB; verpasste Läufe werden beim nächsten Trigger nachgeholt.
- Sommerzeitwechsel ist Pflicht-Testfall für `dueJobs`.

## Folgen
+ Uhrzeiten stimmen ganzjährig, ohne Konfigurationsänderung.
+ Zeitplan ist Code und damit getestet.
- Der Worker läuft alle 5 Minuten, auch wenn nichts zu tun ist (bei dieser Last vernachlässigbar).
- Offen: `docs/01-produkt.md` nennt 18:00 für die Erinnerung, `docs/03-architektur.md` 17:00. Bis zur Klärung gilt 18:00.
