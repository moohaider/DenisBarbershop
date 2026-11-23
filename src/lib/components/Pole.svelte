<div class="pole" aria-hidden="true"></div>

<style>
	.pole {
		height: 7px;
		background: repeating-linear-gradient(
			135deg,
			var(--color-pole-red) 0 12px,
			var(--color-pole-white) 12px 24px,
			var(--color-pole-blue) 24px 36px,
			var(--color-pole-white) 36px 48px
		);
		background-size: 67.88px 100%;
	}
	@media (prefers-reduced-motion: no-preference) {
		.pole {
			animation: pole 3s linear infinite;
		}
	}
	@keyframes pole {
		to {
			background-position: 67.88px 0;
		}
	}
</style>
