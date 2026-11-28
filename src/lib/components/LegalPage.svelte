<script lang="ts">
	import type { Snippet } from 'svelte';
	import { resolve } from '$app/paths';
	import { business } from '#lib/content/business.ts';
	import { brand, legal } from '#lib/content/home.ts';
	import Pole from './Pole.svelte';

	let { title, children }: { title: string; children: Snippet } = $props();
</script>

<svelte:head>
	<title>{title} | {business.name}</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<Pole />
<div class="top">
	<div class="wrap">
		<a class="brand" href={resolve('/')}><span>{brand.first}</span> <em>{brand.second}</em></a>
	</div>
</div>
<main class="wrap legal">
	<h1>{title}</h1>
	{@render children()}
	<p class="back"><a href={resolve('/')}>{legal.back}</a></p>
</main>

<style>
	.top {
		border-bottom: 1px solid var(--line);
	}
	.top .wrap {
		display: flex;
		align-items: center;
		min-height: 80px;
	}
	.brand {
		font-family: var(--font-serif);
		font-optical-sizing: auto;
		font-weight: 700;
		font-size: clamp(22px, 2.6vw, 30px);
		line-height: 1;
		letter-spacing: 0.01em;
		text-decoration: none;
		padding-block: 11px;
	}
	.brand span {
		text-transform: uppercase;
	}
	.brand em {
		color: var(--color-gold-deep);
		letter-spacing: 0;
	}
	.back {
		margin-top: 40px;
	}
	.back a {
		display: inline-flex;
		align-items: center;
		min-height: 44px;
		font-weight: 700;
		color: var(--accent-text);
		text-underline-offset: 4px;
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
		background: color-mix(in srgb, var(--color-gold) 30%, var(--color-paper));
		color: var(--color-black);
		border-radius: 4px;
		padding: 0 4px;
	}
</style>
