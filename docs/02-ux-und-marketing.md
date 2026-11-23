# 02 – UX, Marketing und Design

Referenz: `docs/design/prototyp.html` ist der freigegebene Entwurf. Abweichungen nur mit Begründung.

## Leitprinzipien

1. **Eine Hauptaktion: Termin buchen.** Jeder Bildschirm hat genau einen primären Button. Er ist auf jeder Scrollposition erreichbar (Kopfleiste, feste Leiste unten auf dem Handy, Abschnitts-CTAs).
2. **Mobil zuerst.** Über 80 % der Besucher kommen vom Handy, oft direkt aus Google Maps oder Instagram. Daumenreichweite, große Tippflächen (min. 44 × 44 px), keine Hover-Abhängigkeiten.
3. **Buchung in unter 30 Sekunden**, maximal 4 Schritte, kein Konto, keine Pflichtfelder außer Name und E-Mail (Telefon nur bei WhatsApp-Wunsch).
4. **Vertrauen vor dem Klick:** Preise sichtbar, echte Fotos, echte Google-Bewertungen, Adresse und Öffnungszeiten.
5. **Ehrlichkeit:** Keine Fake-Verknappung, keine erfundenen Bewertungen, keine versteckten Bedingungen.

## Seitenaufbau (Startseite, One-Pager)

| # | Abschnitt | Zweck | Primäre Aktion |
|---|---|---|---|
| 1 | Kopfleiste (BRG, sticky) | Marke, Navigation, CTA | „Termin“ |
| 2 | Hero (dunkel) | Nutzenversprechen, nächster freier Termin, Kernfakten (ab 14 €, Mo–Sa 9–20, 30 Sek. buchen) | „Jetzt Termin buchen“, Pill mit nächstem freien Slot (öffnet Buchung mit vorausgewähltem Slot) |
| 3 | So funktioniert's | Angst vor Online-Buchung nehmen (3 Schritte) | – |
| 4 | Preisliste | Filter-Chips nach Kategorie, „Buchen“ je Leistung springt direkt zur Zeitwahl | „Buchen“ |
| 5 | Termine-Modell | Mittwoch fest vs. Warteliste verständlich erklären | „Mittwoch buchen“ / „Auf die Warteliste“ |
| 6 | Galerie | Qualitätsbeweis, 7 Fotos (Fade, Bart, Vorher/Nachher, Laden, Kinder, Werkzeug, Porträt) | „So einen will ich auch“ |
| 7 | Social | Instagram + TikTok, Inhalte erst nach Klick (DSGVO) | „Folgen“ |
| 8 | Google-Bewertungen | Note, Anzahl, 3–5 echte Bewertungen, „Bewertung schreiben“ | „Bewertung schreiben“ |
| 9 | Stammkunden (dunkel) | Umstieg auf Online-Buchung, WhatsApp-Vorschau interaktiv | „Nächsten Termin sichern“ |
| 10 | Kontakt | Live-Status „Jetzt geöffnet“, Route, Telefon, Karte (Zwei-Klick) | „Route“ |
| 11 | Abschluss-CTA (BRG-Band) | Letzter Anstoß | „Jetzt Termin buchen“ |
| 12 | Footer (dunkel) | Impressum, Datenschutz, Social | – |

Unterseiten: `/impressum`, `/datenschutz`, `/termin/[token]` (Verwalten/Absagen), `/warteliste/[token]` (Platz bestätigen), `/konto` (Phase 2), `/admin/*`.

## Buchungsablauf (Bottom-Sheet auf dem Handy, Dialog auf Desktop)

1. **Leistung** – gruppiert nach Kategorie, Preis und Dauer sichtbar. Wiederkehrende Kunden sehen oben „Wie letztes Mal“.
2. **Tag & Zeit** – horizontale Tagesleiste (Label „Termine“ grün für Mittwoch, „Warteliste“ für andere Tage), Uhrzeiten gruppiert nach Vormittag/Mittag/Abend. Belegte Zeiten durchgestrichen. An Wartelisten-Tagen stattdessen Zeitfenster-Auswahl.
3. **Daten** – Name, E-Mail, optional Handynummer, Opt-ins (WhatsApp, Erinnerung nächster Schnitt, Bewertungsbitte), „Auf diesem Gerät merken“.
4. **Prüfen** – Zusammenfassung, Absagebedingungen, Button-Text beschreibt die Aktion („Verbindlich buchen“ bzw. „Auf Warteliste setzen“).
5. **Bestätigung** – „Gebucht!“, Termin, „In Kalender eintragen“ (.ics), Route, Hinweis auf Erinnerung.

Regeln:
- Gewählte Leistung bleibt oben im Sheet sichtbar mit „ändern“.
- Fortschrittsbalken und „Schritt x von 4“.
- Zurück-Navigation verliert keine Eingaben. Browser-Zurück schließt das Sheet (History-State).
- Fehler inline am Feld, in Klartext, mit Lösung.
- Slot zwischenzeitlich vergeben → freundliche Meldung + direkt die nächsten 3 freien Zeiten anbieten.
- Autocomplete-Attribute (`name`, `email`, `tel`), passende `inputmode`.
- Ganze Buchung funktioniert auch ohne JavaScript (Form Actions, eigene Seite `/buchen`).

## Conversion und Marketing

### Neukunden
- **Lokales SEO:** Titel und H1 mit „Barbershop Hamburg-Barmbek“, strukturierte Daten `HairSalon` (JSON-LD: Adresse, Geo, Öffnungszeiten, Telefon, Preisbereich, `sameAs` Instagram/TikTok, `aggregateRating` nur mit echten Daten von Google), sauberes `<title>` und Meta-Description, Open-Graph-Bild.
- **Google-Unternehmensprofil**: Buchungslink `https://denis-barbershop.de/?utm_source=google&utm_medium=gbp&utm_campaign=profil` hinterlegen. „Termin buchen“-Button im Profil.
- **Instagram/TikTok-Bio**: Link mit eigenen UTM-Parametern. Seite erkennt `?ref=` / UTM und speichert die Quelle anonym zur Buchung (kein Tracking-Cookie).
- **QR-Code** am Schaufenster und auf Visitenkarten → `/?utm_source=laden&utm_medium=qr`.
- **Nächster freier Termin** prominent im Hero und in der mobilen Leiste.
- Galerie mit echten Fotos ist Pflicht vor dem Launch.

### Bestandskunden
- Stammkunden-Abschnitt mit klaren Vorteilen.
- „Wie letztes Mal“ (lokal gespeichert, später Konto).
- Opt-in-Erinnerung „Zeit für den nächsten Schnitt“ mit wählbarem Intervall.
- Aushang im Laden + Karte zum Mitnehmen: „Ab jetzt online buchen“ mit QR-Code.
- Bewertungsbitte nach dem Termin (Opt-in) → mehr Google-Bewertungen → mehr Neukunden.

### Messen (ohne Cookies)
- Serverseitige, anonyme Zähler in D1: Seitenaufrufe pro Tag, Buchungs-Funnel (Sheet geöffnet → Schritt 2 → 3 → 4 → gebucht), Quelle (UTM). Keine IP, keine IDs.
- Alternativ Cloudflare Web Analytics (cookielos). Entscheidung in ADR.

## Design-Tokens

```css
--brg:        #004225;  /* British Racing Green – Akzent, Buttons, Kopfleiste */
--ink:        #2b2a28;  /* warmes Dunkelgrau – Text, dunkle Bereiche */
--ink-2:      #373533;  /* Flächen in dunklen Bereichen */
--muted:      #65615b;  /* Sekundärtext (Prototyp: #6f6b65, abgedunkelt für 4,5:1 auf --raise) */
--bg:         #f1efeb;  /* warmes Hellgrau – Seitenhintergrund */
--surface:    #fdfcfa;  /* Karten */
--raise:      #e6e3de;  /* Platzhalter, Chips */
--line:       #d9d5ce;  /* Linien */
--ok:         #1e8a4f;  /* Status „frei/geöffnet“ */
--pole-red:   #c8102e; --pole-white: #ffffff; --pole-blue: #1f3f95; /* animierte Barber-Pole-Leiste */
```

- Schrift: **Archivo** (Google Fonts, self-hosted als WOFF2), 400/500/600/700/800.
- Buttons: voll abgerundet (`999px`), primär BRG mit Weiß. In der BRG-Kopfleiste primär cremeweiß mit BRG-Schrift.
- Dunkle Bereiche (Hero, Stammkunden, Footer, mobile Leiste): `--ink` als Hintergrund, Text cremeweiß, **keine** Mint-/Hellgrün-Töne, keine Verläufe.
- Animierte Barber-Pole-Leiste (Rot/Weiß/Blau) oben, respektiert `prefers-reduced-motion`.
- Kontrast: mindestens 4,5:1 für Text, 3:1 für UI-Elemente.

## Texte (Tonalität)

- Du-Form, locker, klar. Beispiel-Headline: „Frisch geschnitten. Ohne Warten.“
- Buttons beschreiben die Aktion: „Jetzt Termin buchen“, „Verbindlich buchen“, „Auf Warteliste setzen“.
- Fehler: was ist passiert + was tun. Beispiel: „Diese Zeit wurde gerade gebucht. Wie wäre 14:30 oder 15:00?“
