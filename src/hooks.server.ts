import { env } from 'cloudflare:workers';
import { building } from '$app/env';
import type { Handle } from '@sveltejs/kit/hooks';
import {
	isPublicPath,
	isSiteLocked,
	isValidCookie,
	PREVIEW_COOKIE,
	seeOther
} from '#lib/server/preview-gate.ts';

/**
 * Sicherheits-Header für Antworten des Workers. Vorgerenderte Seiten bekommen dieselben
 * Header über `_headers`; die CSP setzt SvelteKit selbst (vite.config.ts).
 */
const SECURITY_HEADERS = {
	'strict-transport-security': 'max-age=31536000; includeSubDomains',
	'x-content-type-options': 'nosniff',
	'referrer-policy': 'strict-origin-when-cross-origin',
	'permissions-policy': 'camera=(), microphone=(), geolocation=(), payment=(), usb=()',
	'x-frame-options': 'DENY'
};

export const handle: Handle = async ({ event, resolve }) => {
	// Beim Vorrendern (nur Impressum und Datenschutz, beide öffentlich) gibt es keine Worker-Umgebung.
	if (building) {
		event.locals.previewAccess = false;
		return resolve(event);
	}

	const locked = isSiteLocked(env.SITE_LOCKED);
	const access =
		!locked || (await isValidCookie(event.cookies.get(PREVIEW_COOKIE), env.PREVIEW_PASSWORD));
	event.locals.previewAccess = access;

	// Vorschau-Schutz (ADR-0011): ohne Zugang nur Platzhalter, Rechtliches und Login.
	if (!access && !isPublicPath(event.url.pathname)) return seeOther('/');

	const response = await resolve(event);
	for (const [name, value] of Object.entries(SECURITY_HEADERS)) {
		response.headers.set(name, value);
	}
	if (locked) {
		// Platzhalter und echte Seite teilen sich die URL: nie zwischenspeichern.
		response.headers.set('cache-control', 'private, no-store');
		response.headers.set('vary', 'Cookie');
	}
	return response;
};
