<script lang="ts">
	import { resolve } from '$app/paths';
	import { addressLine } from '#lib/content/business.ts';
	import { brand, footer } from '#lib/content/home.ts';
</script>

<footer class="dark">
	<div class="wrap row">
		<p>
			<span class="brand">{brand.first} {brand.second}</span>
			<span class="addr">{addressLine}</span>
		</p>
		<nav aria-label="Rechtliches">
			<a href={resolve('/impressum')}>{footer.imprint}</a>
			<a href={resolve('/datenschutz')}>{footer.privacy}</a>
		</nav>
	</div>
</footer>

<style>
	footer {
		border-top: 1px solid color-mix(in srgb, var(--color-gold-deep) 30%, transparent);
	}
	.row {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: 12px 24px;
		padding-block: 36px 112px;
		font-size: 13px;
	}
	p {
		margin: 0;
	}
	.brand {
		font-family: var(--font-serif);
		font-optical-sizing: auto;
		font-weight: 700;
		font-size: 18px;
		color: var(--color-gold);
		text-transform: uppercase;
		letter-spacing: 0.02em;
		margin-right: 10px;
	}
	.addr {
		color: var(--muted);
	}
	nav {
		display: flex;
		gap: 20px;
		font-weight: 600;
	}
	nav a {
		text-decoration: underline;
		text-decoration-color: color-mix(in srgb, currentColor 55%, transparent);
		text-underline-offset: 5px;
		padding-block: 12px;
	}
	nav a:hover {
		color: var(--color-gold);
	}
	@media (min-width: 761px) {
		.row {
			padding-bottom: 36px;
		}
	}
</style>
