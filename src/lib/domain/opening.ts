/**
 * Geöffnet-Status, reine Funktionen ohne I/O.
 *
 * Liegt bewusst nicht unter `server/domain/`, weil der Live-Status auch im Browser
 * berechnet wird (sonst würde eine gecachte Seite einen veralteten Status zeigen).
 */
import type { OpeningHours } from '#lib/content/business.ts';

export const TIME_ZONE = 'Europe/Berlin';

export interface LocalTime {
	/** ISO-Wochentag, 1 = Montag … 7 = Sonntag */
	weekday: number;
	/** Minuten ab 00:00 Ortszeit */
	minutes: number;
}

const WEEKDAYS: Record<string, number> = { Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6, Sun: 7 };

/** Rechnet einen UTC-Zeitpunkt in Wochentag und Uhrzeit in Europe/Berlin um. */
export function toLocalTime(date: Date, timeZone = TIME_ZONE): LocalTime {
	const parts = new Intl.DateTimeFormat('en-US', {
		timeZone,
		weekday: 'short',
		hour: '2-digit',
		minute: '2-digit',
		hourCycle: 'h23'
	}).formatToParts(date);
	const get = (type: string) => parts.find((p) => p.type === type)?.value ?? '';
	const weekday = WEEKDAYS[get('weekday')];
	if (weekday === undefined) throw new Error(`Unknown weekday for ${date.toISOString()}`);
	return { weekday, minutes: Number(get('hour')) * 60 + Number(get('minute')) };
}

export type OpenStatus =
	| { open: true; closesAt: number }
	| { open: false; next: { weekday: number; opensAt: number } | null };

export function openStatus(hours: OpeningHours, now: LocalTime): OpenStatus {
	const today = hours[now.weekday];
	if (today && now.minutes >= today.opens && now.minutes < today.closes) {
		return { open: true, closesAt: today.closes };
	}
	if (today && now.minutes < today.opens) {
		return { open: false, next: { weekday: now.weekday, opensAt: today.opens } };
	}
	for (let i = 1; i <= 7; i++) {
		const weekday = ((now.weekday - 1 + i) % 7) + 1;
		const day = hours[weekday];
		if (day) return { open: false, next: { weekday, opensAt: day.opens } };
	}
	return { open: false, next: null };
}

const DAY_NAMES = [
	'',
	'Montag',
	'Dienstag',
	'Mittwoch',
	'Donnerstag',
	'Freitag',
	'Samstag',
	'Sonntag'
];

export function formatClock(minutes: number): string {
	const h = Math.floor(minutes / 60);
	const m = minutes % 60;
	return m === 0 ? `${h} Uhr` : `${h}:${String(m).padStart(2, '0')} Uhr`;
}

/** Deutscher Statustext, z. B. „Jetzt geöffnet, bis 20 Uhr“. */
export function openStatusText(status: OpenStatus, now: LocalTime): string {
	if (status.open) return `Jetzt geöffnet, bis ${formatClock(status.closesAt)}`;
	if (!status.next) return 'Gerade geschlossen';
	const { weekday, opensAt } = status.next;
	const tomorrow = (now.weekday % 7) + 1;
	const when =
		weekday === now.weekday ? 'heute' : weekday === tomorrow ? 'morgen' : DAY_NAMES[weekday];
	return `Gerade geschlossen, ${when} ab ${formatClock(opensAt)}`;
}
