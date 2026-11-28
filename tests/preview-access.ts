import type { BrowserContext } from '@playwright/test';
import { accessToken, PREVIEW_COOKIE } from '../src/lib/server/preview-gate.ts';

/** Nur für die Tests, kein echtes Secret: playwright.config.ts übergibt es an wrangler dev. */
export const E2E_PREVIEW_PASSWORD = 'e2e-vorschau';
export const BASE_URL = 'http://localhost:4173';

/** Schaltet die echte Website frei, wie nach einem Login unter /vorschau. */
export async function unlockPreview(context: BrowserContext): Promise<void> {
	await context.addCookies([
		{ name: PREVIEW_COOKIE, value: await accessToken(E2E_PREVIEW_PASSWORD), url: BASE_URL }
	]);
}
