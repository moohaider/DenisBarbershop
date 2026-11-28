import type { PageServerLoad } from './$types';

// Bis zum Start nicht vorgerendert: Der Worker entscheidet bei jedem Aufruf,
// ob der Platzhalter oder die echte Seite kommt (Vorschau-Schutz, ADR-0011).
export const prerender = false;

export const load: PageServerLoad = ({ locals }) => ({ locked: !locals.previewAccess });
