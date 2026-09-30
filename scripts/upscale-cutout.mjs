import { rename, stat } from 'node:fs/promises';
import sharp from 'sharp';

const [file, factorArg] = process.argv.slice(2);
if (!file) {
  console.error('usage: node scripts/upscale-cutout.mjs <file.png> [factor=3]');
  process.exit(2);
}
const factor = Number(factorArg ?? 3);
const tmp = `${file}.tmp.png`;

const meta = await sharp(file).metadata();
await sharp(file)
  .resize({ width: Math.round(meta.width * factor), kernel: 'lanczos3' })
  .sharpen({ sigma: 0.8 })
  .png({ compressionLevel: 9 })
  .toFile(tmp);
await rename(tmp, file);

const out = await sharp(file).metadata();
const size = (await stat(file)).size;
console.log(`${file} ${out.width}x${out.height} ${(size / 1024).toFixed(0)}KB`);
