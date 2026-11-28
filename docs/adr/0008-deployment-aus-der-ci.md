# ADR-0008: Deployment aus der CI ab der ersten D1-Migration

- Status: angenommen
- Datum: 2026-11-28
- Ersetzt ADR-0003 ab Phase 1

## Kontext
Workers Builds deployt jeden Push auf `main`, auch bei roter CI (ADR-0003). Sobald D1-Migrationen dazukommen, müssen Tests, Migration und Deployment in fester Reihenfolge laufen, sonst trifft neuer Code auf ein altes Schema.

## Entscheidung
- Mit der ersten Migration bekommt `.github/workflows/ci.yml` einen Job `deploy`, der nur auf `main` und nur nach grünem `check`, `lint`, `test`, Build und E2E läuft:
  1. `npx wrangler d1 migrations apply DB --remote`
  2. `npx wrangler deploy`
- Migrationen sind nur additiv (neue Tabellen/Spalten), damit die laufende Version während des Deployments weiter funktioniert.
- GitHub-Secrets: `CLOUDFLARE_API_TOKEN` (nur Rechte für Workers und D1 dieses Kontos) und `CLOUDFLARE_ACCOUNT_ID`.
- Danach wird die Git-Anbindung von Workers Builds im Cloudflare-Dashboard getrennt.

## Folgen
+ Rote CI geht nicht mehr live, Schema und Code passen immer zusammen.
- Ein API-Token liegt in GitHub; bei Verdacht sofort im Cloudflare-Dashboard widerrufen.
- Deployment dauert länger, weil es auf die E2E-Tests wartet.
