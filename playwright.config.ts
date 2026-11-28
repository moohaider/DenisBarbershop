import { defineConfig, devices } from '@playwright/test';
import { BASE_URL, E2E_PREVIEW_PASSWORD } from './tests/preview-access.ts';

export default defineConfig({
	testDir: 'tests',
	testMatch: '**/*.e2e.ts',
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 1 : 0,
	reporter: process.env.CI ? [['github'], ['html', { open: 'never' }]] : 'list',
	use: { baseURL: BASE_URL },
	webServer: {
		// Eigenes Test-Passwort für den Vorschau-Schutz (ADR-0011), überschreibt .dev.vars.
		command: `npm run preview -- --var PREVIEW_PASSWORD:${E2E_PREVIEW_PASSWORD}`,
		port: 4173,
		reuseExistingServer: !process.env.CI
	},
	projects: [
		{ name: 'desktop', use: { ...devices['Desktop Chrome'] } },
		{ name: 'iphone-13', use: { ...devices['iPhone 13'] } },
		{ name: 'pixel-7', use: { ...devices['Pixel 7'] } }
	]
});
