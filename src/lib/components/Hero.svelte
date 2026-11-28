<script lang="ts">
	import { addressLine, business } from '#lib/content/business.ts';
	import { hero } from '#lib/content/home.ts';
	import BookButton from './BookButton.svelte';
	import OpenStatus from './OpenStatus.svelte';
</script>

<!-- Linke dunkle Säule der Magazin-Ansicht (Vorlage „Kupfer & Tabak“). -->
<header class="pillar-wrap" id="start">
	<div class="pillar dark">
		<p class="label">{hero.label}</p>
		<h1>
			<span class="line">{hero.titleStart}</span>
			<span class="line">{hero.titleEmphasis}</span>
		</h1>
		<p class="lead">{hero.lead}</p>
		<dl class="rows">
			<div>
				<dt>{hero.rows.barber}</dt>
				<dd class="gold">{hero.rows.barberValue}</dd>
			</div>
			<div>
				<dt>{hero.rows.status}</dt>
				<dd><OpenStatus /></dd>
			</div>
			<div>
				<dt>{hero.rows.prices}</dt>
				<dd class="gold">{hero.rows.pricesValue}</dd>
			</div>
			<div>
				<dt>{hero.rows.place}</dt>
				<dd>{addressLine}</dd>
			</div>
		</dl>
		<BookButton class="btn btn-lg cta">{hero.primary}</BookButton>
		<p class="note">
			{hero.note}
			<a href="tel:{business.phoneE164}">{business.phoneDisplay}</a>
		</p>
	</div>
</header>

<style>
	.pillar {
		border-radius: var(--radius-card);
		border: 1px solid color-mix(in srgb, var(--color-gold-deep) 45%, transparent);
		padding: clamp(28px, 4vw, 40px);
		display: grid;
		gap: 22px;
		box-shadow: 0 24px 50px -30px rgba(36, 25, 20, 0.55);
	}
	@media (min-width: 1024px) {
		.pillar {
			position: sticky;
			top: 112px;
		}
	}
	.label {
		color: var(--color-gold);
		letter-spacing: 0.25em;
	}
	@media (max-width: 430px) {
		.label {
			letter-spacing: 0.12em;
		}
	}
	h1 {
		font-size: clamp(40px, 4.4vw, 54px);
		line-height: 1.08;
		margin: 0;
	}
	.line {
		display: block;
	}
	.lead {
		margin: 0;
		font-size: 15px;
		line-height: 1.7;
		color: var(--muted);
	}
	.rows {
		margin: 0;
		padding-top: 14px;
		border-top: 1px solid var(--line);
		display: grid;
		gap: 12px;
		font-size: 13px;
	}
	.rows div {
		display: flex;
		justify-content: space-between;
		gap: 16px;
	}
	dt {
		color: var(--muted);
	}
	dd {
		margin: 0;
		font-weight: 700;
		text-align: right;
	}
	.gold {
		color: var(--color-gold);
	}
	.pillar :global(.cta) {
		width: 100%;
	}
	.note {
		margin: -6px 0 0;
		font-size: 13px;
		color: var(--muted);
		text-align: center;
	}
	.note a {
		color: var(--ink);
		font-weight: 700;
		white-space: nowrap;
	}
</style>
