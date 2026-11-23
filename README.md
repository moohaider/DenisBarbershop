# Denis Barbershop

Website und (ab Phase 1) Online-Terminbuchung für **Denis Barbershop**, Dehnhaide 6, 22081 Hamburg.

- Projektregeln und Stack: [`CLAUDE.md`](CLAUDE.md)
- Produkt, UX, Architektur, Qualität, Roadmap: [`docs/`](docs)
- Entscheidungen: [`docs/adr/`](docs/adr)

## Stand

Phase 0: statische Startseite nach dem freigegebenen Prototyp (`docs/design/prototyp.html`). Termine laufen noch per Telefon, jeder „Termin“-Button öffnet einen Dialog mit der Nummer (ohne JavaScript ist er ein `tel:`-Link).

## Entwicklung

Node 22 oder neuer.

```bash
npm install
npm run dev          # http://localhost:5173
npm run check        # svelte-check + TypeScript
npm run lint         # Prettier + ESLint
npm run test         # Vitest (Unit)
npm run test:e2e     # Playwright inkl. axe (vorher einmal: npx playwright install)
npm run preview      # Build + wrangler dev auf http://localhost:4173
```

## Deployment

Cloudflare Workers Builds, verbunden mit diesem Repo, deployt jeden Push auf `main` (siehe `docs/adr/0003-deployment.md`):

| Feld           | Wert                  |
| -------------- | --------------------- |
| Build command  | `npm run build`       |
| Deploy command | `npx wrangler deploy` |
| Root directory | `/`                   |

Die Domain `denis-barbershop.de` wird im Cloudflare-Dashboard unter _Workers → denis-barbershop → Settings → Domains & Routes_ als Custom Domain hinzugefügt.
