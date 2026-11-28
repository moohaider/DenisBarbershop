<script lang="ts">
	import { resolve } from '$app/paths';
	import { addressLine, business } from '#lib/content/business.ts';
	import { brand, footer } from '#lib/content/home.ts';
	import { comingSoon as t } from '#lib/content/preview.ts';
	import Pole from './Pole.svelte';
</script>

<!-- Platzhalter bis zum Start (ADR-0011): nur Kontaktdaten, keine Buchung, keine externen Inhalte. -->
<div class="page dark">
	<Pole />
	<main class="wrap">
		<p class="brand"><span>{brand.first}</span> <em>{brand.second}</em></p>

		<div class="content">
			<p class="label">{t.label}</p>
			<h1>{t.headline}</h1>
			<p class="lead">{t.text}</p>

			<dl>
				<div>
					<dt>{t.phone}</dt>
					<dd><a class="tel" href="tel:{business.phoneE164}">{business.phoneDisplay}</a></dd>
				</div>
				<div>
					<dt>{t.hours}</dt>
					<dd>{t.hoursValue}</dd>
				</div>
				<div>
					<dt>{t.address}</dt>
					<dd>
						{addressLine}<br />
						<a class="link" href={business.routeUrl} target="_blank" rel="external noopener">
							{t.route}
						</a>
					</dd>
				</div>
				<div>
					<dt>{t.instagram}</dt>
					<dd>
						<a class="link" href={business.instagram.url} target="_blank" rel="external noopener">
							{business.instagram.handle}
						</a>
					</dd>
				</div>
			</dl>

			<a class="btn btn-lg" href="tel:{business.phoneE164}">{t.call}</a>
		</div>
	</main>

	<footer class="wrap">
		<div class="row">
			<span>{business.name} · {addressLine}</span>
			<nav aria-label="Rechtliches">
				<a href={resolve('/impressum')}>{footer.imprint}</a>
				<a href={resolve('/datenschutz')}>{footer.privacy}</a>
			</nav>
		</div>
	</footer>
</div>

<style>
	.page {
		min-height: 100dvh;
		display: grid;
		grid-template-rows: auto 1fr auto;
	}
	/* Inhalt und Fußzeile teilen sich eine zentrierte Spalte. */
	main,
	footer {
		width: 100%;
		max-width: 704px;
	}
	main {
		display: grid;
		align-content: center;
		gap: clamp(32px, 6vw, 64px);
		padding-block: clamp(28px, 5vw, 56px);
	}
	.brand {
		margin: 0;
		font-family: var(--font-serif);
		font-optical-sizing: auto;
		font-weight: 700;
		font-size: clamp(24px, 2.8vw, 32px);
		line-height: 1;
		letter-spacing: 0.01em;
	}
	.brand span {
		text-transform: uppercase;
	}
	.brand em {
		color: var(--color-gold);
		letter-spacing: 0;
	}
	.content {
		max-width: 640px;
		display: grid;
		gap: 16px;
		justify-items: start;
	}
	.label {
		color: var(--color-gold);
		letter-spacing: 0.25em;
	}
	h1 {
		font-size: clamp(56px, 10vw, 112px);
		line-height: 0.95;
		letter-spacing: -0.02em;
		margin: 0;
	}
	.lead {
		margin: 0;
		font-size: clamp(17px, 1.6vw, 19px);
		color: var(--muted);
		max-width: 52ch;
	}
	dl {
		margin: 16px 0 8px;
		width: 100%;
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 20px 32px;
		padding-top: 24px;
		border-top: 1px solid var(--line);
	}
	dt {
		font-size: 12px;
		font-weight: 700;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--muted);
	}
	dd {
		margin: 4px 0 0;
		font-weight: 600;
	}
	.tel {
		font-family: var(--font-serif);
		font-optical-sizing: auto;
		font-weight: 700;
		font-size: 26px;
		color: var(--color-gold);
		text-decoration: none;
		font-variant-numeric: lining-nums;
		display: inline-flex;
		align-items: center;
		min-height: 44px;
	}
	.link {
		display: inline-flex;
		align-items: center;
		min-height: 44px;
		color: var(--color-gold);
		font-weight: 700;
		font-size: 14px;
		text-underline-offset: 4px;
	}
	footer .row {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: center;
		gap: 8px 24px;
		padding-block: 20px;
		border-top: 1px solid var(--line);
		font-size: 13px;
		color: var(--muted);
	}
	footer nav {
		display: flex;
		gap: 20px;
	}
	footer a {
		color: var(--ink);
		font-weight: 600;
		text-underline-offset: 5px;
		display: inline-flex;
		align-items: center;
		min-height: 44px;
	}
	@media (max-width: 560px) {
		dl {
			grid-template-columns: minmax(0, 1fr);
		}
	}
</style>
