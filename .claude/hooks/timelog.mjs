#!/usr/bin/env node
// Zeiterfassung für Claude Code.
//   event  – von den Hooks aufgerufen: hängt einen Zeitstempel an .claude/timelog/events.jsonl an
//   report – fasst die Ereignisse zu Arbeitsblöcken zusammen und gibt CSV für die Zeiterfassungs-Seite aus
//            Optionen: --since YYYY-MM-DD  (Standard: alle)   --gap 30 (Minuten Pause, ab der ein neuer Block beginnt)
import { appendFileSync, mkdirSync, readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const root = process.env.CLAUDE_PROJECT_DIR || process.cwd();
const dir = join(root, ".claude", "timelog");
const file = join(dir, "events.jsonl");
const [, , mode = "report", ...args] = process.argv;

if (mode === "event") {
  // Hooks dürfen nie scheitern oder etwas ausgeben (stdout von UserPromptSubmit landet im Kontext).
  let raw = "";
  process.stdin.on("data", (c) => (raw += c));
  process.stdin.on("end", () => {
    try {
      let input = {};
      try { input = JSON.parse(raw || "{}"); } catch {}
      const rec = { ts: new Date().toISOString(), event: input.hook_event_name || "unknown", session: input.session_id || "" };
      if (typeof input.prompt === "string") rec.prompt = input.prompt.replace(/\s+/g, " ").slice(0, 90);
      mkdirSync(dir, { recursive: true });
      appendFileSync(file, JSON.stringify(rec) + "\n");
    } catch {}
    process.exit(0);
  });
} else {
  const opt = (name, def) => { const i = args.indexOf(name); return i >= 0 ? args[i + 1] : def; };
  const since = opt("--since", "");
  const gapMin = Number(opt("--gap", "30"));
  const PAD_MIN = 5; // nach dem letzten Ereignis eines Blocks noch 5 Minuten (Lesen, Testen)
  if (!existsSync(file)) { console.log("datum,start,ende,minuten,quelle,taetigkeit"); process.exit(0); }
  const ev = readFileSync(file, "utf8").split("\n").filter(Boolean)
    .map((l) => { try { return JSON.parse(l); } catch { return null; } })
    .filter(Boolean).map((e) => ({ ...e, t: new Date(e.ts) }))
    .filter((e) => !isNaN(e.t)).sort((a, b) => a.t - b.t);
  const pad = (n) => String(n).padStart(2, "0");
  const day = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const hm = (d) => `${pad(d.getHours())}:${pad(d.getMinutes())}`;
  const blocks = [];
  for (const e of ev) {
    const b = blocks.at(-1);
    if (b && (e.t - b.last) / 60000 <= gapMin && day(e.t) === day(b.first)) { b.last = e.t; if (!b.prompt && e.prompt) b.prompt = e.prompt; }
    else blocks.push({ first: e.t, last: e.t, prompt: e.prompt || "" });
  }
  const out = ["datum,start,ende,minuten,quelle,taetigkeit"];
  let total = 0;
  for (const b of blocks) {
    if (since && day(b.first) < since) continue;
    const end = new Date(b.last.getTime() + PAD_MIN * 60000);
    const minutes = Math.max(PAD_MIN, Math.round((end - b.first) / 60000));
    total += minutes;
    const task = (b.prompt || "Arbeit mit Claude Code").replace(/"/g, "'");
    out.push(`${day(b.first)},${hm(b.first)},${hm(end)},${minutes},code,"${task}"`);
  }
  console.log(out.join("\n"));
  console.error(`Summe: ${Math.floor(total / 60)}:${pad(total % 60)} h in ${out.length - 1} Blöcken`);
}
