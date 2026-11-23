/**
 * Stammdaten des Salons (Quelle: docs/01-produkt.md).
 * Werte mit `null` sind noch offen und werden auf der Seite ausgeblendet.
 */

export const business = {
	name: 'Denis Barbershop',
	street: 'Dehnhaide 6',
	postalCode: '22081',
	city: 'Hamburg',
	district: 'Barmbek',
	phoneDisplay: '040 78066616',
	phoneE164: '+494078066616',
	url: 'https://denis-barbershop.de',
	instagram: { handle: '@denisbarbershop6', url: 'https://www.instagram.com/denisbarbershop6' },
	/** Offen: Handle noch nicht bestätigt (docs/05-roadmap.md). */
	tiktok: null as { handle: string; url: string } | null,
	/** Google-Maps-Suche; wird durch Place-ID-Link ersetzt, sobald bekannt. */
	googleMapsUrl:
		'https://www.google.com/maps/search/?api=1&query=Denis+Barbershop+Dehnhaide+6+22081+Hamburg',
	routeUrl: 'https://www.google.com/maps/search/?api=1&query=Dehnhaide+6+22081+Hamburg'
} as const;

export const addressLine = `${business.street}, ${business.postalCode} ${business.city}`;

/** Wochentag nach ISO (1 = Montag … 7 = Sonntag), Zeiten in Minuten ab 00:00 Ortszeit. */
export type OpeningHours = Record<number, { opens: number; closes: number } | null>;

export const openingHours: OpeningHours = {
	1: { opens: 9 * 60, closes: 20 * 60 },
	2: { opens: 9 * 60, closes: 20 * 60 },
	3: { opens: 9 * 60, closes: 20 * 60 },
	4: { opens: 9 * 60, closes: 20 * 60 },
	5: { opens: 9 * 60, closes: 20 * 60 },
	6: { opens: 9 * 60, closes: 20 * 60 },
	7: null
};
