import { describe, expect, it } from 'vitest';
import { categories, formatPrice, lowestPrice, services } from './services';

describe('services', () => {
	it('has unique ids', () => {
		expect(new Set(services.map((s) => s.id)).size).toBe(services.length);
	});

	it('only uses known categories, and every category has services', () => {
		for (const s of services) expect(categories).toContain(s.category);
		for (const c of categories) expect(services.some((s) => s.category === c)).toBe(true);
	});

	it('uses the 15-minute grid friendly durations and positive prices', () => {
		for (const s of services) {
			expect(s.durationMin).toBeGreaterThan(0);
			expect(s.priceCents).toBeGreaterThan(0);
		}
	});
});

describe('formatPrice', () => {
	it('formats whole euros without decimals', () => {
		expect(formatPrice(1400)).toBe('14 €');
	});

	it('formats cents with a German decimal comma', () => {
		expect(formatPrice(1450)).toBe('14,50 €');
	});
});

describe('lowestPrice', () => {
	it('matches the hero facts (haircut from 14 €, beard from 15 €)', () => {
		expect(lowestPrice('Haarschnitte')).toBe(1400);
		expect(lowestPrice('Bart & Rasur')).toBe(1500);
	});
});
