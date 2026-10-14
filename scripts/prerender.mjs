import { readFile, writeFile, rm } from 'node:fs/promises';
import { render } from '../.prerender/entry-server.js';

const file = new URL('../dist/index.html', import.meta.url);
const html = await readFile(file, 'utf8');
if (!html.includes('<!--app-html-->')) throw new Error('Prerender placeholder not found');
await writeFile(file, html.replace('<!--app-html-->', render()));
await rm(new URL('../.prerender/', import.meta.url), { recursive: true, force: true });
console.log('Prerendered all sections: content is available before JavaScript.');
