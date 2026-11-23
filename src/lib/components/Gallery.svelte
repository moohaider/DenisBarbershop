<script lang="ts">
	import { business } from '#lib/content/business.ts';
	import { gallery, social } from '#lib/content/home.ts';
	import ConsentEmbed from './ConsentEmbed.svelte';
	import PhotoPlaceholder from './PhotoPlaceholder.svelte';

	const networks = [
		{ ...social.instagram, account: business.instagram },
		{ ...social.tiktok, account: business.tiktok }
	].filter((n) => n.account !== null);
</script>

<section class="section" id="galerie" aria-labelledby="gallery-title">
	<div class="wrap">
		<div class="section-head">
			<p class="eyebrow">{gallery.eyebrow}</p>
			<h2 class="h2" id="gallery-title">{gallery.title}</h2>
			<p class="sub">{gallery.sub}</p>
		</div>
		<div class="gal">
			{#each gallery.photos as photo (photo.title)}
				<PhotoPlaceholder class={photo.shape} title={photo.title} text={photo.text} />
			{/each}
		</div>

		<div class="socgrid">
			{#each networks as n (n.network)}
				<div class="soc card">
					<span class="net">{n.network}</span>
					<p class="handle">{n.account?.handle}</p>
					<p>{n.text}</p>
					<ConsentEmbed load={n.load} consent={n.consent} loaded={n.loaded} />
					<a class="btn btn-sm" href={n.account?.url} target="_blank" rel="external noopener">
						{n.follow}
					</a>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	.gal {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 12px;
	}
	.gal :global(.square) {
		aspect-ratio: 1;
	}
	.gal :global(.tall) {
		grid-row: span 2;
	}
	.gal :global(.wide) {
		grid-column: span 2;
	}
	@media (max-width: 640px) {
		.gal {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
		.gal :global(.wide) {
			aspect-ratio: 2 / 1;
		}
	}
	.socgrid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 16px;
		margin-top: 28px;
	}
	.soc {
		padding: 20px;
		display: grid;
		gap: 12px;
		align-content: start;
	}
	.soc :global(.btn) {
		justify-self: start;
	}
	.net {
		font-size: 12px;
		font-weight: 700;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--accent);
	}
	.handle {
		font-weight: 700;
		font-size: 22px;
		margin: 0;
		color: var(--ink);
	}
	p {
		margin: 0;
		color: var(--muted);
		font-size: 15px;
	}
	@media (max-width: 760px) {
		.socgrid {
			grid-template-columns: 1fr;
		}
	}
</style>
