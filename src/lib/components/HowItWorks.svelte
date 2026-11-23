<script lang="ts">
	import { howItWorks } from '#lib/content/home.ts';
</script>

<section class="section" aria-labelledby="how-title">
	<div class="wrap">
		<div class="section-head">
			<p class="eyebrow">{howItWorks.eyebrow}</p>
			<h2 class="h2" id="how-title">{howItWorks.title}</h2>
		</div>
		<ol>
			{#each howItWorks.steps as step (step.title)}
				<li class="card"><b>{step.title}</b><span>{step.text}</span></li>
			{/each}
		</ol>
	</div>
</section>

<style>
	ol {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 16px;
		counter-reset: step;
		margin: 0;
		padding: 0;
	}
	li {
		list-style: none;
		padding: 20px;
		counter-increment: step;
	}
	li::before {
		content: counter(step);
		font-weight: 800;
		font-size: 44px;
		line-height: 1;
		color: var(--accent);
		display: block;
		margin-bottom: 8px;
	}
	b {
		display: block;
		font-size: 17px;
	}
	span {
		color: var(--muted);
		font-size: 15px;
	}
	@media (max-width: 760px) {
		ol {
			grid-template-columns: 1fr;
		}
	}
</style>
