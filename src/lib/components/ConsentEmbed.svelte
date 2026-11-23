<script lang="ts">
	// Zwei-Klick-Lösung: Externe Inhalte werden erst nach Klick geladen (DSGVO).
	// Phase 0: Nach dem Klick erscheint nur ein Hinweis, die Einbindung folgt in Phase 2.
	let { load, consent, loaded }: { load: string; consent: string; loaded: string } = $props();
	let shown = $state(false);
</script>

<div class="load" aria-live="polite">
	{#if shown}
		<small class="done">{loaded}</small>
	{:else}
		<button type="button" class="btn btn-ghost btn-sm" onclick={() => (shown = true)}>
			{load}
		</button>
		<small>{consent}</small>
	{/if}
</div>

<style>
	.load {
		border: 1px dashed color-mix(in srgb, var(--muted) 45%, transparent);
		border-radius: 10px;
		padding: 16px;
		display: grid;
		gap: 10px;
		justify-items: start;
		background: var(--bg);
	}
	small {
		color: var(--muted);
		font-size: 12px;
		line-height: 1.45;
	}
	.done {
		color: var(--ink);
	}
</style>
