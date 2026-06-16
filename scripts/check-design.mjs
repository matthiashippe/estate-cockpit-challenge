#!/usr/bin/env node
/**
 * Design-token guard (advisory, non-blocking).
 *
 * Scans component code for raw hex colors and arbitrary Tailwind color values
 * (e.g. text-[#123456]). The design system expects you to use tokens instead
 * (bg-cream, text-ink, text-brand …). See DESIGN.md.
 *
 * Exits 0 always — this is a nudge, not a gate.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = process.cwd();
const SRC = join(ROOT, "src");
const EXTS = [".ts", ".tsx"];

const HEX = /#[0-9a-fA-F]{3,8}\b/;
const ARBITRARY_COLOR =
  /\b(?:bg|text|border|ring|fill|stroke|from|via|to|outline|decoration|caret|accent)-\[(?:#|rgb|hsl|oklch|color)/;

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) out.push(...walk(p));
    else if (EXTS.some((e) => p.endsWith(e))) out.push(p);
  }
  return out;
}

const findings = [];
for (const file of walk(SRC)) {
  const lines = readFileSync(file, "utf8").split("\n");
  lines.forEach((line, i) => {
    if (HEX.test(line) || ARBITRARY_COLOR.test(line)) {
      findings.push({ file: relative(ROOT, file), line: i + 1, text: line.trim() });
    }
  });
}

if (findings.length === 0) {
  console.log("✓ Design-Tokens: keine rohen Farbwerte in src/ gefunden.");
} else {
  console.log(
    `⚠ Design-Tokens: ${findings.length} mögliche rohe Farbwerte gefunden — nutze Tokens statt Hex/arbiträrer Werte:\n`,
  );
  for (const f of findings) {
    console.log(`  ${f.file}:${f.line}  ${f.text.slice(0, 100)}`);
  }
  console.log("\nHinweis: Das ist eine Warnung, kein Fehler. Mehr dazu in DESIGN.md.");
}

process.exit(0);
