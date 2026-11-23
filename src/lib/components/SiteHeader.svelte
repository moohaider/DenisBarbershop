<script lang="ts">
	import { business } from '#lib/content/business.ts';
	import { headerCta, nav } from '#lib/content/home.ts';
	import BookButton from './BookButton.svelte';
</script>

<div class="top dark">
	<div class="wrap row">
		<a class="brand" href="#start">{business.name}</a>
		<nav aria-label="Seitenbereiche">
			{#each nav as item (item.id)}
				<a href="#{item.id}">{item.label}</a>
			{/each}
		</nav>
		<BookButton class="btn btn-sm cta">{headerCta}</BookButton>
	</div>
</div>

<style>
	.top {
		position: sticky;
		top: env(safe-area-inset-top, 0px);
		z-index: 9;
		background: var(--deep);
	}
	.top :global(.cta.btn) {
		background: var(--color-surface);
		color: var(--deep);
		box-shadow: none;
	}
	.row {
		display: flex;
		align-items: center;
		gap: 20px;
		padding-block: 10px;
	}
	.brand {
		font-weight: 700;
		font-size: 26px;
		line-height: 1;
		color: var(--accent);
		text-decoration: none;
		white-space: nowrap;
	}
	nav {
		display: flex;
		gap: 22px;
		margin-left: auto;
		font-weight: 500;
		font-size: 15px;
	}
	nav a {
		text-decoration: none;
		color: rgba(255, 255, 255, 0.82);
		padding-block: 10px;
	}
	nav a:hover {
		color: #fff;
		text-decoration: underline;
	}
	@media (max-width: 760px) {
		nav {
			display: none;
		}
		.row :global(.cta) {
			margin-left: auto;
		}
	}
	@media (max-width: 430px) {
		.brand {
			font-size: 20px;
		}
		.row {
			gap: 10px;
		}
	}
</style>
