<script lang="ts">
	import { onMount } from 'svelte';
	import { addressLine, business, openingHours } from '#lib/content/business.ts';
	import { contact } from '#lib/content/home.ts';
	import { toLocalTime } from '#lib/domain/opening.ts';
	import Reviews from './Reviews.svelte';

	const days = [
		[1, 'Montag'],
		[2, 'Dienstag'],
		[3, 'Mittwoch'],
		[4, 'Donnerstag'],
		[5, 'Freitag'],
		[6, 'Samstag'],
		[7, 'Sonntag']
	] as const;
	const clock = (m: number) =>
		`${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;

	// Der heutige Tag wird im Browser bestimmt, damit gecachte Seiten stimmen.
	let today = $state(0);
	onMount(() => (today = toLocalTime(new Date()).weekday));

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
	<div class="wrap grid">
		<Reviews />

		<div>
			<p class="label">{contact.label}</p>
			<h2 class="h2" id="contact-title">{contact.title}</h2>
			<div class="card box">
				<div>
					<h3>{contact.address}</h3>
					<p class="strong">{addressLine}</p>
					<a class="link" href={business.routeUrl} target="_blank" rel="external noopener">
						{contact.route}
					</a>
				</div>
				<div>
					<h3>{contact.phone}</h3>
					<div class="inline">
						<a class="tel" href="tel:{business.phoneE164}" bind:this={telEl}>
							{business.phoneDisplay}
						</a>
						<button
							type="button"
							class="btn btn-sm btn-soft"
							onclick={copyPhone}
							aria-live="polite"
						>
							{copied ? contact.copied : contact.copy}
						</button>
					</div>
				</div>
				<div class="hours">
					<h3>{contact.hoursTitle}</h3>
					<ul>
						{#each days as [n, name] (n)}
							{@const h = openingHours[n]}
							<li class:today={today === n}>
								<span>{name} {today === n ? contact.today : ''}</span>
								<span>{h ? `${clock(h.opens)} – ${clock(h.closes)}` : contact.closed}</span>
							</li>
						{/each}
					</ul>
				</div>
				<div>
					<h3>{contact.social}</h3>
					<div class="inline">
						{#each socials as s (s.label)}
							<a class="btn btn-sm btn-soft" href={s.url} target="_blank" rel="external noopener">
								{s.label}
							</a>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.grid {
		display: grid;
		grid-template-columns: minmax(0, 7fr) minmax(0, 5fr);
		gap: 40px;
		align-items: start;
	}
	.box {
		margin-top: 20px;
		padding: 24px;
		display: grid;
		gap: 18px;
	}
	.box > div + div {
		padding-top: 16px;
		border-top: 1px solid color-mix(in srgb, var(--color-black) 12%, transparent);
	}
	h3 {
		font-size: 12px;
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--muted);
		margin: 0 0 4px;
	}
	.strong {
		margin: 0;
		font-weight: 700;
	}
	.link {
		display: inline-flex;
		align-items: center;
		min-height: 44px;
		font-size: 13px;
		font-weight: 700;
		color: var(--accent-text);
		text-decoration: none;
	}
	.link:hover {
		text-decoration: underline;
		text-underline-offset: 3px;
	}
	.inline {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 10px 14px;
	}
	.tel {
		font-weight: 700;
		color: var(--accent-text);
		text-decoration: none;
		font-size: 17px;
		font-variant-numeric: tabular-nums;
		display: inline-flex;
		align-items: center;
		min-height: 44px;
	}
	.hours ul {
		margin: 6px 0 0;
		padding: 0;
		list-style: none;
		display: grid;
		gap: 6px;
		font-size: 14px;
	}
	.hours li {
		display: flex;
		justify-content: space-between;
		gap: 12px;
		font-variant-numeric: tabular-nums;
	}
	.hours li.today {
		font-weight: 700;
		color: var(--accent-text);
	}
	@media (max-width: 1024px) {
		.grid {
			grid-template-columns: minmax(0, 1fr);
		}
	}
</style>
