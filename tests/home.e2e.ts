import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

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
		const page = await context.newPage();
		await page.goto('/');
		await expect(
			page.locator('#start').getByRole('link', { name: 'Termin vereinbaren' })
		).toHaveAttribute('href', 'tel:+494078066616');
		await expect(page.getByText('Waschen, Schneiden, Epilieren & Model-Rasur')).toBeVisible();
		await context.close();
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
