<script lang="ts">
	import { addressLine, business } from '#lib/content/business.ts';
	import { contact } from '#lib/content/home.ts';
	import OpenStatus from './OpenStatus.svelte';
	import PhotoPlaceholder from './PhotoPlaceholder.svelte';

	let copied = $state(false);
	let telEl: HTMLElement | undefined = $state();

	async function copyPhone() {
		try {
			await navigator.clipboard.writeText(business.phoneDisplay);
			copied = true;
			setTimeout(() => (copied = false), 1600);
		} catch {
			// Fallback: Nummer markieren, damit sie manuell kopiert werden kann.
			if (!telEl) return;
			const range = document.createRange();
			range.selectNodeContents(telEl);
			const selection = getSelection();
			selection?.removeAllRanges();
			selection?.addRange(range);
		}
	}

	const socials = [
		{ label: 'Instagram', url: business.instagram.url },
		...(business.tiktok ? [{ label: 'TikTok', url: business.tiktok.url }] : []),
		{ label: 'Google', url: business.googleMapsUrl }
	];
</script>

<section class="section" id="kontakt" aria-labelledby="contact-title">
	<div class="wrap">
		<div class="section-head">
			<p class="eyebrow">{contact.eyebrow}</p>
			<h2 class="h2" id="contact-title">{contact.title}</h2>
		</div>
		<div class="contact">
			<div class="list">
				<div><OpenStatus /></div>
				<div>
					<h3>{contact.address}</h3>
					<p>{addressLine}</p>
					<div class="route inline">
						<a
							class="btn btn-ghost btn-sm"
							href={business.routeUrl}
							target="_blank"
							rel="external noopener"
						>
							{contact.route}
						</a>
					</div>
				</div>
				<div>
					<h3>{contact.hoursTitle}</h3>
					<dl class="hours">
						{#each contact.hours as row (row.days)}
							<dt>{row.days}</dt>
							<dd>{row.time}</dd>
						{/each}
					</dl>
				</div>
				<div>
					<h3>{contact.phone}</h3>
					<div class="inline">
						<a class="tel" href="tel:{business.phoneE164}" bind:this={telEl}>
							{business.phoneDisplay}
						</a>
						<button
							type="button"
							class="btn btn-ghost btn-sm"
							onclick={copyPhone}
							aria-live="polite"
						>
							{copied ? contact.copied : contact.copy}
						</button>
					</div>
				</div>
				<div>
					<h3>{contact.social}</h3>
					<div class="inline">
						{#each socials as s (s.label)}
							<a class="btn btn-ghost btn-sm" href={s.url} target="_blank" rel="external noopener">
								{s.label}
							</a>
						{/each}
					</div>
				</div>
			</div>
			<PhotoPlaceholder
				class="map"
				icon="pin"
				title={contact.mapPhoto.title}
				text={contact.mapPhoto.text}
			/>
		</div>
	</div>
</section>

<style>
	.contact {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
		gap: 28px;
	}
	.contact :global(.map) {
		min-height: 260px;
	}
	.list {
		display: grid;
		gap: 20px;
		align-content: start;
	}
	h3 {
		font-size: 12px;
		font-weight: 600;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--muted);
		margin: 0 0 4px;
	}
	p {
		margin: 0;
		font-size: 17px;
	}
	.hours {
		display: grid;
		grid-template-columns: auto 1fr;
		gap: 2px 18px;
		font-variant-numeric: tabular-nums;
		font-size: 17px;
		margin: 0;
	}
	dd {
		margin: 0;
	}
	.route {
		margin-top: 8px;
	}
	.inline {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
		align-items: center;
	}
	.tel {
		font-size: 20px;
		font-weight: 600;
		font-variant-numeric: tabular-nums;
		text-decoration: none;
	}
	@media (max-width: 760px) {
		.contact {
			grid-template-columns: 1fr;
		}
	}
</style>
