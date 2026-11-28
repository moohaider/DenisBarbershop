---
name: release
description: Änderungen prüfen, committen und live bringen (Cloudflare Workers Builds deployt main automatisch), danach die Live-Seite kontrollieren. Nutzen, wenn Mo etwas veröffentlichen, pushen oder deployen will.
---
# Release

Deployment läuft über Cloudflare Workers Builds (ADR-0003): Jeder Push auf `main` wird gebaut und deployt. Ein Push ist also ein Release. **Nie ohne ausdrückliches OK von Mo pushen.**

## 1. Prüfen (alles muss grün sein)
```bash
npm run check
npm run lint
npm run test:unit -- --run
npm run build
npx playwright test
```
Bei Fehlern: beheben oder Mo fragen, nicht überspringen. Bei sichtbaren Änderungen vorher den Skill `design-check` ausführen. Kamen neue Dienste oder Datenflüsse dazu: Skill `datenschutz-check`.

## 2. Vorbereiten
- `git status`: Keine Dateien wie `.dev.vars`, `*.zip`, `test-results/` oder `.claude/timelog/` im Commit.
- Ab Phase 1 mit D1: neue Migrationen zuerst lokal (`npm run db:migrate:local`) testen. Remote erst nach Mos OK (`npm run db:migrate:remote`), **vor** dem Push des Codes, der sie braucht.
- Commit nach Conventional Commits (`feat:`, `fix:`, `refactor:`, `docs:`, `chore:`), kurze Zusammenfassung auf Deutsch im Body.

## 3. Veröffentlichen
- Kleine Änderung: nach OK direkt auf `main` pushen.
- Größere Änderung: Branch pushen, die Preview-URL von Cloudflare prüfen, dann mergen.
- Danach im Cloudflare-Dashboard bzw. über `npx wrangler deployments list` prüfen, ob das Deployment durch ist.

## 4. Live-Kontrolle auf https://denis-barbershop.de
- Seite lädt (Status 200), Titel enthält „Barbershop Hamburg-Barmbek“, Überschrift sichtbar.
- `https://www.denis-barbershop.de` leitet auf die Hauptdomain bzw. funktioniert.
- Termin-Button öffnet den Dialog, „Jetzt anrufen“ zeigt auf `tel:+494078066616`.
- Keine Fehler in der Browser-Konsole, Impressum und Datenschutz erreichbar.

## 5. Abschluss
Kurze Meldung an Mo: was live ist, Commit-Hash, Ergebnis der Live-Kontrolle. Danach `/zeit` vorschlagen.
