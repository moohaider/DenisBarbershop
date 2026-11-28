---
name: adr
description: Eine Architektur- oder Designentscheidung als ADR in docs/adr festhalten. Nutzen, wenn eine Entscheidung getroffen wurde (Technik, Design, Dienst, Ablauf) oder eine frühere Entscheidung ersetzt wird.
---
# ADR schreiben

## 1. Nummer und Datei
- Nächste Nummer = höchste vorhandene in `docs/adr/` + 1, vierstellig (`0006`). Lücken nicht auffüllen.
- Dateiname: `docs/adr/NNNN-kurzer-titel-in-kebab-case.md`, Titel auf Deutsch.

## 2. Format (wie die bestehenden ADRs)
```markdown
# ADR-NNNN: Titel

- Status: angenommen
- Datum: JJJJ-MM-TT

## Kontext
Warum steht die Entscheidung an? Welche Vorgaben, Probleme, Optionen?

## Entscheidung
Was gilt ab jetzt? Konkret, mit Werten, Namen und Befehlen.

## Folgen
+ Vorteile
- Nachteile, offene Punkte
```
Kurz halten (unter einer Seite), Deutsch, keine Floskeln. Verworfene Alternativen in einem Satz unter „Kontext“ nennen.

## 3. Ersetzte Entscheidungen
Ersetzt der neue ADR einen alten: im alten den Status auf `ersetzt durch ADR-NNNN` ändern, im neuen `ersetzt ADR-XXXX` ergänzen.

## 4. Verweise nachziehen
Prüfen, ob `CLAUDE.md`, `docs/02-ux-und-marketing.md`, `docs/03-architektur.md` oder Kommentare im Code auf die Entscheidung verweisen sollten, und dort kurz ergänzen.
