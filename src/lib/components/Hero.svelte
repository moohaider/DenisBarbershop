<script lang="ts">
	import { hero } from '#lib/content/home.ts';
	import BookButton from './BookButton.svelte';
	import PhotoPlaceholder from './PhotoPlaceholder.svelte';
</script>

<header class="hero dark" id="start">
	<div class="wrap grid">
		<div>
			<h1>{hero.titleStart} <em>{hero.titleEmphasis}</em></h1>
			<p class="lead">{hero.lead}</p>
			<div class="cta">
				<BookButton class="btn btn-lg">{hero.primary}</BookButton>
				<a class="btn btn-lg btn-ghost" href="#leistungen">{hero.secondary}</a>
			</div>
			<BookButton class="slot">
				<span class="dot dot-pulse"></span>
				<span>{hero.pillText} · <b>{hero.pillAction}</b></span>
			</BookButton>
			<div class="facts">
				{#each hero.facts as fact (fact.title)}
					<div><b>{fact.title}</b>{fact.text}</div>
				{/each}
			</div>
		</div>
		<PhotoPlaceholder class="hero-photo" title={hero.photo.title} text={hero.photo.text} />
	</div>
</header>

<style>
	.grid {
		display: grid;
		grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
		gap: 40px;
		align-items: center;
		padding-block: 56px 48px;
	}
	h1 {
		font-weight: 800;
		font-size: clamp(42px, 7vw, 80px);
		line-height: 1;
		letter-spacing: -0.03em;
		margin: 0;
	}
	h1 em {
		font-style: normal;
		background: var(--deep);
		color: #fff;
		padding: 0 0.14em;
		border-radius: 0.12em;
		-webkit-box-decoration-break: clone;
		box-decoration-break: clone;
	}
	.lead {
		color: var(--muted);
		font-size: 18px;
		max-width: 46ch;
		margin: 18px 0 0;
	}
	.cta {
		display: flex;
		flex-wrap: wrap;
		gap: 12px;
		margin-top: 26px;
	}
	.grid :global(.slot) {
		margin-top: 16px;
		display: inline-flex;
		align-items: center;
		gap: 10px;
		font: 500 15px var(--font-sans);
		color: var(--ink);
		background: var(--surface);
		border: 1px solid var(--line);
		border-radius: 999px;
		padding: 9px 16px;
		min-height: 44px;
		text-decoration: none;
	}
	.grid :global(.slot:hover) {
		border-color: var(--accent);
	}
	.grid :global(.slot b) {
		color: var(--accent);
		font-weight: 600;
	}
	.facts {
		display: flex;
		flex-wrap: wrap;
		gap: 8px 26px;
		margin-top: 30px;
		padding-top: 18px;
		border-top: 1px solid var(--line);
		color: var(--muted);
		font-size: 14px;
	}
	.facts b {
		display: block;
		color: var(--ink);
		font-size: 16px;
		font-weight: 600;
	}
	.grid :global(.hero-photo) {
		aspect-ratio: 4 / 5;
	}
	@media (max-width: 860px) {
		.grid {
			grid-template-columns: 1fr;
			gap: 28px;
			padding-block: 36px;
		}
		.grid :global(.hero-photo) {
			aspect-ratio: 16 / 11;
		}
	}
</style>
