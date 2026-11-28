import { redirect, type RequestHandler } from '@sveltejs/kit';
import { PREVIEW_COOKIE } from '#lib/server/preview-gate.ts';

export const prerender = false;

/** Vorschau-Zugang auf diesem Gerät beenden (ADR-0011). */
export const GET: RequestHandler = ({ cookies }) => {
	cookies.delete(PREVIEW_COOKIE, { path: '/' });
	redirect(303, '/');
};
