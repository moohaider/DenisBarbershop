<script lang="ts">
	import { onMount } from 'svelte';
	import { prices } from '#lib/content/home.ts';
	import { categories, formatPrice, services, type Category } from '#lib/content/services.ts';
	import BookButton from './BookButton.svelte';

	let filter = $state<Category | 'all'>('all');
	// Filter-Chips erst mit JavaScript zeigen; ohne JS ist immer die ganze Liste sichtbar.
	let enhanced = $state(false);
	onMount(() => (enhanced = true));

	const visible = $derived(categories.filter((c) => filter === 'all' || filter === c));
</script>

<section class="section" id="leistungen" aria-labelledby="prices-title">
	<div class="wrap">
		<div class="section-head">
			<p class="eyebrow">{prices.eyebrow}</p>
			<h2 class="h2" id="prices-title">{prices.title}</h2>
			<p class="sub">{prices.sub}</p>
		</div>

		{#if enhanced}
			<div class="chips" role="group" aria-label={prices.filterLabel}>
				{#each ['all' as const, ...categories] as c (c)}
					<button
						type="button"
						class="chip"
						aria-pressed={filter === c}
						onclick={() => (filter = c)}
					>
						{c === 'all' ? prices.all : c}
					</button>
				{/each}
			</div>
		{/if}

		{#each visible as category (category)}
			<h3 class="cat">{category}</h3>
			<ul>
				{#each services.filter((s) => s.category === category) as s (s.id)}
					<li class="row">
						<b>{s.name}</b>
						<small>{s.durationMin} Min.</small>
						<span class="price">{formatPrice(s.priceCents)}</span>
						<BookButton class="btn btn-sm btn-ghost" label="{s.name} anfragen">
							{prices.action}
						</BookButton>
					</li>
				{/each}
			</ul>
		{/each}
	</div>
</section>

<style>
	.chips {
		display: flex;
		gap: 8px;
		overflow-x: auto;
		padding: 2px 2px 6px;
		margin-bottom: 10px;
		scrollbar-width: none;
	}
	.chip {
		flex: 0 0 auto;
		font: 500 14px var(--font-sans);
		color: var(--muted);
		background: transparent;
		border: 1px solid var(--line);
		border-radius: 999px;
		padding: 8px 14px;
		min-height: 44px;
		cursor: pointer;
	}
	.chip[aria-pressed='true'] {
		background: var(--accent);
		color: var(--accent-ink);
		border-color: var(--accent);
		font-weight: 600;
	}
	.cat {
		font-size: 12px;
		font-weight: 600;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--accent);
		padding: 22px 0 4px;
		margin: 0;
	}
	ul {
		margin: 0;
		padding: 0;
		list-style: none;
	}
	.row {
		display: grid;
		grid-template-columns: minmax(0, 1fr) auto auto;
		gap: 4px 16px;
		align-items: center;
		padding-block: 13px;
		border-bottom: 1px solid var(--line);
	}
	.row b {
		font-weight: 600;
		font-size: 17px;
	}
	.row small {
		color: var(--muted);
		grid-column: 1;
		font-size: 14px;
	}
	.price {
		font-variant-numeric: tabular-nums;
		font-weight: 700;
		font-size: 18px;
		color: var(--accent);
		grid-row: 1 / 3;
		grid-column: 2;
	}
	.row :global(.btn) {
		grid-row: 1 / 3;
		grid-column: 3;
	}
</style>
