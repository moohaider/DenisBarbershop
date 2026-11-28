<script lang="ts">
	import type { PageProps } from './$types';
	import CallDialog from '#lib/components/CallDialog.svelte';
	import ComingSoon from '#lib/components/ComingSoon.svelte';
	import Contact from '#lib/components/Contact.svelte';
	import Gallery from '#lib/components/Gallery.svelte';
	import Hero from '#lib/components/Hero.svelte';
	import HowItWorks from '#lib/components/HowItWorks.svelte';
	import MobileBar from '#lib/components/MobileBar.svelte';
	import Pole from '#lib/components/Pole.svelte';
	import PriceList from '#lib/components/PriceList.svelte';
	import Regulars from '#lib/components/Regulars.svelte';
	import SiteFooter from '#lib/components/SiteFooter.svelte';
	import SiteHeader from '#lib/components/SiteHeader.svelte';
	import { business } from '#lib/content/business.ts';
	import { seo } from '#lib/content/home.ts';
	import { comingSoon } from '#lib/content/preview.ts';
	import { hairSalonJsonLd, serializeJsonLd } from '#lib/seo/structured-data.ts';

	let { data }: PageProps = $props();

	const jsonLd =
		`<script type="application/ld+json">${serializeJsonLd(hairSalonJsonLd())}</` + `script>`;
</script>

<svelte:head>
	<title>{data.locked ? comingSoon.title : seo.title}</title>
	{#if data.locked}
		<meta name="description" content={comingSoon.description} />
	{:else}
		<meta name="description" content={seo.description} />
		<link rel="canonical" href="{business.url}/" />
		<meta property="og:type" content="website" />
		<meta property="og:locale" content="de_DE" />
		<meta property="og:title" content={seo.title} />
		<meta property="og:description" content={seo.description} />
		<meta property="og:url" content="{business.url}/" />
		<!-- eslint-disable-next-line svelte/no-at-html-tags -- statisches, escaptes JSON-LD -->
		{@html jsonLd}
	{/if}
</svelte:head>

{#if data.locked}
	<ComingSoon />
{:else}
	<Pole />
	<SiteHeader />
	<main>
		<!-- Magazin-Ansicht: links die dunkle Säule, rechts das Leistungsverzeichnis. -->
		<div class="wrap mag">
			<Hero />
			<PriceList />
		</div>
		<HowItWorks />
		<Gallery />
		<Regulars />
		<Contact />
	</main>
	<SiteFooter />
	<MobileBar />
	<CallDialog />
{/if}

<style>
	.mag {
		display: grid;
		grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
		gap: 40px;
		align-items: start;
		padding-block: clamp(28px, 4vw, 56px);
	}
	@media (max-width: 1023px) {
		.mag {
			grid-template-columns: minmax(0, 1fr);
		}
	}
</style>
