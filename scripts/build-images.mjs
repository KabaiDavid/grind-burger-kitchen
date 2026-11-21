// Builds responsive, graded AVIF/WebP derivatives from the authentic source
// photography in /source-assets. Run: npm run images
// Every crop is a reframing of a real Grind photo — nothing is generated.
import sharp from 'sharp';
import fs from 'node:fs/promises';
import path from 'node:path';
import { grinderPlateSVG } from './grinder-plate.mjs';

const SRC = 'source-assets';
const OUT = 'public/img';
const MANIFEST = 'src/data/images.json';

// Gentle grade: a touch of contrast + warmth. Authentic, not filtered.
const grade = (img) => img.modulate({ saturation: 1.06, brightness: 1.0 }).linear(1.05, -6);

const jobs = [
  // Hero — the full table, landscape for desktop and a portrait slice for phones.
  { name: 'hero', src: 'flatlay.jpg', widths: [960, 1440, 1920, 2560], q: 62 },
  { name: 'hero-portrait', src: 'flatlay.jpg', crop: [2700, 0, 2600, 3840], widths: [640, 960, 1280], q: 62 },
  // Detail frames pulled from the 5760px original.
  { name: 'detail-ramekins', src: 'flatlay.jpg', crop: [2064, 1440, 2112, 1488], widths: [640, 1024, 1600] },
  { name: 'detail-fries', src: 'flatlay.jpg', crop: [1824, 0, 2400, 1680], widths: [640, 1024, 1600] },
  { name: 'detail-pimento', src: 'flatlay.jpg', crop: [3312, 2448, 1680, 1392], widths: [640, 1024, 1600] },
  { name: 'chain-burger', src: 'chain-burger.jpg', widths: [480, 980] },
  { name: 'southern-burger', src: 'southern-burger.jpg', widths: [480, 640] },
  { name: 'owners', src: 'owners-liz-jesse-huot.jpg', widths: [400, 533] },
];

await fs.mkdir(OUT, { recursive: true });
const manifest = {};

for (const job of jobs) {
  let base = sharp(path.join(SRC, job.src)).rotate();
  if (job.crop) {
    const [left, top, width, height] = job.crop;
    base = base.extract({ left, top, width, height });
  }
  const buf = await grade(base).toBuffer();
  const meta = await sharp(buf).metadata();
  const widths = job.widths.filter((w) => w <= meta.width);
  if (!widths.includes(meta.width) && widths.length < job.widths.length) widths.push(meta.width);
  for (const w of widths) {
    const r = sharp(buf).resize({ width: w });
    await r.clone().avif({ quality: (job.q ?? 58) - 8, effort: 5 }).toFile(`${OUT}/${job.name}-${w}.avif`);
    await r.clone().webp({ quality: job.q ?? 72 }).toFile(`${OUT}/${job.name}-${w}.webp`);
  }
  const blur = await sharp(buf).resize(24).blur(1.2).webp({ quality: 40 }).toBuffer();
  manifest[job.name] = {
    width: meta.width,
    height: meta.height,
    widths: widths.sort((a, b) => a - b),
    blur: `data:image/webp;base64,${blur.toString('base64')}`,
  };
  console.log('✓', job.name, widths.join(','));
}

// Logo: the original raster wordmark, keyed to transparent in ink + cream.
{
  const { data, info } = await sharp(path.join(SRC, 'logo.jpg'))
    .extract({ left: 60, top: 230, width: 2760, height: 900 })
    .greyscale()
    .raw()
    .toBuffer({ resolveWithObject: true });
  for (const [name, rgb] of [['logo-ink', [20, 17, 16]], ['logo-cream', [241, 234, 223]]]) {
    const px = Buffer.alloc(info.width * info.height * 4);
    for (let i = 0; i < info.width * info.height; i++) {
      px[i * 4] = rgb[0];
      px[i * 4 + 1] = rgb[1];
      px[i * 4 + 2] = rgb[2];
      px[i * 4 + 3] = 255 - data[i];
    }
    const img = sharp(px, { raw: { width: info.width, height: info.height, channels: 4 } }).trim();
    await img.clone().resize({ width: 640 }).webp({ quality: 90, alphaQuality: 90 }).toFile(`${OUT}/${name}.webp`);
    await img.clone().resize({ width: 640 }).png({ compressionLevel: 9 }).toFile(`${OUT}/${name}.png`);
  }
  const m = await sharp(`${OUT}/logo-ink.png`).metadata();
  manifest.logo = { width: m.width, height: m.height };
  console.log('✓ logo');
}

// Icons from the grinder-plate mark.
{
  const svgRed = grinderPlateSVG({ fill: '#A3182F', bg: '#F1EADF' });
  await fs.writeFile('public/icon.svg', grinderPlateSVG({ fill: '#A3182F' }));
  await sharp(Buffer.from(svgRed)).resize(180).png().toFile('public/apple-touch-icon.png');
  await sharp(Buffer.from(svgRed)).resize(192).png().toFile('public/icon-192.png');
  await sharp(Buffer.from(svgRed)).resize(512).png().toFile('public/icon-512.png');
  await sharp(Buffer.from(svgRed)).resize(48).toFile('public/favicon.png');
  console.log('✓ icons');
}

// Open Graph card: real photo + real logo.
{
  const bg = await grade(sharp(path.join(SRC, 'flatlay.jpg')).resize(1200, 630, { fit: 'cover' }))
    .composite([{ input: Buffer.from('<svg width="1200" height="630"><rect width="1200" height="630" fill="#0f0d0c" fill-opacity="0.55"/></svg>') }])
    .toBuffer();
  const logo = await sharp(`${OUT}/logo-cream.png`).resize({ width: 620 }).toBuffer();
  await sharp(bg).composite([{ input: logo, gravity: 'center' }]).jpeg({ quality: 82, mozjpeg: true }).toFile('public/og.jpg');
  console.log('✓ og');
}

await fs.writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + '\n');
console.log('manifest →', MANIFEST);
