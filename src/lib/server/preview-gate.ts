/**
 * Vorschau-Schutz bis zum Start (ADR-0011).
 *
 * Ohne Zugang sehen Besucher auf `/` nur den Platzhalter „Bald online“.
 * Unter `/vorschau` fragt der Browser nach dem Passwort (Basic Auth). Ist es richtig,
 * setzt der Server ein Cookie mit einem HMAC des Passworts, das die echte Seite freischaltet.
 * Ein neues Passwort macht alle alten Cookies ungültig.
 */

export const PREVIEW_COOKIE = 'vorschau';
export const PREVIEW_LOGIN_PATH = '/vorschau';
export const PREVIEW_LOGOUT_PATH = '/vorschau/abmelden';
export const PREVIEW_COOKIE_MAX_AGE = 60 * 60 * 24 * 30;

/**
 * Weiterleitung als Antwort statt `redirect()` zu werfen: Im Vite-Dev-Server mit
 * `cloudflare:workers` wird das geworfene Redirect sonst als Fehler 500 behandelt.
 */
export function seeOther(location: string): Response {
	return new Response(null, { status: 303, headers: { location } });
}

/** Seiten, die auch ohne Zugang erreichbar sind (Impressum und Datenschutz sind Pflicht). */
const PUBLIC_PATHS = new Set([
	'/',
	'/impressum',
	'/datenschutz',
	PREVIEW_LOGIN_PATH,
	PREVIEW_LOGOUT_PATH
]);

export function isPublicPath(pathname: string): boolean {
	const path = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
	return PUBLIC_PATHS.has(path);
}

/** Gesperrt, solange `SITE_LOCKED` nicht ausdrücklich `"false"` ist (fail closed). */
export function isSiteLocked(siteLocked: string | undefined): boolean {
	return siteLocked !== 'false';
}

const encoder = new TextEncoder();

/** Cookie-Wert: HMAC-SHA256 über eine feste Kennung, Schlüssel ist das Passwort. */
export async function accessToken(password: string): Promise<string> {
	const key = await crypto.subtle.importKey(
		'raw',
		encoder.encode(password),
		{ name: 'HMAC', hash: 'SHA-256' },
		false,
		['sign']
	);
	const mac = await crypto.subtle.sign('HMAC', key, encoder.encode('denis-barbershop-vorschau-v1'));
	return [...new Uint8Array(mac)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

/** Vergleich in konstanter Zeit für gleich lange Zeichenketten. */
function equalConstantTime(a: string, b: string): boolean {
	if (a.length !== b.length) return false;
	let diff = 0;
	for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
	return diff === 0;
}

export async function isValidCookie(
	cookie: string | undefined,
	password: string | undefined
): Promise<boolean> {
	if (!password || !cookie) return false;
	return equalConstantTime(cookie, await accessToken(password));
}

/** Passwort aus einem `Authorization: Basic …`-Header, der Benutzername ist egal. */
export function basicAuthPassword(header: string | null): string | null {
	const match = header?.match(/^Basic\s+([A-Za-z0-9+/=]+)$/i);
	if (!match?.[1]) return null;
	let decoded: string;
	try {
		decoded = new TextDecoder().decode(Uint8Array.from(atob(match[1]), (c) => c.charCodeAt(0)));
	} catch {
		return null;
	}
	const colon = decoded.indexOf(':');
	return colon === -1 ? null : decoded.slice(colon + 1);
}

export async function isValidPassword(
	given: string | null,
	password: string | undefined
): Promise<boolean> {
	if (!password || !given) return false;
	// Über HMACs vergleichen, damit Länge und Inhalt des Passworts nicht über die Zeit verraten werden.
	return equalConstantTime(await accessToken(given), await accessToken(password));
}
