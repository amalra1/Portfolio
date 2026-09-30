import { rename, stat } from 'node:fs/promises';
import sharp from 'sharp';

const factor = Number(process.argv[2] ?? 3);
const src = new URL('../src/assets/images/pedro-cutout.png', import.meta.url)
  .pathname;
const tmp = `${src}.tmp.png`;

const meta = await sharp(src).metadata();
await sharp(src)
  .resize({ width: Math.round(meta.width * factor), kernel: 'lanczos3' })
  .sharpen({ sigma: 0.8 })
  .png({ compressionLevel: 9 })
  .toFile(tmp);
await rename(tmp, src);

const out = await sharp(src).metadata();
const size = (await stat(src)).size;
console.log(`cutout ${out.width}x${out.height} ${(size / 1024).toFixed(0)}KB`);
