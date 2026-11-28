---
name: design-check
description: Eine Oberflächenänderung gegen die Kundenvorlage (Aufbau Kupfer & Tabak, Farben Schwarz & Gold) prüfen, mit Screenshots auf Desktop und Handy. Nutzen nach jeder sichtbaren Änderung an Komponenten oder CSS und bevor ein Design-Thema als fertig gilt.
---
# Design-Check

Maßstab ist **die Vorlage des Kunden**, nicht ein allgemeiner Geschmack:
- `docs/design/vorlage-kupfer-tabak.html` (maßgeblich für Aufbau und Typografie, nicht mehr für Farben)
- `docs/adr/0005-stil-kupfer-und-tabak.md` (Aufbau), `docs/adr/0010-farben-schwarz-und-gold.md` (Farben) und Abschnitt „Design-Tokens“ in `docs/02-ux-und-marketing.md`
- Tokens in `src/routes/layout.css`

Weiche nie eigenmächtig von der Vorlage ab, um etwas „eigenständiger“ oder „moderner“ zu machen. Abweichungen nur mit Mos Zustimmung und dann als ADR.

## 1. Screenshots
1. `npm run preview` im Hintergrund starten (Port 4173).
2. `node .claude/skills/design-check/shoot.mjs` ausführen (optional mit Pfaden, z. B. `/ /impressum`).
   Ergebnis in `test-results/design-check/`: jede Seite auf Desktop (1280 px), iPhone 13 und Pixel 7, dazu die Vorlage zum Vergleich.
3. Die Bilder ansehen und mit der Vorlage vergleichen.

## 2. Checkliste
- **Farben:** nur über Tokens. `grep -rnE "#[0-9a-fA-F]{3,8}\b" src/lib/components src/routes --include=*.svelte` darf keine neuen Farbwerte zeigen (Ausnahme: WhatsApp-Vorschau).
- **Schrift:** Überschriften und Preise Bodoni Moda, Text DM Sans. Keine externen Schriften (Google Fonts) einbinden.
- **Aufbau wie Vorlage:** dunkle Säule links und Leistungskarten rechts, Rubriken klein in Großbuchstaben, Karten mit feinem Goldrand, Buttons mit 12 px Radius.
- **Kontrast:** `npx playwright test -g "axe"` muss grün sein. Gold `#d4af37` nie als Schrift auf Hell, dort `--color-gold-deep` (große Schrift) bzw. `--color-gold-text`. Goldflächen immer mit schwarzer Schrift.
- **Handy:** kein horizontales Scrollen bei 390 px, Tippflächen mindestens 44 × 44 px, die feste Leiste unten verdeckt nichts.
- **Bewegung:** Animationen respektieren `prefers-reduced-motion`.
- **Inhalte:** keine erfundenen Bewertungen, Noten, „Beliebt“-Abzeichen oder Zahlen.

## 3. Ergebnis
Liste für Mo: was passt, was abweicht (mit `Datei:Zeile` und Screenshot-Pfad), Vorschlag zur Korrektur. Nur Abweichungen von der Vorlage korrigieren, keine neuen Designideen einbauen.
