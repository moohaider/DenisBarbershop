# ADR-0010: Farben Schwarz und Gold

- Status: angenommen (vorerst, Denis entscheidet endgültig)
- Datum: 2026-11-28
- Ersetzt den Abschnitt „Farben“ und die Kupfer-Regeln aus ADR-0005

## Kontext
Denis wünscht sich Schwarz und Gold statt der Brauntöne aus der Vorlage „Kupfer & Tabak“. Verglichen wurden eine helle Variante (Elfenbein-Grund, schwarze Säule) und eine dunkle (Schwarz auf der ganzen Seite). Die dunkle ist edler, lange Texte wie die Preisliste lesen sich darauf aber anstrengender. Reines Schwarz ergab 17:1 Kontrast, was hart wirkt.

## Entscheidung
- **Helle Variante.** Aufbau, Schriften, Barber-Pole und alles andere aus ADR-0005 bleiben.
- **Farben** (`src/routes/layout.css`):
  - Elfenbein `#f5f3ee` (Grund), Karten `#fdfcf9`, Chips `#e9e5dc`
  - Schwarz `#1f1d1a`, bewusst abgemildert auf 15,2:1 statt 17:1
  - Graphit `#5a564f` (Sekundärtext, 6,6:1)
  - Gold `#d4af37`
  - Dunkelgold `#9c7a22` (große Schrift, Linien, ≥ 3:1)
  - Textgold `#7a5d14` (kleine Schrift auf Hell, ≥ 4,9:1)
- **Gold als Fläche immer mit schwarzer Schrift** (9:1). Weiß auf Gold erreicht nur 2:1.
- Auf Hell nie `#d4af37` als Schrift, dort Dunkel- oder Textgold. Auf Schwarz ist `#d4af37` Schrift erlaubt.
- Token-Namen beschreiben die Farbe: `--color-paper`, `--color-black`, `--color-graphite`, `--color-gold`, `--color-gold-deep`, `--color-gold-text`.
- Favicon und `theme-color` folgen der Palette.

## Folgen
+ Wunsch des Kunden erfüllt, Lesbarkeit der langen Preisliste bleibt.
+ Ein späterer Wechsel auf die dunkle Variante betrifft nur die Tokens. Die Werte dafür stehen in der Vergleichsseite für Denis.
- Die Designvorlage `docs/design/vorlage-kupfer-tabak.html` ist für Farben nicht mehr maßgeblich, nur noch für Aufbau und Typografie.
