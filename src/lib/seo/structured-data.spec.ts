import { describe, expect, it } from 'vitest';
import { hairSalonJsonLd, serializeJsonLd } from './structured-data';

describe('hairSalonJsonLd', () => {
	const data = hairSalonJsonLd();

	it('describes the salon with address and phone', () => {
		expect(data['@type']).toBe('HairSalon');
		expect(data.address.streetAddress).toBe('Dehnhaide 6');
		expect(data.address.postalCode).toBe('22081');
		expect(data.telephone).toBe('+494078066616');
	});

	it('derives the price range from the price list', () => {
		expect(data.priceRange).toBe('5 €–49 €');
	});

	it('never contains a rating before real Google data exists', () => {
		expect(data).not.toHaveProperty('aggregateRating');
	});

	it('only links confirmed social profiles', () => {
		expect(data.sameAs).toEqual(['https://www.instagram.com/denisbarbershop6']);
	});
});

describe('serializeJsonLd', () => {
	it('escapes "<" so the script tag cannot be closed early', () => {
		expect(serializeJsonLd({ a: '</script>' })).toBe('{"a":"\\u003c/script>"}');
	});
});
