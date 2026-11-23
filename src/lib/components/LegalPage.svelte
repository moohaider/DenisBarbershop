<script lang="ts">
	import type { Snippet } from 'svelte';
	import { resolve } from '$app/paths';
	import { business } from '#lib/content/business.ts';
	import Pole from './Pole.svelte';

	let { title, children }: { title: string; children: Snippet } = $props();
</script>

<svelte:head>
	<title>{title} | {business.name}</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<Pole />
<div class="top dark">
	<div class="wrap"><a class="brand" href={resolve('/')}>{business.name}</a></div>
</div>
<main class="wrap legal">
	<h1>{title}</h1>
	{@render children()}
	<p><a href={resolve('/')}>Zurück zur Startseite</a></p>
</main>

<style>
	.top {
		background: var(--deep);
	}
	.top .wrap {
		padding-block: 14px;
	}
	.brand {
		font-weight: 700;
		font-size: 22px;
		text-decoration: none;
	}
	.legal {
		max-width: 760px;
		padding-block: 40px 64px;
	}
	h1 {
		font-size: clamp(32px, 5vw, 44px);
		line-height: 1.1;
		margin: 0 0 24px;
	}
	.legal :global(h2) {
		font-size: 20px;
		margin: 32px 0 8px;
	}
	.legal :global(p),
	.legal :global(li) {
		max-width: 70ch;
	}
	.legal :global(.todo) {
		background: #fff3cd;
		color: #5c4400;
		border-radius: 4px;
		padding: 0 4px;
	}
</style>
