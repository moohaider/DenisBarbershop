<script lang="ts">
	import { business } from '#lib/content/business.ts';
	import { regulars } from '#lib/content/home.ts';

	const t = regulars.preview;
	let reply = $state<'confirm' | 'cancel' | null>(null);
</script>

<div class="phone" role="group" aria-label={t.label}>
	<div class="ptop">
		<div class="av" aria-hidden="true">D</div>
		<div><b>{business.name}</b><small>{t.account}</small></div>
	</div>
	<div class="chat" aria-live="polite">
		<div class="bub in-msg">{t.reminder}<time>{t.reminderTime}</time></div>
		<div class="qr">
			<button type="button" disabled={reply !== null} onclick={() => (reply = 'confirm')}>
				{t.confirm}
			</button>
			<button type="button" disabled={reply !== null} onclick={() => (reply = 'cancel')}>
				{t.cancel}
			</button>
		</div>
		{#if reply}
			<div class="bub out">
				{reply === 'confirm' ? t.confirm : t.cancel}<time>{t.replyTime}</time>
			</div>
			<div class="bub in-msg">
				{reply === 'confirm' ? t.confirmed : t.cancelled}<time>{t.replyTime}</time>
			</div>
			<button type="button" class="reset" onclick={() => (reply = null)}>{t.reset}</button>
		{/if}
	</div>
</div>

<style>
	.phone {
		--ink: var(--color-ink);
		--muted: var(--color-muted);
		--raise: var(--color-raise);
		--line: var(--color-line);
		--accent: var(--color-brg);
		--accent-ink: var(--color-black);
		color: var(--ink);
		border: 8px solid #171614;
		border-radius: 30px;
		overflow: hidden;
		background: #e9e7e2;
		max-width: 300px;
		width: 100%;
		justify-self: center;
		box-shadow: 0 0 0 1px var(--line);
	}
	.ptop {
		background: var(--raise);
		padding: 10px 14px;
		display: flex;
		gap: 10px;
		align-items: center;
	}
	.ptop small {
		display: block;
		color: var(--muted);
		font-size: 11px;
	}
	.av {
		width: 32px;
		height: 32px;
		border-radius: 50%;
		background: var(--accent);
		color: var(--accent-ink);
		display: grid;
		place-items: center;
		font-weight: 800;
	}
	.chat {
		padding: 14px 10px;
		display: grid;
		gap: 8px;
		min-height: 290px;
		align-content: start;
		font-size: 14px;
	}
	.bub {
		max-width: 85%;
		padding: 8px 10px;
		border-radius: 10px;
		line-height: 1.4;
	}
	.in-msg {
		background: #fff;
		justify-self: start;
		border-top-left-radius: 2px;
	}
	.out {
		background: #d3e8d9;
		justify-self: end;
		border-top-right-radius: 2px;
	}
	time {
		display: block;
		text-align: right;
		font-size: 10px;
		color: var(--muted);
	}
	.qr {
		display: grid;
		gap: 4px;
		max-width: 85%;
	}
	.qr button {
		font: 600 14px var(--font-sans);
		background: #fff;
		color: var(--color-gold-text);
		border: 0;
		border-radius: 10px;
		padding: 9px;
		min-height: 44px;
		cursor: pointer;
	}
	.qr button:disabled {
		opacity: 0.45;
		cursor: default;
	}
	.reset {
		font: 500 13px var(--font-sans);
		background: none;
		border: 0;
		color: var(--muted);
		text-decoration: underline;
		cursor: pointer;
		justify-self: center;
		padding: 6px;
		min-height: 44px;
	}
</style>
