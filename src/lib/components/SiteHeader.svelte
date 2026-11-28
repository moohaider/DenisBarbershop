<script lang="ts">
	import { brand, headerCta, nav } from '#lib/content/home.ts';
	import BookButton from './BookButton.svelte';
	import OpenStatus from './OpenStatus.svelte';
</script>

<div class="top">
	<div class="wrap row">
		<a class="brand" href="#start"><span>{brand.first}</span> <em>{brand.second}</em></a>
		<nav aria-label="Seitenbereiche">
			{#each nav as item (item.id)}
				<a href="#{item.id}">{item.label}</a>
			{/each}
		</nav>
		<div class="side">
			<span class="status"><OpenStatus /></span>
			<BookButton class="btn btn-sm btn-dark">{headerCta}</BookButton>
		</div>
	</div>
</div>

<style>
	.top {
		position: sticky;
		top: env(safe-area-inset-top, 0px);
		z-index: 9;
		background: color-mix(in srgb, var(--color-paper) 95%, transparent);
		backdrop-filter: blur(8px);
		border-bottom: 1px solid var(--line);
	}
	.row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 24px;
		min-height: 80px;
	}
	.brand {
		font-family: var(--font-serif);
		font-optical-sizing: auto;
		font-weight: 700;
		font-size: clamp(22px, 2.6vw, 30px);
		line-height: 1;
		text-decoration: none;
		white-space: nowrap;
	}
	.brand {
		letter-spacing: 0.01em;
		padding-block: 11px;
	}
	.brand span {
		text-transform: uppercase;
	}
	.brand em {
		color: var(--color-gold-deep);
		letter-spacing: 0;
	}
	nav {
		display: flex;
		gap: 28px;
		font-size: 12px;
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--muted);
	}
	nav a {
		text-decoration: none;
		padding-block: 12px;
	}
	nav a:hover {
		color: var(--accent-text);
	}
	.side {
		display: flex;
		align-items: center;
		gap: 16px;
	}
	.status {
		font-size: 12px;
		color: var(--muted);
	}
	.status :global(.open) {
		font-weight: 600;
	}
	@media (max-width: 1100px) {
		nav {
			display: none;
		}
	}
	@media (max-width: 760px) {
		.status {
			display: none;
		}
		.row {
			min-height: 68px;
		}
	}
</style>
