<script lang="ts">
	import LegalPage from '#lib/components/LegalPage.svelte';
	import { business } from '#lib/content/business.ts';
</script>

<!--
	ENTWURF. Fehlende Angaben (vollständiger Name, Rechtsform, ggf. USt-IdNr., E-Mail)
	muss Denis liefern; vor dem Launch rechtlich prüfen lassen (docs/04-qualitaet.md).
-->
<LegalPage title="Impressum">
	<h2>Angaben gemäß § 5 DDG</h2>
	<p>
		{business.name}<br />
		<span class="todo">[Vor- und Nachname des Inhabers, Rechtsform – fehlt noch]</span><br />
		{business.street}<br />
		{business.postalCode}
		{business.city}
	</p>

	<h2>Kontakt</h2>
	<p>
		Telefon: <a href="tel:{business.phoneE164}">{business.phoneDisplay}</a><br />
		E-Mail: <span class="todo">[E-Mail-Adresse – fehlt noch]</span>
	</p>

	<h2>Umsatzsteuer</h2>
	<p><span class="todo">[USt-IdNr. nach § 27a UStG, falls vorhanden – fehlt noch]</span></p>
</LegalPage>
