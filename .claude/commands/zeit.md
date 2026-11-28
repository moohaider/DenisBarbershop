---
description: Arbeitszeit aus Claude Code als CSV für die Zeiterfassung ausgeben
allowed-tools: Bash(node .claude/hooks/timelog.mjs report:*)
---
Führe `node .claude/hooks/timelog.mjs report $ARGUMENTS` aus.

Gib danach die CSV-Ausgabe in **einem** Codeblock aus, damit ich sie in die Zeiterfassungs-Seite (Abschnitt „Import aus Claude Code“) kopieren kann. Regeln:
- Datum, Start, Ende, Minuten und Quelle unverändert lassen.
- Die Spalte `taetigkeit` darfst du in wenigen Worten verständlich umformulieren (was in dem Block gemacht wurde, z. B. „Phase 1: Slot-Berechnung und Tests“). Nutze dafür, was du aus dieser Sitzung und `git log` über den Zeitraum weißt. Keine Kundendaten.
- Unter dem Codeblock eine Zeile mit der Summe.

Beispiele: `/zeit` (alles), `/zeit --since 2026-11-24` (ab einem Datum).
