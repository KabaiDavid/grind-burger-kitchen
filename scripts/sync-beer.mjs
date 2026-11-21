// Pulls Grind's live draft / bottle / cocktail list from their TapHunter web menu
// (the same feed the original site embedded) and writes src/data/beer.json.
//   npm run sync:beer            → fetch live, then rebuild the site
//   npm run sync:beer -- --local → re-parse source-assets/taphunter-snapshot.html
import fs from 'node:fs/promises';

const WIDGET = 'https://www.taphunter.com/widgets/location/v3/5913251388981248/wm/4919691504123904.js';
const local = process.argv.includes('--local');

let html;
if (local) {
  html = await fs.readFile('source-assets/taphunter-snapshot.html', 'utf8');
} else {
  const js = await (await fetch(WIDGET, { headers: { 'User-Agent': 'Mozilla/5.0 (site build)' } })).text();
  const m = js.match(/JSON\.parse\((".*?")\);/s);
  if (!m) throw new Error('TapHunter widget format changed — beer.json left untouched.');
  html = JSON.parse(JSON.parse(m[1]));
  await fs.writeFile('source-assets/taphunter-snapshot.html', html);
}

const clean = (s) =>
  s
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&#39;|&#x27;/g, '’')
    .replace(/&quot;/g, '"')
    .replace(/&#8203;|​/g, '')
    .replace(/\s+/g, ' ')
    .trim();

const updated = clean(html.match(/class="updatedate">([^<]*)</)?.[1] ?? '').replace(/^Updated\s*/i, '');
const tokenRe =
  /<h3[^>]*>([^<]*)<\/h3>|class="heading">([\s\S]*?)<\/div>|class="beer-name(?: bev-name)?">([\s\S]*?)<\/span><\/(?:a><\/)?span>|class="padded-right beer-style">([^<]*)<|class="padded-right beer-abv">([^<]*)<|class="padded-right beer-ibu">([^<]*)<|class="padded-right brewery-name">([^<]*)<|class="padded-right brewery-location">([^<]*)<|class="beer-description[^"]*">([\s\S]*?)<\/div>|class="ingredients">([^<]*)</g;

const lists = [];
let list, cat, item;
for (const t of html.matchAll(tokenRe)) {
  const [, h3, heading, name, style, abv, ibu, brewery, loc, desc, ingredients] = t;
  if (h3) {
    const mm = clean(h3).match(/^(.*?)\s*\((\d+)\)$/);
    list = { title: mm ? mm[1] : clean(h3), count: mm ? +mm[2] : 0, categories: [] };
    lists.push(list);
  } else if (heading !== undefined && list) {
    cat = { title: clean(heading), items: [] };
    list.categories.push(cat);
  } else if (name !== undefined && cat) {
    item = { name: clean(name) };
    cat.items.push(item);
  } else if (item) {
    if (style) item.style = clean(style);
    if (abv) item.abv = clean(abv).replace(' ABV', '');
    if (ibu) item.ibu = clean(ibu).replace(' IBU', '');
    if (brewery) item.brewery = clean(brewery);
    if (loc) item.location = clean(loc);
    if (desc !== undefined) item.description = clean(desc);
    if (ingredients) item.ingredients = clean(ingredients);
  }
}

const total = lists.reduce((n, l) => n + l.categories.reduce((m, c) => m + c.items.length, 0), 0);
if (!total) throw new Error('Parsed zero items — beer.json left untouched.');
await fs.writeFile('src/data/beer.json', JSON.stringify({ source: 'TapHunter', updated, syncedAt: new Date().toISOString().slice(0, 10), lists }, null, 2) + '\n');
console.log(`beer.json: ${lists.map((l) => `${l.title} ${l.categories.reduce((m, c) => m + c.items.length, 0)}`).join(' · ')} (updated ${updated})`);
