// Screenshots für den Design-Check: Seiten auf Desktop, iPhone 13 und Pixel 7 plus die Kundenvorlage.
// Aufruf: node .claude/skills/design-check/shoot.mjs [pfad ...]   (Standard: /)
// Voraussetzung: `npm run preview` läuft auf Port 4173.
import { chromium, devices } from '@playwright/test';
import { mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

const base = process.env.BASE_URL ?? 'http://localhost:4173';
const paths = process.argv.slice(2).length ? process.argv.slice(2) : ['/'];
const out = resolve('test-results/design-check');
mkdirSync(out, { recursive: true });

const targets = [
	{ name: 'desktop', options: { viewport: { width: 1280, height: 900 } } },
	{ name: 'iphone-13', options: devices['iPhone 13'] },
	{ name: 'pixel-7', options: devices['Pixel 7'] }
];

const browser = await chromium.launch();
for (const t of targets) {
	const context = await browser.newContext(t.options);
	const page = await context.newPage();
	for (const p of paths) {
		await page.goto(base + p, { waitUntil: 'networkidle' });
		const slug = p === '/' ? 'start' : p.replace(/\W+/g, '-').replace(/^-|-$/g, '');
		const overflow = await page.evaluate(
			() => document.documentElement.scrollWidth - window.innerWidth
		);
		await page.screenshot({ path: `${out}/${slug}-${t.name}.png`, fullPage: true });
		console.log(`${slug} ${t.name}: ${overflow > 0 ? `${overflow}px horizontaler Überlauf!` : 'ok'}`);
	}
	if (t.name === 'desktop') {
		await page.goto('file://' + resolve('docs/design/vorlage-kupfer-tabak.html'));
		await page.waitForTimeout(1500);
		await page.screenshot({ path: `${out}/vorlage-desktop.png`, fullPage: true });
	}
	await context.close();
}
await browser.close();
console.log(`Screenshots in ${out}`);
