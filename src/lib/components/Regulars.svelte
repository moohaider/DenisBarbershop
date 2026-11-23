<script lang="ts">
	import { regulars } from '#lib/content/home.ts';
	import BookButton from './BookButton.svelte';
	import WhatsAppPreview from './WhatsAppPreview.svelte';
</script>

<section class="section loyal dark" aria-labelledby="regulars-title">
	<div class="wrap grid">
		<div>
			<p class="eyebrow">{regulars.eyebrow}</p>
			<h2 class="h2" id="regulars-title">{regulars.title}</h2>
			<ul>
				{#each regulars.benefits as benefit (benefit)}
					<li>{benefit}</li>
				{/each}
			</ul>
			<BookButton class="btn">{regulars.action}</BookButton>
			<p class="hint">{regulars.hint}</p>
		</div>
		<WhatsAppPreview />
	</div>
</section>

<style>
	.grid {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(0, 300px);
		gap: 36px;
		align-items: center;
	}
	ul {
		margin: 16px 0 22px;
		padding: 0;
		display: grid;
		gap: 10px;
	}
	li {
		list-style: none;
		display: flex;
		gap: 10px;
		align-items: flex-start;
	}
	li::before {
		content: '';
		width: 18px;
		height: 18px;
		flex: 0 0 auto;
		margin-top: 3px;
		border-radius: 50%;
		background: var(--accent);
		mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 18 18'%3E%3Cpath d='M9 0a9 9 0 100 18A9 9 0 009 0zM7.6 12.9L4 9.3l1.3-1.3 2.3 2.3 5-5L14 6.6z'/%3E%3C/svg%3E")
			center / contain no-repeat;
	}
	.hint {
		color: var(--muted);
		font-size: 13px;
		margin: 14px 0 0;
	}
	@media (max-width: 760px) {
		.grid {
			grid-template-columns: 1fr;
		}
	}
</style>
