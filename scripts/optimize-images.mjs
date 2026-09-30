// Resizes and converts portfolio assets to WebP with sharp.
// Usage: node scripts/optimize-images.mjs
import { readdir, stat, unlink } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = new URL('../src/assets/', import.meta.url).pathname;

const jobs = [
  { dir: 'projects', width: 1600, quality: 80, removeSource: true },
  { dir: 'images', width: 1400, quality: 82, removeSource: false },
  { dir: 'logos', width: 256, quality: 90, removeSource: true },
  { dir: 'badges', width: 240, quality: 90, removeSource: true },
];

const KEEP_AS_IS = new Set(['pedro-cutout.png']);

for (const job of jobs) {
  const dir = path.join(root, job.dir);
  const files = await readdir(dir);
  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (!['.png', '.jpg', '.jpeg'].includes(ext)) continue;
    if (KEEP_AS_IS.has(file)) continue;
    const input = path.join(dir, file);
    const output = path.join(dir, `${path.basename(file, ext)}.webp`);
    const before = (await stat(input)).size;
    await sharp(input)
      .rotate()
      .resize({ width: job.width, withoutEnlargement: true })
      .webp({ quality: job.quality })
      .toFile(output);
    const after = (await stat(output)).size;
    console.log(
      `${job.dir}/${file} -> ${path.basename(output)}  ${(before / 1024).toFixed(0)}KB -> ${(after / 1024).toFixed(0)}KB`,
    );
    if (job.removeSource) await unlink(input);
  }
}
