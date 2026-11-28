# ADR-0006: E-Mail als Pflichtkanal, WhatsApp als späterer Zusatz

- Status: angenommen
- Datum: 2026-11-28

## Kontext
Laut Roadmap hängen Erinnerung, Absage und Wartelisten-Angebot in Phase 2 an der WhatsApp Cloud API. Dafür braucht es Meta-Business-Verifizierung, eine eigene Nummer, freigegebene Templates und einen Webhook; jede Nachricht kostet Geld. Bis das steht, wäre Phase 2 blockiert. Verworfen: SMS (kostet ebenfalls pro Nachricht, kein Mehrwert gegenüber E-Mail).

## Entscheidung
- **Jeder Ablauf funktioniert vollständig per E-Mail:** Bestätigung, Erinnerung am Vortag mit Links „Ich komme“ / „Absagen“, Wartelisten-Angebot mit Bestätigungslink.
- **WhatsApp ist ein Zusatzkanal** (Opt-in) und ein eigener Schritt am Ende von Phase 2. Phase 2 gilt ohne WhatsApp als fertig, wenn eine Absage per E-Mail-Link den Slot freigibt und die Warteliste innerhalb von 1 Minute ein Angebot erhält.
- Benachrichtigungen laufen über ein Interface `Notifier` mit Kanälen `email` und später `whatsapp`; die Wahl des Kanals ist reine, getestete Logik.

## Folgen
+ Phase 2 hängt nicht an der Freigabe durch Meta, keine Kosten pro Nachricht.
+ Der WhatsApp-Kanal kommt später dazu, ohne Abläufe umzubauen.
- E-Mails werden seltener gelesen als WhatsApp; ob die No-Show-Quote damit reicht, zeigt erst der Betrieb.
