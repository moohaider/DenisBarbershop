<script lang="ts">
	import { business } from '#lib/content/business.ts';
	import { reviews } from '#lib/content/home.ts';
</script>

<!-- Keine Bewertungen erfinden: bis zur Google-Anbindung (Phase 2) nur gekennzeichnete Platzhalter. -->
<section class="section" id="bewertungen" aria-labelledby="reviews-title">
	<div class="wrap">
		<div class="top">
			<div>
				<p class="eyebrow">{reviews.eyebrow}</p>
				<h2 class="h2" id="reviews-title">{reviews.title}</h2>
			</div>
			<div class="score">
				<span class="num" aria-hidden="true">–</span>
				<div>
					<span class="stars" aria-hidden="true">★★★★★</span>
					<small>{reviews.countLabel}</small>
				</div>
			</div>
		</div>
		<div class="revs">
			{#each reviews.placeholders as text (text)}
				<div class="rev">
					<b>{reviews.placeholderTitle}</b>
					<p>{text}</p>
				</div>
			{/each}
		</div>
		<div class="actions">
			<a class="btn" href={business.googleMapsUrl} target="_blank" rel="external noopener">
				{reviews.write}
			</a>
			<a
				class="btn btn-ghost"
				href={business.googleMapsUrl}
				target="_blank"
				rel="external noopener"
			>
				{reviews.all}
			</a>
		</div>
	</div>
</section>

<style>
	.top {
		display: flex;
		flex-wrap: wrap;
		gap: 16px 28px;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 22px;
	}
	.score {
		display: flex;
		align-items: center;
		gap: 14px;
	}
	.num {
		font-weight: 800;
		font-size: 56px;
		line-height: 1;
		color: var(--accent);
	}
	.stars {
		color: var(--line);
		font-size: 22px;
		letter-spacing: 2px;
	}
	.score small {
		display: block;
		color: var(--muted);
	}
	.revs {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 14px;
	}
	.rev {
		border-radius: var(--radius-card);
		padding: 18px;
		display: grid;
		gap: 8px;
		align-content: start;
		background: var(--raise);
		border: 1px dashed color-mix(in srgb, var(--muted) 45%, transparent);
		color: var(--muted);
	}
	.rev b {
		color: var(--ink);
	}
	.rev p {
		margin: 0;
		font-size: 15px;
	}
	.actions {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
		margin-top: 20px;
	}
	@media (max-width: 760px) {
		.revs {
			grid-template-columns: 1fr;
		}
	}
</style>
