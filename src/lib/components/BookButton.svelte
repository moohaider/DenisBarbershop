<script lang="ts">
	import type { Snippet } from 'svelte';
	import { business } from '#lib/content/business.ts';
	import { openCallDialog } from '#lib/call-dialog.svelte.ts';

	let {
		class: className = 'btn',
		label,
		children
	}: { class?: string; label?: string; children: Snippet } = $props();
</script>

<!-- Ohne JavaScript ein normaler Anruf-Link, mit JavaScript öffnet sich der Dialog. -->
<a class={className} href="tel:{business.phoneE164}" aria-label={label} onclick={openCallDialog}>
	{@render children()}
</a>
