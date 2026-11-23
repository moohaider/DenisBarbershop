/**
 * Leistungen und Preise (Quelle: docs/01-produkt.md).
 * Dauer ist eine Schätzung und muss mit Denis abgestimmt werden.
 * Ab Phase 1 kommen die Leistungen aus der Datenbank; diese Liste dient dann als Seed.
 */

export const categories = [
	'Haarschnitte',
	'Bart & Rasur',
	'Kombi-Angebote',
	'Gesicht & Beauty'
] as const;

export type Category = (typeof categories)[number];

export interface Service {
	id: string;
	category: Category;
	name: string;
	durationMin: number;
	priceCents: number;
}

export const services: Service[] = [
	{
		id: 'machine-cut',
		category: 'Haarschnitte',
		name: 'Maschinenschnitt',
		durationMin: 20,
		priceCents: 1400
	},
	{
		id: 'kids-cut',
		category: 'Haarschnitte',
		name: 'Kinderhaarschnitt bis 8 Jahre',
		durationMin: 20,
		priceCents: 1500
	},
	{
		id: 'dry-cut',
		category: 'Haarschnitte',
		name: 'Trockenhaarschnitt',
		durationMin: 30,
		priceCents: 1800
	},
	{
		id: 'wash-cut',
		category: 'Haarschnitte',
		name: 'Waschen & Schneiden',
		durationMin: 30,
		priceCents: 2000
	},
	{
		id: 'beard-shave',
		category: 'Bart & Rasur',
		name: 'Bartrasur',
		durationMin: 20,
		priceCents: 1500
	},
	{
		id: 'model-shave',
		category: 'Bart & Rasur',
		name: 'Model-Rasur',
		durationMin: 20,
		priceCents: 1800
	},
	{
		id: 'dry-cut-epil',
		category: 'Kombi-Angebote',
		name: 'Trockenhaarschnitt & Epilieren',
		durationMin: 30,
		priceCents: 2000
	},
	{
		id: 'wash-cut-epil',
		category: 'Kombi-Angebote',
		name: 'Waschen, Schneiden & Epilieren',
		durationMin: 40,
		priceCents: 2200
	},
	{
		id: 'cut-shave',
		category: 'Kombi-Angebote',
		name: 'Schneiden & Rasur',
		durationMin: 45,
		priceCents: 3200
	},
	{
		id: 'full-package',
		category: 'Kombi-Angebote',
		name: 'Waschen, Schneiden, Epilieren & Model-Rasur',
		durationMin: 60,
		priceCents: 3500
	},
	{
		id: 'face-wax',
		category: 'Gesicht & Beauty',
		name: 'Gesichts-Haarentfernung (Wachs)',
		durationMin: 10,
		priceCents: 500
	},
	{
		id: 'brows',
		category: 'Gesicht & Beauty',
		name: 'Augenbrauen in Form zupfen',
		durationMin: 10,
		priceCents: 800
	},
	{
		id: 'beauty-package',
		category: 'Gesicht & Beauty',
		name: 'Beauty-Paket',
		durationMin: 60,
		priceCents: 4900
	}
];

export function formatPrice(cents: number): string {
	const euros = cents / 100;
	return Number.isInteger(euros)
		? `${euros} €`
		: `${euros.toLocaleString('de-DE', { minimumFractionDigits: 2 })} €`;
}

export function lowestPrice(category: Category): number {
	return Math.min(...services.filter((s) => s.category === category).map((s) => s.priceCents));
}
