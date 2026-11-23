/**
 * Phase 0: Statt der Buchung öffnet jeder Termin-Button einen Dialog mit Telefonnummer.
 * Ohne JavaScript sind die Buttons normale `tel:`-Links.
 */
export const callDialog = $state({ open: false });

export function openCallDialog(event?: Event) {
	event?.preventDefault();
	callDialog.open = true;
}
