# 05 – Roadmap

Jede Phase endet mit grüner CI, Deployment und einem kurzen Test durch Denis.

## Phase 0 – Fundament (jetzt)
- [x] Domain bei Strato, DNS bei Cloudflare, Startseite online (statisch, Termine per Telefon)
- [x] Repo auf GitHub, SvelteKit-Projekt mit allen Tools aus `CLAUDE.md`, CI-Pipeline (D1/Drizzle/Zod folgen mit Phase 1, siehe ADR-0002)
- [ ] Impressum und Datenschutzerklärung (Entwürfe unter `/impressum` und `/datenschutz`, Angaben von Denis fehlen, rechtliche Prüfung offen)
- [ ] Echte Fotos, TikTok-Handle, Google Place ID
- [x] Startseite aus dem Prototyp in Svelte-Komponenten übertragen (ohne Buchung)

**Fertig wenn:** Lighthouse-Budgets erreicht, axe ohne Fehler, Seite live unter `denis-barbershop.de`.

## Phase 1 – MVP Buchung
- [ ] Datenmodell + Migrationen + Seed (Leistungen, Öffnungszeiten, Mittwochs-Regel)
- [ ] Deploy-Job in der CI, Workers Builds trennen (ADR-0008)
- [ ] Prüfen, ob `@cloudflare/vitest-pool-workers` mit Vitest 5 läuft
- [ ] Slot-Berechnung (rein, getestet) und `/api/slots`
- [ ] Buchungs-Sheet (4 Schritte) + No-JS-Fallback
- [ ] Doppelbuchungs-Schutz über `booking_slot`
- [ ] Bestätigungsmail (Brevo, ADR-0009) mit .ics und Absage-Link, `/termin/[token]`
- [ ] Telegram an Denis bei Buchung und Absage
- [ ] Admin: Tagesansicht, Termin anlegen/absagen, Sperrzeiten
- [ ] Turnstile, Security-Header, Rate-Limit

**Fertig wenn:** Ein Kunde kann am Handy einen Mittwochstermin buchen und absagen, Denis sieht ihn im Admin und bekommt Telegram, zwei gleichzeitige Buchungen desselben Slots ergeben genau einen Termin.

## Phase 2 – Warteliste, Erinnerungen, Bewertungen
- [ ] Warteliste (Mo/Di/Do/Fr/Sa) mit Zeitfenstern
- [ ] Erinnerung am Vortag per E-Mail mit „Ich komme“/„Absagen“ (ADR-0006)
- [ ] Wartelisten-Angebot „Wer zuerst bestätigt“
- [ ] Google-Bewertungen per Cron + JSON-LD `aggregateRating`
- [ ] Bewertungsbitte (Opt-in)
- [ ] Instagram/TikTok-Einbettungen per Zwei-Klick
- [ ] Anonyme Funnel-Zähler
- [ ] Zusatzkanal WhatsApp (ADR-0006): Konto, Nummer, Templates (Erinnerung, Platz frei) freigeben lassen, Webhook

**Fertig wenn:** Absage per E-Mail-Link gibt den Slot frei und die Warteliste erhält innerhalb von 1 Minute ein Angebot. WhatsApp ist dafür nicht nötig.

## Phase 3 – Bindung und Verbindlichkeit
- [ ] Kundenkonto mit Magic Link, „Wie letztes Mal“, Opt-ins verwalten, Daten löschen
- [ ] „Zeit für den nächsten Schnitt“-Erinnerung
- [ ] No-Show-Markierung, Regeln, Anzahlung via Stripe Checkout
- [ ] Kundennotizen im Admin

## Später / Ideen (priorisiert nach Nutzen ÷ Aufwand)
1. Online-Gutscheine (Stripe) – stark vor Weihnachten
2. Verspätungs-Info an die nächsten Kunden per Klick
3. Freunde-werben-Code
4. Zweiter Mitarbeiter (Datenmodell ist vorbereitet)

Bewusst **nicht** geplant: Login mit Google/Apple, digitale Stempelkarte, Foto-Upload beim Buchen, Anzahlung für alle.

## Offene Punkte (vor Phase 1 klären)
| Punkt | Wer |
|---|---|
| Dauer jeder Leistung | Denis |
| Bleibt es bei „nur mittwochs feste Termine“? Ab wann mehr Tage? | Denis |
| Pausenzeiten mittwochs | Denis |
| TikTok-Handle, Google Place ID, Fotos | Denis / Mo |
| Impressumsangaben (Name, Rechtsform, USt-IdNr.) | Denis |
| Eigene Nummer für WhatsApp Business | Denis |
| Absenderadresse für Mails (`termine@…`) | Mo |
| Brevo-Konto anlegen, AVV abschließen, Unterauftragsverarbeiter und Logo im Free-Plan prüfen (ADR-0009) | Mo |
| Cloudflare Web Analytics oder eigene Zähler | Mo (ADR) |
