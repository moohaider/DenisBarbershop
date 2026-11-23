/**
 * Alle Texte der Startseite (Quelle: docs/design/prototyp.html, freigegeben).
 * Phase 0: Termine nur telefonisch, Online-Buchung wird angekündigt.
 */
import { addressLine, business } from './business';

export const seo = {
	title: 'Denis Barbershop Hamburg-Barmbek | Barbier an der Dehnhaide',
	description: `Denis Barbershop in Hamburg-Barmbek: Haarschnitt ab 14 €, Bart, Rasur und Beauty. Mo–Sa 9–20 Uhr, ${business.street}. Termin unter ${business.phoneDisplay}.`
};

export const nav = [
	{ id: 'leistungen', label: 'Preise' },
	{ id: 'galerie', label: 'Galerie' },
	{ id: 'bewertungen', label: 'Bewertungen' },
	{ id: 'kontakt', label: 'Kontakt' }
];

export const hero = {
	titleStart: 'Frisch geschnitten.',
	titleEmphasis: 'Ohne Warten.',
	lead: 'Dein Barbershop an der Dehnhaide in Hamburg-Barmbek. Ruf an für deinen Termin oder komm einfach vorbei. Online buchen kannst du schon bald.',
	primary: 'Termin vereinbaren',
	secondary: 'Preise ansehen',
	pillText: 'Online-Buchung startet bald',
	pillAction: 'Jetzt telefonisch buchen',
	facts: [
		{ title: 'Haarschnitte ab 14 €', text: 'Bart ab 15 €' },
		{ title: 'Mo–Sa, 9–20 Uhr', text: `${business.street}, ${business.city}` },
		{ title: 'Bald online buchbar', text: 'bis dahin per Telefon' }
	],
	photo: { title: 'Hauptfoto', text: 'Denis bei der Arbeit oder der Laden von innen, Hochformat' }
};

export const howItWorks = {
	eyebrow: 'Bald verfügbar',
	title: 'Online buchen in drei Tipps',
	steps: [
		{
			title: 'Leistung wählen',
			text: 'Haarschnitt, Bart oder Kombi. Der Preis steht immer dabei.'
		},
		{ title: 'Zeit aussuchen', text: 'Du siehst sofort, was frei ist, und buchst ohne Konto.' },
		{
			title: 'Erinnerung bekommen',
			text: 'Am Vortag melden wir uns per WhatsApp. Absagen geht mit einem Tipp.'
		}
	]
};

export const prices = {
	eyebrow: 'Preisliste',
	title: 'Leistungen und Preise',
	sub: 'Alle Preise inklusive. Termine vereinbarst du aktuell telefonisch.',
	all: 'Alle',
	filterLabel: 'Kategorie filtern',
	action: 'Anfragen'
};

export const bookingModes = {
	eyebrow: 'Bald verfügbar',
	title: 'Mittwoch fest, sonst Warteliste',
	fixed: {
		tag: 'Jeden Mittwoch',
		title: 'Fester Termin',
		text: 'Du wählst deine Uhrzeit und kommst ohne Wartezeit dran. Dein Platz ist reserviert.',
		action: 'Termin anfragen'
	},
	waitlist: {
		tag: 'Mo, Di, Do, Fr, Sa',
		title: 'Digitale Warteliste',
		text: 'Sag uns, wann es dir passt. Sobald ein Platz frei wird, bekommst du eine WhatsApp und bestätigst mit einem Tipp.',
		action: 'Mehr erfahren'
	}
};

export const gallery = {
	eyebrow: 'Galerie',
	title: 'Frisch aus dem Stuhl',
	sub: 'Aktuelle Schnitte und ein Blick in den Laden.',
	/** Platzhalter, bis echte Fotos vorliegen (Pflicht vor dem Launch). */
	photos: [
		{ title: 'Foto 1', text: 'Fade, Hochformat', shape: 'tall' },
		{ title: 'Foto 2', text: 'Bart und Konturen', shape: 'square' },
		{ title: 'Foto 3', text: 'Vorher / Nachher', shape: 'square' },
		{ title: 'Foto 4', text: 'Der Laden von innen, Querformat', shape: 'wide' },
		{ title: 'Foto 5', text: 'Kinderhaarschnitt', shape: 'square' },
		{ title: 'Foto 6', text: 'Werkzeug, Detail', shape: 'square' },
		{ title: 'Foto 7', text: 'Denis im Porträt', shape: 'square' }
	] as const
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
	eyebrow: 'Google-Bewertungen',
	title: 'Das sagen unsere Kunden',
	countLabel: 'Bewertungen auf Google',
	/** Platzhalter, bis die echten Bewertungen per Google Places API kommen (Phase 2). */
	placeholders: [
		'Hier erscheinen automatisch die neuesten Bewertungen von Google, mit Name, Sternen und Datum.',
		'Die Bewertungen werden einmal am Tag aktualisiert.',
		'Nur echte Bewertungen, direkt von Google.'
	],
	placeholderTitle: 'Platz für eine Google-Bewertung',
	write: 'Bewertung schreiben',
	all: 'Alle Bewertungen auf Google'
};

export const regulars = {
	eyebrow: 'Für Stammkunden',
	title: 'Du kennst uns schon? Bald buchst du online.',
	benefits: [
		'Kein Anruf und kein Warten im Laden mehr',
		'Deine Daten und deinen letzten Schnitt merken wir uns, beim nächsten Mal reicht ein Tipp',
		'Auf Wunsch erinnern wir dich, wenn es wieder Zeit für einen Schnitt ist',
		'Absagen per WhatsApp, der Platz geht dann an die Warteliste'
	],
	action: 'Jetzt Termin vereinbaren',
	hint: 'Tippe in der Vorschau auf einen der Buttons.',
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
	eyebrow: 'Kontakt',
	title: 'So findest du uns',
	statusFallback: 'Mo–Sa geöffnet',
	address: 'Adresse',
	route: 'Route in Google Maps',
	hoursTitle: 'Öffnungszeiten',
	hours: [
		{ days: 'Mo–Sa', time: '09:00–20:00' },
		{ days: 'So', time: 'geschlossen' }
	],
	phone: 'Telefon',
	copy: 'Nummer kopieren',
	copied: 'Kopiert',
	social: 'Social Media',
	mapPhoto: { title: 'Karte oder Außenfoto', text: 'Schaufenster an der Dehnhaide' }
};

export const finalCta = {
	title: 'Dein Stuhl ist frei.',
	text: 'Ruf uns an und sichere dir deinen Termin. Online buchen kannst du schon bald.',
	action: 'Termin vereinbaren'
};

export const footer = {
	line: `${business.name} · ${addressLine}`,
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
	hoursValue: 'Mo–Sa, 09:00–20:00 Uhr',
	address: 'Adresse',
	call: 'Jetzt anrufen'
};

export const headerCta = 'Termin';
export const placeholderNote = 'Platzhalter';
