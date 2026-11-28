<script lang="ts">
	import { business } from '#lib/content/business.ts';
	import { lookbook, social } from '#lib/content/home.ts';
	import BookButton from './BookButton.svelte';
	import ConsentEmbed from './ConsentEmbed.svelte';
	import PhotoPlaceholder from './PhotoPlaceholder.svelte';

	const networks = [
		{ ...social.instagram, account: business.instagram },
		{ ...social.tiktok, account: business.tiktok }
	].filter((n) => n.account !== null);
</script>

<section class="section" id="lookbook" aria-labelledby="lookbook-title">
	<div class="wrap">
		<div class="section-head">
			<p class="label">{lookbook.label}</p>
			<h2 class="h2" id="lookbook-title">{lookbook.title}</h2>
		</div>

		<ul class="looks">
			{#each lookbook.looks as look, i (look.title)}
				<li class="card look">
					<PhotoPlaceholder class="pic" title="Foto {i + 1}" text={look.photo} />
					<div class="body">
						<div class="row">
							<span class="tag">{look.tag}</span>
							<span class="num" aria-hidden="true">0{i + 1}</span>
						</div>
						<h3>{look.title}</h3>
						<p>{look.text}</p>
						<BookButton class="link" label="{look.title}: {lookbook.action}">
							{lookbook.action}
						</BookButton>
					</div>
				</li>
			{/each}
		</ul>

		<div class="socials" class:single={networks.length === 1}>
			{#each networks as n (n.network)}
				<div class="card soc">
					<h3>{n.network} <span>{n.account?.handle}</span></h3>
					<p>{n.text}</p>
					<ConsentEmbed load={n.load} consent={n.consent} loaded={n.loaded} />
					<a
						class="btn btn-sm btn-dark"
						href={n.account?.url}
						target="_blank"
						rel="external noopener"
					>
						{n.follow}
					</a>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	.looks {
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		gap: 20px;
		margin: 0;
		padding: 0;
		list-style: none;
	}
	.look {
		overflow: hidden;
		display: grid;
		grid-template-rows: auto 1fr;
		transition:
			transform 0.2s,
			border-color 0.2s;
	}
	.look:hover {
		border-color: var(--color-gold-deep);
	}
	@media (prefers-reduced-motion: no-preference) {
		.look:hover {
			transform: translateY(-4px);
		}
	}
	.look :global(.pic) {
		aspect-ratio: 4 / 5;
		border-radius: 0;
		border: 0;
		border-bottom: 1px solid var(--line);
	}
	.body {
		padding: 20px;
		display: grid;
		gap: 8px;
		align-content: start;
	}
	.row {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.tag {
		font-size: 10px;
		font-weight: 700;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		background: var(--color-gold);
		color: var(--accent-ink);
		border-radius: 8px;
		padding: 4px 10px;
	}
	.num {
		font-family: var(--font-serif);
		font-weight: 700;
		font-size: 24px;
		color: var(--color-gold-deep);
	}
	h3 {
		font-family: var(--font-serif);
		font-optical-sizing: auto;
		font-weight: 700;
		font-size: 20px;
		line-height: 1.2;
		margin: 6px 0 0;
	}
	.body p {
		margin: 0;
		font-size: 13px;
		line-height: 1.6;
		color: var(--muted);
	}
	.body :global(.link) {
		font-size: 13px;
		font-weight: 700;
		color: var(--accent-text);
		text-decoration: none;
		justify-self: start;
		display: inline-flex;
		align-items: center;
		min-height: 44px;
	}
	.body :global(.link:hover) {
		text-decoration: underline;
		text-underline-offset: 3px;
	}
	.socials {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 20px;
		margin-top: 28px;
	}
	.soc {
		padding: 24px;
		display: grid;
		gap: 12px;
		justify-items: start;
		align-content: start;
	}
	.soc h3 {
		margin: 0;
		font-size: 22px;
	}
	.soc h3 span {
		font-family: var(--font-sans);
		font-weight: 600;
		font-size: 14px;
		color: var(--muted);
		margin-left: 6px;
	}
	.soc p {
		margin: 0;
		font-size: 14px;
		line-height: 1.6;
		color: var(--muted);
	}
	.single {
		grid-template-columns: minmax(0, 1fr);
	}
	@media (min-width: 761px) {
		.single .soc {
			grid-template-columns: minmax(0, 1fr) minmax(0, 420px);
			column-gap: 40px;
			align-items: center;
		}
		.single .soc > :global(*) {
			grid-column: 1;
		}
		.single .soc > :global(.load) {
			grid-column: 2;
			grid-row: 1 / span 3;
			align-self: center;
			justify-self: stretch;
		}
	}
	@media (max-width: 1024px) {
		.looks {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}
	@media (max-width: 760px) {
		.socials {
			grid-template-columns: minmax(0, 1fr);
		}
	}
	@media (max-width: 520px) {
		.looks {
			grid-template-columns: minmax(0, 1fr);
		}
		.look :global(.pic) {
			aspect-ratio: 16 / 10;
		}
	}
</style>
