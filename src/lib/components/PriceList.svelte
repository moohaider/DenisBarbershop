<script lang="ts">
	import { onMount } from 'svelte';
	import { prices } from '#lib/content/home.ts';
	import { categories, formatPrice, services, type Category } from '#lib/content/services.ts';
	import BookButton from './BookButton.svelte';

	let filter = $state<Category | 'all'>('all');
	// Filter erst mit JavaScript zeigen; ohne JS ist immer die ganze Liste sichtbar.
	let enhanced = $state(false);
	onMount(() => (enhanced = true));

	const visible = $derived(services.filter((s) => filter === 'all' || s.category === filter));
</script>

<!-- Rechte Spalte der Magazin-Ansicht: das Leistungsverzeichnis. -->
<section class="menu" id="leistungen" aria-labelledby="prices-title">
	<div class="head">
		<div>
			<p class="label">{prices.label}</p>
			<h2 class="h2" id="prices-title">{prices.title}</h2>
		</div>
		{#if enhanced}
			<div class="tabs" role="group" aria-label={prices.filterLabel}>
				{#each ['all' as const, ...categories] as c (c)}
					<button type="button" aria-pressed={filter === c} onclick={() => (filter = c)}>
						{c === 'all' ? prices.all : c}
					</button>
				{/each}
			</div>
		{/if}
	</div>

	<ul>
		{#each visible as s (s.id)}
			<li class="card">
				<div class="top">
					<h3>{s.name}</h3>
					<span class="price">{formatPrice(s.priceCents)}</span>
				</div>
				<p class="meta">{prices.duration} {s.durationMin} Min. <span>{s.category}</span></p>
				<p class="desc">{s.description}</p>
				<div class="foot">
					<BookButton class="link" label="{s.name}: {prices.action}">{prices.action}</BookButton>
				</div>
			</li>
		{/each}
	</ul>
</section>

<style>
	.head {
		display: flex;
		flex-wrap: wrap;
		align-items: flex-end;
		justify-content: space-between;
		gap: 16px;
		margin-bottom: 24px;
	}
	.tabs {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
	}
	.tabs button {
		font: 600 12px var(--font-sans);
		border: 0;
		border-radius: 12px;
		padding: 8px 14px;
		min-height: 44px;
		background: var(--color-chip);
		color: var(--color-black);
		cursor: pointer;
	}
	.tabs button:hover {
		background: var(--color-chip-hover);
	}
	.tabs button[aria-pressed='true'] {
		background: var(--color-gold);
		color: var(--accent-ink);
		font-weight: 700;
	}
	ul {
		margin: 0;
		padding: 0;
		list-style: none;
		display: grid;
		gap: 14px;
	}
	li {
		padding: clamp(18px, 2.4vw, 24px);
		display: grid;
		gap: 8px;
		transition: border-color 0.15s;
	}
	li:hover {
		border-color: color-mix(in srgb, var(--color-gold-deep) 70%, transparent);
	}
	.top {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 12px;
	}
	h3 {
		font-family: var(--font-serif);
		font-optical-sizing: auto;
		font-weight: 700;
		font-size: clamp(18px, 1.8vw, 21px);
		line-height: 1.25;
		margin: 0;
	}
	.price {
		font-family: var(--font-serif);
		font-optical-sizing: auto;
		font-weight: 700;
		font-size: 21px;
		line-height: 1.2;
		color: var(--color-gold-deep);
		white-space: nowrap;
		flex: 0 0 auto;
	}
	.meta {
		margin: 0;
		font-size: 12px;
		color: var(--muted);
		display: flex;
		flex-wrap: wrap;
		gap: 4px 10px;
	}
	.meta span {
		font-weight: 600;
	}
	.desc {
		margin: 0;
		font-size: 14px;
		line-height: 1.6;
		color: var(--muted);
		max-width: 60ch;
	}
	.foot {
		display: flex;
		justify-content: flex-end;
		margin-top: 6px;
		border-top: 1px solid var(--line);
	}
	.foot :global(.link) {
		font-size: 13px;
		font-weight: 700;
		color: var(--accent-text);
		text-decoration: none;
		padding: 6px 0 0;
		display: inline-flex;
		align-items: center;
		min-height: 44px;
	}
	.foot :global(.link:hover) {
		text-decoration: underline;
		text-underline-offset: 3px;
	}
</style>
