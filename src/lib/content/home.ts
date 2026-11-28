/**
 * Alle Texte der Startseite. Aufbau und Tonalität nach der Kundenvorlage „Kupfer & Tabak“.
 * Phase 0: Termine nur telefonisch, Online-Buchung wird angekündigt.
 */
import { business } from './business';

export const seo = {
	title: 'Denis Barbershop Hamburg-Barmbek | Barbier an der Dehnhaide',
	description: `Denis Barbershop in Hamburg-Barmbek: Haarschnitt ab 14 €, Bart, Rasur und Beauty. Mo–Sa 9–20 Uhr, ${business.street}. Termin unter ${business.phoneDisplay}.`
};

export const nav = [
	{ id: 'leistungen', label: 'Leistungen' },
	{ id: 'termin', label: 'Termin buchen' },
	{ id: 'lookbook', label: 'Lookbook' },
	{ id: 'kontakt', label: 'Kontakt' }
];

export const brand = { first: 'Denis’', second: 'Barbershop' };

export const legal = { back: 'Zurück zur Startseite' };

export const headerCta = 'Stuhl reservieren';

export const hero = {
	label: 'Barbershop in Hamburg-Barmbek',
	titleStart: 'Frisch geschnitten.',
	titleEmphasis: 'Ohne Warten.',
	lead: 'Präzise Schnitte, saubere Konturen und Bartpflege an der Dehnhaide. Denis führt den Laden selbst und nimmt sich für jeden Kunden Zeit.',
	rows: {
		barber: 'Barbier',
		barberValue: 'Denis (Inhaber)',
		status: 'Status',
		prices: 'Preise',
		pricesValue: 'Haarschnitt ab 14 €',
		place: 'Ort'
	},
	primary: 'Termin vereinbaren',
	note: 'Online-Buchung startet bald. Bis dahin per Telefon:'
};

export const prices = {
	label: 'Salon-Menü',
	title: 'Leistungsverzeichnis',
	all: 'Alle Services',
	filterLabel: 'Kategorie filtern',
	duration: 'Dauer: ca.',
	action: 'Termin anfragen'
};

export const booking = {
	label: 'Online-Reservierung',
	title: 'Bald buchst du deinen Termin direkt bei Denis.',
	sub: 'Da Denis den Laden selbst führt, wirst du immer vom Inhaber bedient. Bis die Online-Buchung startet, vereinbarst du deinen Termin telefonisch.',
	steps: [
		{
			title: '1. Leistung',
			text: 'Haarschnitt, Bart oder Kombi wählen. Der Preis steht immer dabei.'
		},
		{
			title: '2. Datum & Uhrzeit',
			text: 'Freie Zeiten sehen und ohne Konto buchen. Mittwochs feste Termine, sonst Warteliste.'
		},
		{
			title: '3. Abschluss',
			text: 'Bestätigung per E-Mail, am Vortag eine Erinnerung per WhatsApp.'
		}
	],
	fixed: {
		title: 'Jeden Mittwoch: fester Termin',
		text: 'Du wählst deine Uhrzeit und kommst ohne Wartezeit dran.'
	},
	waitlist: {
		title: 'Mo, Di, Do, Fr, Sa: Warteliste',
		text: 'Sobald ein Platz frei wird, bekommst du eine WhatsApp und bestätigst mit einem Tipp.'
	},
	summaryLabel: 'Bis dahin',
	summaryTitle: 'Termin per Telefon',
	summaryText: 'Montag bis Samstag, 9 bis 20 Uhr. Oder komm einfach vorbei.',
	action: 'Termin vereinbaren'
};

export const lookbook = {
	label: 'Lookbook',
	title: 'Schnitte & Rasuren von Denis.',
	looks: [
		{
			tag: 'Signatur',
			title: 'Fade mit der Maschine',
			text: 'Sauberer, tiefer Übergang. Kurz und pflegeleicht.',
			photo: 'Foto: Fade von der Seite'
		},
		{
			tag: 'Klassiker',
			title: 'Waschen & Schneiden',
			text: 'Zeitloser Schnitt mit Styling.',
			photo: 'Foto: klassischer Schnitt'
		},
		{
			tag: 'Bart',
			title: 'Model-Rasur',
			text: 'Bart in Form, mit exakten Linien an Wange und Hals.',
			photo: 'Foto: Bart mit Konturen'
		},
		{
			tag: 'Komplett',
			title: 'Das volle Paket',
			text: 'Haare, Bart und Gesicht in einem Termin.',
			photo: 'Foto: Vorher und nachher'
		}
	],
	action: 'Diesen Look anfragen'
};

export const social = {
	instagram: {
		network: 'Instagram',
		text: 'Neue Schnitte, Vorher-nachher und Einblicke in den Laden.',
		load: 'Beiträge anzeigen',
		consent: 'Beim Anzeigen werden Daten an Instagram (Meta) übertragen.',
		loaded:
			'Hier erscheinen nach der Zustimmung die neuesten Instagram-Beiträge. Die Einbindung folgt mit der fertigen Website.',
		follow: 'Auf Instagram folgen'
	},
	tiktok: {
		network: 'TikTok',
		text: 'Fades, Transformationen und kurze Clips aus dem Stuhl.',
		load: 'Videos anzeigen',
		consent: 'Beim Anzeigen werden Daten an TikTok übertragen.',
		loaded:
			'Hier erscheinen nach der Zustimmung die neuesten TikTok-Videos. Die Einbindung folgt mit der fertigen Website.',
		follow: 'Auf TikTok folgen'
	}
};

export const reviews = {
	label: 'Google-Bewertungen',
	title: 'Das sagen Stammkunden.',
	/** Platzhalter, bis die echten Bewertungen per Google Places API kommen (Phase 2). */
	placeholders: ['Bewertung 1', 'Bewertung 2', 'Bewertung 3'],
	placeholderText:
		'Platz für eine echte Google-Bewertung mit Name, Sternen und Datum. Wird einmal am Tag aktualisiert.',
	write: 'Bewertung schreiben',
	all: 'Alle Bewertungen auf Google'
};

export const regulars = {
	label: 'Für Stammkunden',
	title: 'Du kennst uns schon? Bald buchst du online.',
	benefits: [
		'Kein Anruf und kein Warten im Laden mehr',
		'Deine Daten und deinen letzten Schnitt merken wir uns, beim nächsten Mal reicht ein Tipp',
		'Auf Wunsch erinnern wir dich, wenn es wieder Zeit für einen Schnitt ist',
		'Absagen per WhatsApp, der Platz geht dann an die Warteliste'
	],
	action: 'Termin vereinbaren',
	hint: 'So sieht die Erinnerung aus. Tippe auf einen der Buttons.',
	preview: {
		label: 'Vorschau der WhatsApp-Erinnerung',
		account: 'Unternehmenskonto',
		reminder:
			'Hallo Max, morgen um 15:00 Uhr hast du deinen Termin bei Denis Barbershop (Waschen & Schneiden). Wir freuen uns auf dich!',
		reminderTime: '18:02',
		replyTime: '18:05',
		confirm: 'Ich komme',
		cancel: 'Absagen',
		confirmed: 'Super, dein Termin ist bestätigt. Bis morgen um 15:00 Uhr!',
		cancelled:
			'Dein Termin wurde abgesagt. Danke, dass du Bescheid gegeben hast! Der Platz geht jetzt an die Warteliste.',
		reset: 'Vorschau zurücksetzen'
	}
};

export const contact = {
	label: 'Salon & Zeiten',
	title: 'Besuch Denis im Laden.',
	statusFallback: 'Mo–Sa geöffnet',
	address: 'Adresse',
	route: 'Route in Google Maps',
	phone: 'Telefon',
	copy: 'Nummer kopieren',
	copied: 'Kopiert',
	hoursTitle: 'Öffnungszeiten',
	today: '(heute)',
	closed: 'Geschlossen',
	social: 'Social Media'
};

export const footer = {
	imprint: 'Impressum',
	privacy: 'Datenschutz'
};

export const mobileBar = {
	title: 'Termin per Telefon',
	action: 'Termin'
};

export const callDialog = {
	title: 'Termin vereinbaren',
	close: 'Schließen',
	heading: 'Online-Buchung startet bald',
	text: 'Bis dahin vereinbarst du deinen Termin einfach telefonisch oder kommst direkt vorbei.',
	phone: 'Telefon',
	hours: 'Öffnungszeiten',
	hoursValue: 'Montag bis Samstag, 9 bis 20 Uhr',
	address: 'Adresse',
	call: 'Jetzt anrufen'
};

export const placeholderNote = 'Platzhalter';
