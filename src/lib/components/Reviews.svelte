<script lang="ts">
	import { business } from '#lib/content/business.ts';
	import { reviews } from '#lib/content/home.ts';
</script>

<!-- Keine Bewertungen erfinden: bis zur Google-Anbindung (Phase 2) nur gekennzeichnete Platzhalter. -->
<div class="reviews" id="bewertungen">
	<p class="label">{reviews.label}</p>
	<h2 class="h2">{reviews.title}</h2>
	<ul>
		{#each reviews.placeholders as title (title)}
			<li class="card">
				<b>{title}</b>
				<p>{reviews.placeholderText}</p>
			</li>
		{/each}
	</ul>
	<div class="actions">
		<a class="btn btn-sm" href={business.googleMapsUrl} target="_blank" rel="external noopener">
			{reviews.write}
		</a>
		<a
			class="btn btn-sm btn-soft"
			href={business.googleMapsUrl}
			target="_blank"
			rel="external noopener"
		>
			{reviews.all}
		</a>
	</div>
</div>

<style>
	ul {
		margin: 20px 0 0;
		padding: 0;
		list-style: none;
		display: grid;
		gap: 14px;
	}
	li {
		padding: 20px;
		border-style: dashed;
		display: grid;
		gap: 6px;
	}
	b {
		font-size: 14px;
	}
	li p {
		margin: 0;
		font-size: 14px;
		line-height: 1.6;
		color: var(--muted);
	}
	.actions {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
		margin-top: 18px;
	}
</style>
