<script lang="ts">
	import { onMount } from 'svelte';
	import { openingHours } from '#lib/content/business.ts';
	import { contact } from '#lib/content/home.ts';
	import { openStatus, openStatusText, toLocalTime } from '#lib/domain/opening.ts';

	// Der Status wird im Browser berechnet, damit gecachte Seiten nie einen falschen Stand zeigen.
	let text = $state(contact.statusFallback);
	let open = $state(true);

	onMount(() => {
		const update = () => {
			const now = toLocalTime(new Date());
			const status = openStatus(openingHours, now);
			open = status.open;
			text = openStatusText(status, now);
		};
		update();
		const timer = setInterval(update, 60_000);
		return () => clearInterval(timer);
	});
</script>

<span class="open" class:closed={!open}><span class="dot"></span><span>{text}</span></span>

<style>
	.open {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		font-weight: 600;
	}
	.closed :global(.dot) {
		background: var(--muted);
	}
</style>
