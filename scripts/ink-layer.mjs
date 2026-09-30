import sharp from 'sharp';

const [input, output, ...rest] = process.argv.slice(2);
if (!input || !output) {
  console.error(
    'usage: node scripts/ink-layer.mjs <cutout.png> <ink.png> [radius=40] [soft=12] [hard=40]',
  );
  process.exit(2);
}
const [radius, soft, hard] = [40, 12, 40].map((fallback, i) =>
  Number(rest[i] ?? fallback),
);
const INK = [15, 11, 11];
const SOLID_ALPHA = 250;

const source = sharp(input).ensureAlpha();
const { data, info } = await source
  .clone()
  .raw()
  .toBuffer({ resolveWithObject: true });
const surroundings = await source
  .clone()
  .removeAlpha()
  .grayscale()
  .blur(radius)
  .raw()
  .toBuffer();

const ink = Buffer.alloc(data.length);
for (let pixel = 0, i = 0; i < data.length; pixel += 1, i += 4) {
  const luminance =
    0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2];
  const contrast = surroundings[pixel] - luminance;
  const strength = Math.min(Math.max((contrast - soft) / (hard - soft), 0), 1);
  const opaque = data[i + 3] >= SOLID_ALPHA ? 1 : 0;
  ink[i] = INK[0];
  ink[i + 1] = INK[1];
  ink[i + 2] = INK[2];
  ink[i + 3] = Math.round(strength * opaque * 255);
}

await sharp(ink, {
  raw: { width: info.width, height: info.height, channels: 4 },
})
  .png({ compressionLevel: 9 })
  .toFile(output);
console.log(
  `${output} ${info.width}x${info.height} radius=${radius} soft=${soft} hard=${hard}`,
);
