<script lang="ts">
	import { business } from '#lib/content/business.ts';
	import { booking } from '#lib/content/home.ts';
	import BookButton from './BookButton.svelte';
</script>

<!-- Platz des späteren Buchungs-Widgets (Phase 1). Bis dahin erklärt es den Ablauf. -->
<section class="section" id="termin" aria-labelledby="booking-title">
	<div class="wrap narrow">
		<div class="section-head">
			<p class="label">{booking.label}</p>
			<h2 class="h2" id="booking-title">{booking.title}</h2>
			<p class="sub">{booking.sub}</p>
		</div>

		<div class="widget card">
			<ol class="steps">
				{#each booking.steps as step (step.title)}
					<li>
						<b>{step.title}</b>
						<span>{step.text}</span>
					</li>
				{/each}
			</ol>

			<div class="grid">
				<div class="modes">
					<div class="mode">
						<h3>{booking.fixed.title}</h3>
						<p>{booking.fixed.text}</p>
					</div>
					<div class="mode">
						<h3>{booking.waitlist.title}</h3>
						<p>{booking.waitlist.text}</p>
					</div>
				</div>
				<aside class="summary">
					<p class="label">{booking.summaryLabel}</p>
					<p class="big">{booking.summaryTitle}</p>
					<a class="tel" href="tel:{business.phoneE164}">{business.phoneDisplay}</a>
					<p class="small">{booking.summaryText}</p>
					<BookButton class="btn">{booking.action}</BookButton>
				</aside>
			</div>
		</div>
	</div>
</section>

<style>
	.narrow {
		max-width: 1152px;
	}
	.widget {
		padding: clamp(20px, 3.5vw, 32px);
		display: grid;
		gap: 24px;
	}
	.steps {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 12px;
		margin: 0;
		padding: 0;
		list-style: none;
	}
	.steps li {
		background: var(--color-chip);
		border-radius: 12px;
		padding: 14px 16px;
		display: grid;
		gap: 4px;
	}
	.steps li:first-child {
		background: var(--color-gold);
		color: var(--accent-ink);
	}
	.steps li:first-child span {
		color: var(--accent-ink);
	}
	.steps b {
		font-size: 14px;
	}
	.steps span {
		font-size: 13px;
		line-height: 1.5;
		color: var(--muted);
	}
	.grid {
		display: grid;
		grid-template-columns: minmax(0, 8fr) minmax(0, 4fr);
		gap: 24px;
		align-items: start;
	}
	.modes {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 12px;
	}
	.mode {
		border: 1px solid color-mix(in srgb, var(--color-black) 15%, transparent);
		border-radius: var(--radius-card);
		padding: 18px;
	}
	h3 {
		font-family: var(--font-serif);
		font-optical-sizing: auto;
		font-weight: 700;
		font-size: 19px;
		line-height: 1.25;
		margin: 0 0 6px;
	}
	.mode p {
		margin: 0;
		font-size: 14px;
		color: var(--muted);
	}
	.summary {
		border: 1px solid var(--line);
		background: color-mix(in srgb, var(--color-paper) 60%, transparent);
		border-radius: var(--radius-card);
		padding: 20px;
		display: grid;
		gap: 8px;
	}
	.summary p {
		margin: 0;
	}
	.big {
		font-weight: 700;
	}
	.tel {
		font-family: var(--font-serif);
		font-optical-sizing: auto;
		font-weight: 700;
		font-size: 26px;
		color: var(--color-gold-deep);
		text-decoration: none;
		font-variant-numeric: lining-nums;
		display: inline-flex;
		align-items: center;
		min-height: 44px;
	}
	.small {
		font-size: 13px;
		color: var(--muted);
	}
	.summary :global(.btn) {
		margin-top: 6px;
	}
	@media (max-width: 860px) {
		.steps,
		.grid,
		.modes {
			grid-template-columns: minmax(0, 1fr);
		}
	}
</style>
