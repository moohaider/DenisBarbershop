# ADR-0005: Stil „Kupfer & Tabak“ nach Kundenvorlage

- Status: angenommen, Farben ersetzt durch ADR-0010
- Datum: 2026-11-25

## Kontext
Denis hat eine Designvorlage („Kupfer & Tabak“) ausgewählt. Ein zwischenzeitlicher Entwurf in Racing Green wich zu weit davon ab. Die Website richtet sich jetzt eng nach der Vorlage.

## Entscheidung
- **Aufbau wie in der Vorlage:** Kopfleiste mit Logo „Denis’ *Barbershop*“, Navigation, Live-Status und dunklem Button. Darunter die Magazin-Ansicht: links eine dunkle, mitlaufende Säule (Überschrift, Kurztext, Barbier, Status, Preise, Ort, Buchungsbutton), rechts das Leistungsverzeichnis als Karten mit Filter. Danach Online-Reservierung (3 Schritte), Lookbook, Stammkunden, Kundenstimmen mit Öffnungszeiten, dunkle Fußzeile.
- **Farben:** Leinen `#f4ede2`, Karten `#fbf8f3`, Chips `#e9dfd0`, Tabak `#241914`, Umbra `#5e4d44`, Kupfer `#c86d3b`, Messing `#d9a441`.
- **Barrierefreiheit:** Kupfer aus der Vorlage erreicht mit weißer Schrift nur 3,7:1. Buttons nutzen deshalb `#a9552a` (5,2:1), kleine Kupferschrift `#9c4c25` (≥ 4,6:1). Kupfer `#c86d3b` nur für große Schrift wie Preise (≥ 3:1).
- **Schriften:** Bodoni Moda (Überschriften, Preise, auch kursiv im Logo) und DM Sans (Text), beide self-hosted.
- **Bewusst nicht übernommen:** erfundene Bewertungen, Bewertungsnote und „Beliebt“-Abzeichen aus der Vorlage. Bis zur Google-Anbindung stehen dort gekennzeichnete Platzhalter.
- **Zusätzlich zur Vorlage:** Barber-Pole-Leiste oben, Stammkunden-Bereich mit WhatsApp-Vorschau, Hinweis auf telefonische Buchung (Phase 0).

## Folgen
+ Look entspricht dem Geschmack des Kunden.
- Archivo wird nicht mehr genutzt, die Schriftdateien sind entfernt (ersetzt die Schriftwahl aus ADR-0002).
