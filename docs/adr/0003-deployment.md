# ADR-0003: Deployment über Cloudflare Workers Builds

- Status: angenommen
- Datum: 2026-11-22

## Kontext

`docs/04-qualitaet.md` sieht ein Deployment aus der CI vor. Dafür bräuchte GitHub Actions ein Cloudflare-API-Token als Secret.

## Entscheidung

Cloudflare Workers Builds (Git-Anbindung im Cloudflare-Dashboard) baut und deployt jeden Push auf `main`:

- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`

GitHub Actions prüft parallel `check`, `lint`, Unit-Tests, Build und E2E.

## Folgen

- Keine API-Tokens in GitHub nötig.

* Ein Push auf `main` wird deployt, auch wenn die CI rot ist. Sobald D1-Migrationen dazukommen (Phase 1), Deployment in die CI verlegen (`wrangler d1 migrations apply --remote` vor `wrangler deploy`) und Workers Builds abschalten.
