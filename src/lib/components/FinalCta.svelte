<script lang="ts">
	import { finalCta } from '#lib/content/home.ts';
	import BookButton from './BookButton.svelte';
</script>

<section class="section final" aria-labelledby="final-title">
	<div class="wrap">
		<h2 id="final-title">{finalCta.title}</h2>
		<p>{finalCta.text}</p>
		<BookButton class="btn btn-lg">{finalCta.action}</BookButton>
	</div>
</section>

<style>
	.final {
		text-align: center;
		background: var(--color-brg);
		color: #fff;
		border-top: 0;
	}
	h2 {
		font-size: clamp(40px, 7vw, 68px);
		font-weight: 800;
		line-height: 1.08;
		letter-spacing: -0.02em;
		margin: 0;
	}
	p {
		opacity: 0.85;
		margin: 12px auto 0;
		max-width: 46ch;
	}
	.final :global(.btn) {
		margin-top: 24px;
		background: var(--color-surface);
		color: var(--color-brg);
	}
</style>
