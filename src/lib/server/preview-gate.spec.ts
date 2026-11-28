import { describe, expect, it } from 'vitest';
import {
	accessToken,
	basicAuthPassword,
	isPublicPath,
	isSiteLocked,
	isValidCookie,
	isValidPassword
} from './preview-gate.ts';

const basic = (user: string, pass: string) =>
	'Basic ' + btoa(String.fromCharCode(...new TextEncoder().encode(`${user}:${pass}`)));

describe('isSiteLocked', () => {
	it('is locked unless explicitly unlocked', () => {
		expect(isSiteLocked(undefined)).toBe(true);
		expect(isSiteLocked('true')).toBe(true);
		expect(isSiteLocked('')).toBe(true);
		expect(isSiteLocked('false')).toBe(false);
	});
});

describe('isPublicPath', () => {
	it('allows the start page, legal pages and the login', () => {
		for (const p of ['/', '/impressum', '/datenschutz/', '/vorschau', '/vorschau/abmelden']) {
			expect(isPublicPath(p)).toBe(true);
		}
	});

	it('blocks everything else', () => {
		for (const p of ['/buchen', '/admin', '/impressum/extra', '/vorschauX']) {
			expect(isPublicPath(p)).toBe(false);
		}
	});
});

describe('basicAuthPassword', () => {
	it('returns the password and ignores the user name', () => {
		expect(basicAuthPassword(basic('denis', 'geheim'))).toBe('geheim');
		expect(basicAuthPassword(basic('', 'mit:doppelpunkt'))).toBe('mit:doppelpunkt');
	});

	it('decodes UTF-8 passwords', () => {
		expect(basicAuthPassword(basic('x', 'Schäre-ß'))).toBe('Schäre-ß');
	});

	it('rejects missing or malformed headers', () => {
		expect(basicAuthPassword(null)).toBeNull();
		expect(basicAuthPassword('Bearer abc')).toBeNull();
		expect(basicAuthPassword('Basic !!!')).toBeNull();
		expect(basicAuthPassword('Basic ' + btoa('ohne-doppelpunkt'))).toBeNull();
	});
});

describe('access checks', () => {
	it('accepts the right password and cookie', async () => {
		expect(await isValidPassword('geheim', 'geheim')).toBe(true);
		expect(await isValidCookie(await accessToken('geheim'), 'geheim')).toBe(true);
	});

	it('rejects a wrong password or an old cookie', async () => {
		expect(await isValidPassword('falsch', 'geheim')).toBe(false);
		expect(await isValidPassword('', 'geheim')).toBe(false);
		expect(await isValidCookie(await accessToken('altes-passwort'), 'geheim')).toBe(false);
		expect(await isValidCookie('manipuliert', 'geheim')).toBe(false);
	});

	it('fails closed when no password is configured', async () => {
		expect(await isValidPassword('', undefined)).toBe(false);
		expect(await isValidPassword('', '')).toBe(false);
		expect(await isValidCookie(await accessToken('irgendwas'), '')).toBe(false);
		expect(await isValidCookie(await accessToken('irgendwas'), undefined)).toBe(false);
	});
});
