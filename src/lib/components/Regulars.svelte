<script lang="ts">
	import { regulars } from '#lib/content/home.ts';
	import BookButton from './BookButton.svelte';
	import WhatsAppPreview from './WhatsAppPreview.svelte';
</script>

<section class="section" aria-labelledby="regulars-title">
	<div class="wrap">
		<div class="panel dark">
			<div>
				<p class="label">{regulars.label}</p>
				<h2 class="h2" id="regulars-title">{regulars.title}</h2>
				<ul>
					{#each regulars.benefits as benefit (benefit)}
						<li>{benefit}</li>
					{/each}
				</ul>
				<BookButton class="btn btn-lg">{regulars.action}</BookButton>
			</div>
			<div class="preview">
				<WhatsAppPreview />
				<p class="hint">{regulars.hint}</p>
			</div>
		</div>
	</div>
</section>

<style>
	.panel {
		border-radius: var(--radius-card);
		border: 1px solid color-mix(in srgb, var(--color-gold-deep) 45%, transparent);
		padding: clamp(28px, 5vw, 56px);
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(0, 320px);
		gap: 40px 64px;
		align-items: center;
	}
	.label {
		color: var(--color-gold);
		letter-spacing: 0.25em;
	}
	ul {
		margin: 24px 0 28px;
		padding: 0;
		list-style: none;
		display: grid;
		gap: 12px;
		max-width: 52ch;
	}
	li {
		position: relative;
		padding-left: 22px;
		color: var(--muted);
		font-size: 15px;
	}
	li::before {
		content: '';
		position: absolute;
		left: 0;
		top: 0.6em;
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: var(--color-gold);
	}
	.preview {
		display: grid;
		gap: 12px;
		justify-items: center;
	}
	.hint {
		margin: 0;
		font-size: 13px;
		color: var(--muted);
		text-align: center;
	}
	@media (max-width: 860px) {
		.panel {
			grid-template-columns: minmax(0, 1fr);
		}
	}
</style>
