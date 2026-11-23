import { describe, expect, it } from 'vitest';
import { openingHours } from '#lib/content/business.ts';
import { openStatus, openStatusText, toLocalTime, formatClock } from './opening';

describe('toLocalTime', () => {
	it('converts UTC to Berlin winter time (UTC+1)', () => {
		// Mittwoch, 25.11.2026, 08:30 UTC = 09:30 MEZ
		expect(toLocalTime(new Date('2026-11-25T08:30:00Z'))).toEqual({ weekday: 3, minutes: 570 });
	});

	it('converts UTC to Berlin summer time (UTC+2)', () => {
		// Mittwoch, 15.07.2026, 07:30 UTC = 09:30 MESZ
		expect(toLocalTime(new Date('2026-07-15T07:30:00Z'))).toEqual({ weekday: 3, minutes: 570 });
	});

	it('handles the switch to summer time (last Sunday in March)', () => {
		// 29.03.2026: 01:59 UTC = 03:59 MESZ (02:00–03:00 gibt es nicht)
		expect(toLocalTime(new Date('2026-03-29T00:59:00Z'))).toEqual({ weekday: 7, minutes: 119 });
		expect(toLocalTime(new Date('2026-03-29T01:00:00Z'))).toEqual({ weekday: 7, minutes: 180 });
	});

	it('handles the switch to winter time (last Sunday in October)', () => {
		// 25.10.2026: 00:30 UTC = 02:30 MESZ, 01:30 UTC = 02:30 MEZ
		expect(toLocalTime(new Date('2026-10-25T00:30:00Z'))).toEqual({ weekday: 7, minutes: 150 });
		expect(toLocalTime(new Date('2026-10-25T01:30:00Z'))).toEqual({ weekday: 7, minutes: 150 });
	});

	it('rolls over the date at local midnight, not UTC midnight', () => {
		// Samstag 23:30 UTC = Sonntag 00:30 MEZ
		expect(toLocalTime(new Date('2026-11-28T23:30:00Z'))).toEqual({ weekday: 7, minutes: 30 });
	});
});

describe('openStatus', () => {
	it('is open during opening hours', () => {
		expect(openStatus(openingHours, { weekday: 2, minutes: 9 * 60 })).toEqual({
			open: true,
			closesAt: 20 * 60
		});
	});

	it('is closed at closing time exactly', () => {
		expect(openStatus(openingHours, { weekday: 2, minutes: 20 * 60 })).toEqual({
			open: false,
			next: { weekday: 3, opensAt: 9 * 60 }
		});
	});

	it('opens later the same day before opening time', () => {
		expect(openStatus(openingHours, { weekday: 4, minutes: 8 * 60 })).toEqual({
			open: false,
			next: { weekday: 4, opensAt: 9 * 60 }
		});
	});

	it('skips Sunday: Saturday evening points to Monday', () => {
		expect(openStatus(openingHours, { weekday: 6, minutes: 21 * 60 })).toEqual({
			open: false,
			next: { weekday: 1, opensAt: 9 * 60 }
		});
	});

	it('is closed all Sunday', () => {
		expect(openStatus(openingHours, { weekday: 7, minutes: 12 * 60 }).open).toBe(false);
	});

	it('returns no next opening when the shop is closed every day', () => {
		const closed = { 1: null, 2: null, 3: null, 4: null, 5: null, 6: null, 7: null };
		expect(openStatus(closed, { weekday: 1, minutes: 600 })).toEqual({ open: false, next: null });
	});
});

describe('openStatusText', () => {
	const text = (weekday: number, minutes: number) =>
		openStatusText(openStatus(openingHours, { weekday, minutes }), { weekday, minutes });

	it('describes the open state', () => {
		expect(text(1, 10 * 60)).toBe('Jetzt geöffnet, bis 20 Uhr');
	});

	it('says "heute" before opening', () => {
		expect(text(1, 7 * 60)).toBe('Gerade geschlossen, heute ab 9 Uhr');
	});

	it('says "morgen" after closing on a weekday', () => {
		expect(text(1, 21 * 60)).toBe('Gerade geschlossen, morgen ab 9 Uhr');
	});

	it('names the weekday when it is not tomorrow', () => {
		expect(text(6, 21 * 60)).toBe('Gerade geschlossen, Montag ab 9 Uhr');
	});

	it('says "morgen" on Sunday', () => {
		expect(text(7, 12 * 60)).toBe('Gerade geschlossen, morgen ab 9 Uhr');
	});

	it('falls back to a plain message when there is no next opening', () => {
		expect(openStatusText({ open: false, next: null }, { weekday: 1, minutes: 0 })).toBe(
			'Gerade geschlossen'
		);
	});
});

describe('formatClock', () => {
	it('formats full and partial hours', () => {
		expect(formatClock(9 * 60)).toBe('9 Uhr');
		expect(formatClock(9 * 60 + 5)).toBe('9:05 Uhr');
	});
});
