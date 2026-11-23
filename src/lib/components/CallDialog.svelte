<script lang="ts">
	import { addressLine, business } from '#lib/content/business.ts';
	import { callDialog as t } from '#lib/content/home.ts';
	import { callDialog } from '#lib/call-dialog.svelte.ts';

	let dialog: HTMLDialogElement | undefined = $state();

	// Native <dialog> mit showModal(): Fokus-Falle, Esc schließt, Fokus kehrt zum Auslöser zurück.
	$effect(() => {
		if (!dialog) return;
		if (callDialog.open && !dialog.open) dialog.showModal();
		if (!callDialog.open && dialog.open) dialog.close();
	});

	function onBackdropClick(event: MouseEvent) {
		if (event.target === dialog) callDialog.open = false;
	}
</script>

<dialog
	bind:this={dialog}
	aria-labelledby="call-title"
	onclose={() => (callDialog.open = false)}
	onclick={onBackdropClick}
>
	<div class="head">
		<strong id="call-title">{t.title}</strong>
		<button type="button" class="x" aria-label={t.close} onclick={() => (callDialog.open = false)}>
			×
		</button>
	</div>
	<div class="body">
		<p class="q">{t.heading}</p>
		<p>{t.text}</p>
		<dl class="summary">
			<dt>{t.phone}</dt>
			<dd class="tel">{business.phoneDisplay}</dd>
			<dt>{t.hours}</dt>
			<dd>{t.hoursValue}</dd>
			<dt>{t.address}</dt>
			<dd>{addressLine}</dd>
		</dl>
	</div>
	<div class="foot">
		<button type="button" class="btn btn-ghost" onclick={() => (callDialog.open = false)}>
			{t.close}
		</button>
		<a class="btn" href="tel:{business.phoneE164}">{t.call}</a>
	</div>
</dialog>

<style>
	dialog {
		border: 0;
		padding: 0;
		background: var(--surface);
		color: var(--ink);
		width: min(560px, calc(100vw - 32px));
		max-width: 100vw;
		max-height: min(92dvh, 780px);
		border-radius: 18px;
		margin: auto;
		flex-direction: column;
		overflow: hidden;
		box-shadow: 0 0 0 1px var(--line);
	}
	dialog[open] {
		display: flex;
	}
	dialog::backdrop {
		background: rgba(42, 45, 46, 0.55);
	}
	@media (max-width: 640px) {
		dialog {
			width: 100vw;
			margin: auto 0 0;
			border-radius: 18px 18px 0 0;
			max-height: 94dvh;
		}
	}
	@media (prefers-reduced-motion: no-preference) {
		dialog[open] {
			animation: up 0.22s ease-out;
		}
	}
	@keyframes up {
		from {
			transform: translateY(24px);
			opacity: 0;
		}
	}
	.head {
		padding: 16px 20px 12px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 12px;
		border-bottom: 1px solid var(--line);
	}
	.head strong {
		font-size: 26px;
		font-weight: 700;
		line-height: 1;
	}
	.x {
		font: 600 20px var(--font-sans);
		background: transparent;
		border: 1px solid var(--line);
		color: var(--ink);
		border-radius: 8px;
		width: 44px;
		height: 44px;
		cursor: pointer;
		flex: 0 0 auto;
	}
	.body {
		padding: 16px 20px;
		display: grid;
		gap: 12px;
		overflow-y: auto;
		text-align: center;
	}
	.body p {
		margin: 0;
	}
	.q {
		font-weight: 600;
		font-size: 18px;
	}
	.summary {
		background: var(--bg);
		border: 1px solid var(--line);
		border-radius: 10px;
		padding: 14px;
		display: grid;
		gap: 2px;
		text-align: left;
		margin: 0;
	}
	dt {
		color: var(--muted);
		font-size: 13px;
		margin-top: 6px;
	}
	dt:first-child {
		margin-top: 0;
	}
	dd {
		margin: 0;
	}
	.tel {
		font-size: 20px;
		font-weight: 600;
		font-variant-numeric: tabular-nums;
	}
	.foot {
		padding: 12px 20px calc(12px + env(safe-area-inset-bottom, 0px));
		border-top: 1px solid var(--line);
		display: flex;
		gap: 10px;
		justify-content: space-between;
	}
	.foot .btn:last-child {
		flex: 1;
	}
</style>
