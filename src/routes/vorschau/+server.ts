import { env } from 'cloudflare:workers';
import { redirect, type RequestHandler } from '@sveltejs/kit';
import { previewLogin as t } from '#lib/content/preview.ts';
import {
	accessToken,
	basicAuthPassword,
	isSiteLocked,
	isValidPassword,
	PREVIEW_COOKIE,
	PREVIEW_COOKIE_MAX_AGE
} from '#lib/server/preview-gate.ts';

export const prerender = false;

/** Login für die Vorschau (ADR-0011): Browser-Dialog, danach Cookie und zurück zur Startseite. */
export const GET: RequestHandler = async ({ request, cookies }) => {
	if (!isSiteLocked(env.SITE_LOCKED)) redirect(303, '/');

	const password = env.PREVIEW_PASSWORD;
	if (await isValidPassword(basicAuthPassword(request.headers.get('authorization')), password)) {
		cookies.set(PREVIEW_COOKIE, await accessToken(password ?? ''), {
			path: '/',
			httpOnly: true,
			sameSite: 'lax',
			maxAge: PREVIEW_COOKIE_MAX_AGE
		});
		redirect(303, '/');
	}

	const html = `<!doctype html><html lang="de"><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${t.title}</title><body style="font:16px/1.6 system-ui,sans-serif;max-width:32rem;margin:3rem auto;padding:0 1rem;color:#1f1d1a;background:#f5f3ee"><h1 style="font-size:1.5rem">${t.title}</h1><p>${t.text}</p><p><a href="/" style="color:#7a5d14;font-weight:700">${t.back}</a></p></body></html>`;
	return new Response(html, {
		status: 401,
		headers: {
			'content-type': 'text/html; charset=utf-8',
			'www-authenticate': 'Basic realm="Vorschau Denis Barbershop", charset="UTF-8"',
			'content-security-policy': "default-src 'none'; style-src 'unsafe-inline'",
			'x-robots-tag': 'noindex'
		}
	});
};
