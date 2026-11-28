---
name: leistung-aendern
description: Eine Leistung des Barbershops anlegen, umbenennen, entfernen oder Preis bzw. Dauer ändern, überall konsistent. Nutzen, wenn Mo sagt, dass sich Preise, Leistungen oder Dauern ändern.
---
# Leistung ändern

Ziel: Eine Änderung an Leistungen landet an **allen** Stellen, und nichts widerspricht sich (Website, Google-Daten, Tests, Doku).

## 1. Klären
Frag nach, falls etwas fehlt: Name, Kategorie (`Haarschnitte`, `Bart & Rasur`, `Kombi-Angebote`, `Gesicht & Beauty`), Preis in Euro, Dauer in Minuten, Kurzbeschreibung. Dauer und Beschreibung nie raten: Wenn Denis sie nicht genannt hat, nachfragen.

## 2. Ändern
1. `src/lib/content/services.ts`
   - `id`: englisch, kebab-case, eindeutig und stabil. Bei Umbenennung die `id` **nicht** ändern (ab Phase 1 hängen Buchungen daran).
   - `priceCents` als Ganzzahl in Cent (14,50 € = `1450`).
   - `description`: ein sachlicher Satz in Du-Form, keine Werbefloskeln.
   - Reihenfolge innerhalb der Kategorie: nach Preis aufsteigend.
2. Abgeleitete Texte prüfen. Suche nach Preisen und Leistungsnamen:
   `grep -rn "€\|ab [0-9]" src/lib/content` sowie den alten Namen in `src` und `tests`.
   Typische Stellen: `home.ts` (`seo.description`, `hero.rows.pricesValue`, `lookbook`), Fakten wie „Haarschnitt ab 14 €“.
3. `src/lib/seo/structured-data.ts` berechnet `priceRange` automatisch. Nur prüfen, nicht ändern.
4. `docs/01-produkt.md`: Tabelle „Leistungen und Preise“ aktualisieren.
5. Ab Phase 1 (D1 vorhanden): Seed bzw. Migration für die Tabelle `service` anpassen (Skill `release` beachten).

## 3. Tests
- `src/lib/content/services.spec.ts` anpassen, wenn sich die günstigsten Preise je Kategorie ändern.
- `tests/home.e2e.ts` nutzt die Namen „Maschinenschnitt“, „Bartrasur“ und „Waschen, Schneiden, Epilieren & Model-Rasur“. Bei Umbenennung mitziehen.
- Ausführen: `npm run check`, `npm run test:unit -- --run`, danach `npx playwright test --project=desktop`.

## 4. Abschluss
Kurze Zusammenfassung an Mo: was sich geändert hat (alt → neu), welche Dateien, Teststatus. Commit-Vorschlag: `feat(prices): …` bzw. `fix(prices): …`. Nicht selbst pushen.
