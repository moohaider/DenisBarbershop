---
name: zeit
description: Arbeitszeit aus Claude Code als CSV für die Zeiterfassungs-Seite ausgeben. Nutzen, wenn Mo /zeit eingibt, nach seiner Arbeitszeit fragt oder Feierabend macht.
allowed-tools: Bash(node .claude/hooks/timelog.mjs report:*)
---
Führe im Projektordner `node .claude/hooks/timelog.mjs report $ARGUMENTS` aus.

Gib danach die CSV-Ausgabe in **einem** Codeblock aus, damit Mo sie in die Zeiterfassungs-Seite (Abschnitt „Import aus Claude Code“) kopieren kann. Regeln:
- Datum, Start, Ende, Minuten und Quelle unverändert lassen.
- Die Spalte `taetigkeit` in wenigen Worten verständlich umformulieren (was in dem Block gemacht wurde), mit Hilfe dieser Sitzung und `git log`. Keine Kundendaten.
- Unter dem Codeblock eine Zeile mit der Summe.
- Gibt das Skript nur die Kopfzeile aus, sind noch keine Zeitstempel da: Dann prüfen, ob `.claude/settings.json` die Hooks enthält, und Mo sagen, dass er Claude Code einmal neu starten soll.

Beispiele: `/zeit` (alles), `/zeit --since 2026-11-24` (ab einem Datum).
