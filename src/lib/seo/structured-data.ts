import { business } from '#lib/content/business.ts';
import { formatPrice, services } from '#lib/content/services.ts';

/**
 * JSON-LD `HairSalon` für die lokale Suche.
 * `aggregateRating` kommt erst mit echten Google-Daten dazu (Phase 2), nie erfunden.
 */
export function hairSalonJsonLd() {
	const prices = services.map((s) => s.priceCents);
	const sameAs = [business.instagram.url, business.tiktok?.url].filter(Boolean);
	return {
		'@context': 'https://schema.org',
		'@type': 'HairSalon',
		name: business.name,
		url: business.url,
		telephone: business.phoneE164,
		priceRange: `${formatPrice(Math.min(...prices))}–${formatPrice(Math.max(...prices))}`,
		address: {
			'@type': 'PostalAddress',
			streetAddress: business.street,
			postalCode: business.postalCode,
			addressLocality: business.city,
			addressRegion: 'Hamburg',
			addressCountry: 'DE'
		},
		openingHoursSpecification: [
			{
				'@type': 'OpeningHoursSpecification',
				dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
				opens: '09:00',
				closes: '20:00'
			}
		],
		sameAs
	};
}

/** Serialisiert JSON-LD so, dass es sicher in ein <script>-Tag eingebettet werden kann. */
export function serializeJsonLd(data: unknown): string {
	return JSON.stringify(data).replace(/</g, '\\u003c');
}
