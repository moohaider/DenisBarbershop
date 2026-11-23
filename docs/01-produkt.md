# 01 – Produkt und Geschäftsregeln

## Betrieb

| | |
|---|---|
| Name | Denis Barbershop |
| Adresse | Dehnhaide 6, 22081 Hamburg (Barmbek) |
| Telefon | 040 78066616 |
| Instagram | @denisbarbershop6 |
| TikTok | **offen** (Handle bestätigen) |
| Google | **offen** (Place ID ermitteln) |
| Öffnungszeiten | Mo–Sa 09:00–20:00, So geschlossen |
| Mitarbeiter | 1 (Denis). Datenmodell trotzdem mehrere Mitarbeiter-fähig. |

## Zielgruppen

1. **Neukunden aus Barmbek, Uhlenhorst, Winterhude, Eilbek**: finden den Laden über Google Maps, Instagram, TikTok oder Empfehlung. Wollen sofort sehen: Preis, Qualität (Fotos, Bewertungen), wann frei ist.
2. **Stammkunden**: kommen seit Jahren, rufen an oder kommen spontan. Sollen ab sofort online buchen. Brauchen: maximal schnelles Wiederbuchen, Erinnerungen.
3. **Eltern** (Kinderhaarschnitt bis 8 Jahre): wollen planbare Termine.
4. **Denis**: will so wenig Verwaltung wie möglich, Benachrichtigungen aufs Handy, keine leeren Slots.

## Leistungen und Preise

Dauer (`min`) ist eine **Schätzung** und muss mit Denis abgestimmt werden.

| Kategorie | Leistung | Preis | Dauer |
|---|---|---|---|
| Haarschnitte | Maschinenschnitt | 14 € | 20 |
| Haarschnitte | Kinderhaarschnitt bis 8 Jahre | 15 € | 20 |
| Haarschnitte | Trockenhaarschnitt | 18 € | 30 |
| Haarschnitte | Waschen & Schneiden | 20 € | 30 |
| Bart & Rasur | Bartrasur | 15 € | 20 |
| Bart & Rasur | Model-Rasur | 18 € | 20 |
| Kombi-Angebote | Trockenhaarschnitt & Epilieren | 20 € | 30 |
| Kombi-Angebote | Waschen, Schneiden & Epilieren | 22 € | 40 |
| Kombi-Angebote | Schneiden & Rasur | 32 € | 45 |
| Kombi-Angebote | Waschen, Schneiden, Epilieren & Model-Rasur | 35 € | 60 |
| Gesicht & Beauty | Gesichts-Haarentfernung (Wachs) | 5 € | 10 |
| Gesicht & Beauty | Augenbrauen in Form zupfen | 8 € | 10 |
| Gesicht & Beauty | Beauty-Paket | 49 € | 60 |

Preise und Leistungen sind im Admin pflegbar (nicht hart codiert). Bezahlung im Laden.

## Terminmodell

### Feste Termine: nur mittwochs
- Mittwochs von 09:00 bis 20:00 buchbar, Raster **15 Minuten**.
- Ein Termin belegt so viele Raster-Einheiten, wie die Dauer der Leistung verlangt (aufgerundet).
- Ende eines Termins darf nicht nach Ladenschluss liegen.
- Frühester Termin: jetzt + **60 Minuten** Vorlauf. Spätester: **4 Wochen** im Voraus (konfigurierbar).
- Pausen, Urlaub und Sperrzeiten pflegt Denis im Admin; sie blockieren Slots.

### Digitale Warteliste: Mo, Di, Do, Fr, Sa
- Kunde wählt Tag, Leistung und **Zeitfenster**: Vormittag (9–12), Mittag (12–16), Abend (16–20) oder „egal“.
- Optional WhatsApp-Benachrichtigung (Checkbox, Handynummer dann Pflicht). E-Mail immer.
- Ein Wartelisten-Eintrag ist **kein** Termin.
- Wird ein Platz frei (Absage) oder gibt Denis einen Platz frei, werden **alle passenden** Einträge gleichzeitig benachrichtigt (gleicher Tag, Zeitfenster passt, Leistung passt in die Lücke).
- **Wer zuerst bestätigt, bekommt den Termin.** Bestätigungslink ist ein einmaliger Token, 2 Stunden gültig. Alle anderen sehen „Leider schon vergeben, du bleibst auf der Liste“.
- Einträge verfallen automatisch am Ende des gewünschten Tages.
- Später optional: Warteliste auch für ausgebuchte Mittwoche.

### Absage und Umbuchung
- Kostenlos bis **24 Stunden** vorher, per Link in der E-Mail oder WhatsApp-Button.
- Absagen innerhalb von 24 Stunden sind immer möglich, werden aber als **späte Absage** markiert.
- Jede Absage löst sofort die Wartelisten-Benachrichtigung aus (siehe oben) und eine Telegram-Nachricht an Denis.

### No-Shows
- Denis markiert im Admin „Nicht erschienen“.
- Zuordnung des Kunden über normalisierte E-Mail **oder** Telefonnummer (E.164).
- Regel (konfigurierbar): ab **2 No-Shows** oder **3 späten Absagen** in 12 Monaten → Kunde muss beim nächsten Mal eine **Anzahlung von 10 €** leisten (Stripe Checkout, mit Preis verrechnet, bei rechtzeitiger Absage erstattet). Phase 3.
- Alternativ kann Denis einen Kunden sperren.

## Benachrichtigungen

| Ereignis | Kunde | Denis |
|---|---|---|
| Buchung | E-Mail-Bestätigung mit Absage-Link + .ics | Telegram |
| Vortag 18:00 | WhatsApp-Erinnerung mit Buttons „Ich komme“ / „Absagen“ (falls Nummer), sonst E-Mail | – |
| Absage | E-Mail-Bestätigung | Telegram |
| Platz frei (Warteliste) | WhatsApp + E-Mail mit Bestätigungslink | – |
| Wartelisten-Platz vergeben | E-Mail-Bestätigung | Telegram |
| „Zeit für den nächsten Schnitt“ | Nur mit Opt-in, nach gewähltem Intervall (2/3/4 Wochen), mit Abmeldelink | – |
| Bewertungsbitte | Nur mit Opt-in, 2 Stunden nach dem Termin, einmalig | – |

Telegram-Nachrichten an Denis enthalten **keine Kundennamen** (keine AV-Vereinbarung mit Telegram), nur Zeit, Leistung und Link in den Admin.

## Kundenkonto (Phase 2)
- Login per **Magic Link** (E-Mail), kein Passwort.
- Gast-Buchungen werden über die E-Mail-Adresse automatisch dem Konto zugeordnet.
- Konto zeigt kommende und vergangene Termine, „Wie letztes Mal buchen“, Opt-ins verwalten, Daten löschen.
- Buchen bleibt immer **ohne Konto** möglich.

## Admin für Denis
- Geschützt über Cloudflare Access (Login mit Denis' E-Mail).
- Mobil zuerst: Denis bedient alles am Handy.
- Tagesansicht und Wochenansicht, Termin anlegen (z. B. für Anrufer), verschieben, absagen, „Nicht erschienen“.
- Warteliste je Tag sehen, Einträge manuell vergeben.
- Sperrzeiten und Urlaub, Öffnungszeiten, Leistungen und Preise pflegen.
- Kundenliste mit Notizen („Seiten 2 mm, oben Schere“), No-Show-Zähler, Sperre.
