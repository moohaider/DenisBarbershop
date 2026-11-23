<script lang="ts">
	import LegalPage from '#lib/components/LegalPage.svelte';
	import { business } from '#lib/content/business.ts';
</script>

<!--
	ENTWURF für Phase 0 (statische Seite ohne Buchung, ohne Cookies, ohne Tracking).
	Muss mit jeder neuen Funktion (Buchung, E-Mail, WhatsApp, Google-Bewertungen) erweitert
	und vor dem Launch rechtlich geprüft werden (docs/04-qualitaet.md).
-->
<LegalPage title="Datenschutzerklärung">
	<h2>Verantwortlicher</h2>
	<p>
		{business.name}, <span class="todo">[Name des Inhabers – fehlt noch]</span>, {business.street},
		{business.postalCode}
		{business.city}, Telefon {business.phoneDisplay}
	</p>

	<h2>Hosting</h2>
	<p>
		Diese Website wird bei Cloudflare, Inc. (101 Townsend St, San Francisco, CA 94107, USA)
		gehostet. Beim Aufruf verarbeitet Cloudflare technisch notwendige Daten wie IP-Adresse,
		Zeitpunkt und aufgerufene Seite, um die Seite auszuliefern und vor Angriffen zu schützen (Art. 6
		Abs. 1 lit. f DSGVO). Mit Cloudflare besteht ein Vertrag zur Auftragsverarbeitung;
		Übermittlungen in die USA stützen sich auf das EU-US Data Privacy Framework.
	</p>

	<h2>Cookies und Tracking</h2>
	<p>Diese Website setzt keine Cookies und verwendet keine Analyse- oder Tracking-Dienste.</p>

	<h2>Schriftarten</h2>
	<p>
		Die Schriftart wird von unserem eigenen Server geladen. Es werden keine Daten an Google
		übertragen.
	</p>

	<h2>Externe Links</h2>
	<p>
		Links zu Instagram und Google Maps öffnen die jeweiligen Dienste erst, wenn du sie anklickst.
		Vorher werden keine Daten an diese Anbieter übertragen. Für die Verarbeitung auf diesen
		Plattformen gelten deren Datenschutzerklärungen.
	</p>

	<h2>Deine Rechte</h2>
	<p>
		Du hast das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung,
		Datenübertragbarkeit und Widerspruch (Art. 15–21 DSGVO). Außerdem kannst du dich bei einer
		Datenschutz-Aufsichtsbehörde beschweren, zum Beispiel beim Hamburgischen Beauftragten für
		Datenschutz und Informationsfreiheit.
	</p>
</LegalPage>
