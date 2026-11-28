import type { RequestHandler } from '@sveltejs/kit';
import { PREVIEW_COOKIE, seeOther } from '#lib/server/preview-gate.ts';

export const prerender = false;

/** Vorschau-Zugang auf diesem Gerät beenden (ADR-0011). */
export const GET: RequestHandler = ({ cookies }) => {
	cookies.delete(PREVIEW_COOKIE, { path: '/' });
	return seeOther('/');
};
