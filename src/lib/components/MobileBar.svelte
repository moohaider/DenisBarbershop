<script lang="ts">
	import { business } from '#lib/content/business.ts';
	import { mobileBar } from '#lib/content/home.ts';
	import BookButton from './BookButton.svelte';
</script>

<div class="bar dark">
	<div class="info"><b>{mobileBar.title}</b>{business.phoneDisplay}</div>
	<BookButton class="btn">{mobileBar.action}</BookButton>
</div>

<style>
	.bar {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 8;
		display: flex;
		align-items: center;
		gap: 12px;
		border-top: 1px solid var(--line);
		padding: 10px max(16px, env(safe-area-inset-right, 0px))
			calc(10px + env(safe-area-inset-bottom, 0px)) max(16px, env(safe-area-inset-left, 0px));
	}
	.info {
		flex: 1;
		min-width: 0;
		font-size: 13px;
		color: var(--muted);
		line-height: 1.3;
	}
	.info b {
		display: block;
		color: var(--ink);
		font-size: 14px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	@media (min-width: 761px) {
		.bar {
			display: none;
		}
	}
</style>
