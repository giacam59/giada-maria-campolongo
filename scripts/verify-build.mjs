import { readFile, stat, readdir } from 'node:fs/promises';
import assert from 'node:assert/strict';
import { gzipSync } from 'node:zlib';

const html = await readFile('dist/index.html', 'utf8');
assert(!html.includes('id="intro-overlay"'), 'The decorative intro must not cover static previews or prerendered content');
for (const id of ['profilo', 'competenze', 'esperienza', 'case-study', 'progetti', 'contatti']) assert(html.includes(`id="${id}"`), `Missing prerendered section: ${id}`);
assert(!/data:image\/(png|jpe?g|webp);base64/.test(html), 'Screenshots must remain cacheable files');
assert(!/esm\.sh|tailwindcss\/browser|api\.github/.test(html), 'Legacy runtime dependencies found');
for (const match of html.matchAll(/(?:src|href)="(\/assets\/[^"#]+)"/g)) await stat(`dist${match[1]}`);
const cvLinks = [...html.matchAll(/href="(\/cv\/[^"]+\.pdf)"/g)];
assert(cvLinks.length === 2, 'Both CV downloads must be present in prerendered HTML');
for (const [, url] of cvLinks) {
  const pdf = await readFile(`dist${url}`);
  assert(pdf.subarray(0, 5).toString() === '%PDF-', `Invalid or missing CV: ${url}`);
  assert(pdf.equals(await readFile(`public${url}`)), `CV changed during build: ${url}`);
}
const assets = await readdir('dist/assets');
let jsBytes = 0;
for (const file of assets.filter(file => file.endsWith('.js'))) jsBytes += gzipSync(await readFile(`dist/assets/${file}`)).length;
assert(Buffer.byteLength(html) < 100_000, 'HTML exceeded the 100 kB budget');
assert(jsBytes < 160_000, 'JavaScript exceeded the 160 kB gzip budget');
console.log(`Verified static output: HTML ${(Buffer.byteLength(html) / 1024).toFixed(1)} KiB; all JS chunks ${(jsBytes / 1024).toFixed(1)} KiB gzip.`);
