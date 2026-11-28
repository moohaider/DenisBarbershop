---
name: datenschutz-check
description: Prüfen, ob eine Änderung Datenschutz und DSGVO berührt, und Datenschutzerklärung, Einwilligungen und Logs anpassen. Nutzen, wenn ein externer Dienst, ein neues Formularfeld, eine Einbettung, Cookies, Speicherung oder Tracking dazukommt.
---
# Datenschutz-Check

Grundlage: Abschnitt „Datenschutz (DSGVO)“ in `docs/04-qualitaet.md`. Keine Rechtsberatung: Unklare Punkte als offene Frage an Mo markieren, vor dem Launch prüft ein Anwalt.

## 1. Datenflüsse finden
- Externe Hosts: `grep -rnE "https?://" src --include=*.ts --include=*.svelte` (fetch, Skripte, iframes, Bilder).
- Neue Secrets oder Dienste in `wrangler.jsonc`, `.dev.vars.example`, `src/lib/server/integrations/`.
- Neue Formularfelder, `localStorage`, Cookies, Logs.

## 2. Für jeden Datenfluss klären
| Frage | Beispiel |
|---|---|
| Welche Daten? | Name, E-Mail, Telefon, IP |
| Wozu? | Terminbestätigung |
| Rechtsgrundlage? | Vertrag (Art. 6 Abs. 1 lit. b), Einwilligung (lit. a), berechtigtes Interesse (lit. f) |
| Vertrag zur Auftragsverarbeitung (AVV)? | Cloudflare, Brevo, Meta, Google: ja. Telegram: nein, daher keine Kundendaten an Telegram |
| Übermittlung in Drittland? | USA über EU-US Data Privacy Framework |
| Löschfrist? | siehe `docs/04-qualitaet.md` |

## 3. Umsetzen
- `src/routes/datenschutz/+page.svelte`: eigenen Abschnitt je Dienst ergänzen. Fehlende Angaben als `<span class="todo">[…]</span>`.
- Einbettungen (Instagram, TikTok, Karten) nur über `ConsentEmbed` (Zwei-Klick).
- Werbliche Nachrichten (Erinnerung „nächster Schnitt“, Bewertungsbitte, WhatsApp bei Warteliste) nur mit nicht vorausgewählter Checkbox plus Abmeldelink.
- Keine personenbezogenen Daten in Logs, URLs, Fehlermeldungen oder an Telegram. Prüfen mit `grep -rn "console\.\(log\|error\)" src`.
- `localStorage` nur nach Zustimmung des Nutzers.
- Test in `tests/home.e2e.ts` („loads nothing … before consent“) um neue Hosts erweitern.

## 4. Ergebnis
Tabelle der Datenflüsse für Mo, geänderte Dateien, offene Fragen (z. B. „AVV mit Brevo abschließen“).
