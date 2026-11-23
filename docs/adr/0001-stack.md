# ADR-0001: SvelteKit auf Cloudflare Workers mit D1

- Status: angenommen
- Datum: 2026-11-22

## Kontext
Ein Salon, ein Mitarbeiter, geringe Last, Mo kennt Cloudflare. Laufende Kosten sollen gegen null gehen.

## Entscheidung
SvelteKit (Svelte 5, TypeScript) mit adapter-cloudflare auf Workers, D1 mit Drizzle, Cloudflare Access fuer Admin. Keine Fertigloesung (Fresha, Calendly), kein Lovable/Supabase.

## Folgen
+ Eine Codebasis fuer Frontend, API und Jobs, praktisch keine Hosting-Kosten.
- Eigenverantwortung fuer Doppelbuchungen, Zeitzonen, DSGVO; deshalb strikte Tests (siehe docs/04-qualitaet.md).
