import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { E2E_PREVIEW_PASSWORD, unlockPreview } from './preview-access.ts';

// Alle Tests außer dem Vorschau-Schutz laufen mit freigeschalteter Website.
test.beforeEach(async ({ context }, testInfo) => {
	if (!testInfo.titlePath.includes('Vorschau-Schutz')) await unlockPreview(context);
});

test.describe('Startseite', () => {
	test('shows the hero, prices and contact details', async ({ page }) => {
		await page.goto('/');
		await expect(page).toHaveTitle(/Barbershop Hamburg-Barmbek/);
		await expect(page.getByRole('heading', { level: 1 })).toHaveText(
			'Frisch geschnitten. Ohne Warten.'
		);
		await expect(page.getByText('Maschinenschnitt')).toBeVisible();
		await expect(page.locator('#kontakt').getByText('Dehnhaide 6, 22081 Hamburg')).toBeVisible();
	});

	test('filters the price list by category', async ({ page }) => {
		await page.goto('/');
		const prices = page.locator('#leistungen');
		await prices.getByRole('button', { name: 'Bart & Rasur' }).click();
		await expect(prices.getByText('Bartrasur')).toBeVisible();
		await expect(prices.getByText('Maschinenschnitt')).toHaveCount(0);
		await prices.getByRole('button', { name: 'Alle' }).click();
		await expect(prices.getByText('Maschinenschnitt')).toBeVisible();
	});

	test('opens the call dialog instead of booking, Escape closes it', async ({ page }) => {
		await page.goto('/');
		await page.locator('#start').getByRole('link', { name: 'Termin vereinbaren' }).click();
		const dialog = page.getByRole('dialog', { name: 'Termin vereinbaren' });
		await expect(dialog).toBeVisible();
		await expect(dialog.getByRole('link', { name: 'Jetzt anrufen' })).toHaveAttribute(
			'href',
			'tel:+494078066616'
		);
		await page.keyboard.press('Escape');
		await expect(dialog).toBeHidden();
	});

	test('WhatsApp preview reacts to the buttons', async ({ page }) => {
		await page.goto('/');
		const preview = page.getByRole('group', { name: 'Vorschau der WhatsApp-Erinnerung' });
		await preview.getByRole('button', { name: 'Ich komme' }).click();
		await expect(preview.getByText('Super, dein Termin ist bestätigt.')).toBeVisible();
		await preview.getByRole('button', { name: 'Vorschau zurücksetzen' }).click();
		await expect(preview.getByRole('button', { name: 'Ich komme' })).toBeEnabled();
	});

	test('loads nothing from Instagram before consent', async ({ page }) => {
		const external: string[] = [];
		page.on('request', (r) => {
			const host = new URL(r.url()).hostname;
			if (host !== 'localhost') external.push(host);
		});
		await page.goto('/');
		await page.waitForLoadState('networkidle');
		expect(external).toEqual([]);
	});

	test('book buttons fall back to tel: links without JavaScript', async ({ browser }) => {
		const context = await browser.newContext({ javaScriptEnabled: false });
		await unlockPreview(context);
		const page = await context.newPage();
		await page.goto('/');
		await expect(
			page.locator('#start').getByRole('link', { name: 'Termin vereinbaren' })
		).toHaveAttribute('href', 'tel:+494078066616');
		await expect(page.getByText('Waschen, Schneiden, Epilieren & Model-Rasur')).toBeVisible();
		await context.close();
	});
});

test.describe('Vorschau-Schutz', () => {
	test('shows only the placeholder without access', async ({ page }) => {
		await page.goto('/');
		await expect(page.getByRole('heading', { level: 1 })).toHaveText('Bald online.');
		await expect(page.getByText('Leistungsverzeichnis')).toHaveCount(0);
		await expect(page.getByRole('link', { name: 'Impressum' })).toBeVisible();
	});

	test('keeps legal pages public', async ({ page }) => {
		const response = await page.goto('/impressum');
		expect(response?.status()).toBe(200);
		await expect(page.getByRole('heading', { level: 1 })).toHaveText('Impressum');
	});

	test('asks for a password under /vorschau', async ({ page }) => {
		const response = await page.goto('/vorschau');
		expect(response?.status()).toBe(401);
		expect(response?.headers()['www-authenticate']).toContain('Basic');
	});

	test('rejects a wrong password', async ({ browser }) => {
		const context = await browser.newContext({
			httpCredentials: { username: 'denis', password: 'falsch' }
		});
		const page = await context.newPage();
		const response = await page.goto('/vorschau');
		expect(response?.status()).toBe(401);
		await context.close();
	});

	test('unlocks the real site with the right password, logout locks it again', async ({
		browser
	}) => {
		const context = await browser.newContext({
			httpCredentials: { username: 'denis', password: E2E_PREVIEW_PASSWORD }
		});
		const page = await context.newPage();
		await page.goto('/vorschau');
		await expect(page).toHaveURL(/\/$/);
		await expect(page.getByRole('heading', { level: 1 })).toHaveText(
			'Frisch geschnitten. Ohne Warten.'
		);
		await page.goto('/vorschau/abmelden');
		await expect(page.getByRole('heading', { level: 1 })).toHaveText('Bald online.');
		await context.close();
	});

	test('placeholder has no axe violations', async ({ page }) => {
		await page.goto('/');
		const results = await new AxeBuilder({ page })
			.withTags(['wcag2a', 'wcag2aa', 'wcag22aa'])
			.analyze();
		expect(results.violations).toEqual([]);
	});
});

test.describe('Barrierefreiheit', () => {
	for (const path of ['/', '/impressum', '/datenschutz']) {
		test(`${path} has no axe violations`, async ({ page }) => {
			await page.goto(path);
			const results = await new AxeBuilder({ page })
				.withTags(['wcag2a', 'wcag2aa', 'wcag22aa'])
				.analyze();
			expect(results.violations).toEqual([]);
		});
	}

	test('call dialog has no axe violations', async ({ page }) => {
		await page.goto('/');
		await page.locator('#start').getByRole('link', { name: 'Termin vereinbaren' }).click();
		const dialog = page.getByRole('dialog');
		await expect(dialog).toBeVisible();
		// Einblend-Animation abwarten, sonst misst axe halbtransparente Farben.
		await dialog.evaluate((el) => Promise.all(el.getAnimations().map((a) => a.finished)));
		const results = await new AxeBuilder({ page }).include('dialog').analyze();
		expect(results.violations).toEqual([]);
	});
});
