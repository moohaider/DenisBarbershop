<script lang="ts">
	import { placeholderNote } from '#lib/content/home.ts';

	let {
		title,
		text,
		icon = 'camera',
		class: className = ''
	}: { title: string; text: string; icon?: 'camera' | 'pin'; class?: string } = $props();
</script>

<!-- Klar als Platzhalter erkennbar, bis echte Fotos vorliegen. -->
<figure class="ph {className}">
	<figcaption>
		<svg viewBox="0 0 24 24" aria-hidden="true">
			{#if icon === 'pin'}
				<path d="M12 21s7-6.2 7-11.5a7 7 0 00-14 0C5 14.8 12 21 12 21z" />
				<circle cx="12" cy="9.5" r="2.5" />
			{:else}
				<path d="M3 8h4l2-3h6l2 3h4v11H3z" />
				<circle cx="12" cy="13" r="3.5" />
			{/if}
		</svg>
		<b>{title}</b>
		<span><span class="sr-only">{placeholderNote}: </span>{text}</span>
	</figcaption>
</figure>

<style>
	.ph {
		margin: 0;
		position: relative;
		border-radius: var(--radius-card);
		overflow: hidden;
		background: var(--raise);
		border: 1px dashed color-mix(in srgb, var(--muted) 45%, transparent);
		display: grid;
		place-items: center;
		text-align: center;
		color: var(--muted);
		min-height: 140px;
		max-width: 100%;
	}
	figcaption {
		display: grid;
		gap: 6px;
		justify-items: center;
		padding: 14px;
		font-size: 13px;
	}
	b {
		color: var(--ink);
		font-size: 15px;
		font-weight: 600;
	}
	svg {
		width: 28px;
		height: 28px;
		stroke: var(--accent);
		fill: none;
		stroke-width: 1.6;
	}
</style>
