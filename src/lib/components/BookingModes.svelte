<script lang="ts">
	import { bookingModes } from '#lib/content/home.ts';
	import BookButton from './BookButton.svelte';
</script>

<section class="section" aria-labelledby="modes-title">
	<div class="wrap">
		<div class="section-head">
			<p class="eyebrow">{bookingModes.eyebrow}</p>
			<h2 class="h2" id="modes-title">{bookingModes.title}</h2>
		</div>
		<div class="two">
			<div class="way card main">
				<span class="tag">{bookingModes.fixed.tag}</span>
				<h3>{bookingModes.fixed.title}</h3>
				<p>{bookingModes.fixed.text}</p>
				<BookButton class="btn">{bookingModes.fixed.action}</BookButton>
			</div>
			<div class="way card">
				<span class="tag">{bookingModes.waitlist.tag}</span>
				<h3>{bookingModes.waitlist.title}</h3>
				<p>{bookingModes.waitlist.text}</p>
				<BookButton class="btn btn-ghost">{bookingModes.waitlist.action}</BookButton>
			</div>
		</div>
	</div>
</section>

<style>
	.two {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 16px;
	}
	.way {
		padding: 24px;
		display: grid;
		gap: 10px;
		align-content: start;
	}
	.way.main {
		box-shadow: inset 0 0 0 2px var(--accent);
	}
	h3 {
		font-weight: 700;
		font-size: 28px;
		line-height: 1;
		margin: 0;
	}
	p {
		margin: 0;
		color: var(--muted);
	}
	.way :global(.btn) {
		justify-self: start;
		margin-top: 6px;
	}
	.tag {
		font-size: 12px;
		font-weight: 600;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--accent);
	}
	@media (max-width: 760px) {
		.two {
			grid-template-columns: 1fr;
		}
	}
</style>
