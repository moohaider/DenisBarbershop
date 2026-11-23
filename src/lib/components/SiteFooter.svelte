<script lang="ts">
	import { resolve } from '$app/paths';
	import { footer } from '#lib/content/home.ts';
</script>

<footer class="dark">
	<div class="wrap row">
		<span>{footer.line}</span>
		<span>
			<a href={resolve('/impressum')}>{footer.imprint}</a> ·
			<a href={resolve('/datenschutz')}>{footer.privacy}</a>
		</span>
	</div>
</footer>

<style>
	footer {
		color: var(--muted);
		font-size: 13px;
		border-top: 1px solid var(--line);
	}
	.row {
		padding-block: 22px 110px;
		display: flex;
		flex-wrap: wrap;
		gap: 6px 18px;
		justify-content: space-between;
	}
	a {
		display: inline-block;
		padding-block: 12px;
	}
	@media (min-width: 761px) {
		.row {
			padding-bottom: 22px;
		}
	}
</style>
