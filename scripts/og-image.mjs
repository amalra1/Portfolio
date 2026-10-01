import { writeFile } from 'node:fs/promises';
import { createElement as h } from 'react';
import { ImageResponse } from 'next/og.js';
import sharp from 'sharp';

const WIDTH = 1200;
const HEIGHT = 630;
const FIGURE_HEIGHT = 610;
const JPEG_QUALITY = 82;
const RED = '#b5121b';
const INK = '#0f0b0b';
const PAPER = '#f2ede4';
const CALL_TO_ACTION = 'SEE MY WORK';
const TONES = [
  [0.06, 0.04, 0.04],
  [0.42, 0.03, 0.05],
  [0.71, 0.07, 0.11],
  [0.86, 0.3, 0.32],
];
const FONT_CSS_URL = 'https://fonts.googleapis.com/css2?family=Anton';

const images = new URL('../src/assets/images/', import.meta.url).pathname;
const output = new URL('../src/app/opengraph-image.jpg', import.meta.url)
  .pathname;

function gradientMap(luminance) {
  const position = luminance * (TONES.length - 1);
  const index = Math.min(Math.floor(position), TONES.length - 2);
  const mix = position - index;
  return TONES[index].map(
    (from, channel) => (from + (TONES[index + 1][channel] - from) * mix) * 255,
  );
}

async function tintedFigure() {
  const { data, info } = await sharp(`${images}pedro-side-cutout.webp`)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  for (let i = 0; i < data.length; i += 4) {
    const luminance =
      (0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2]) / 255;
    const [r, g, b] = gradientMap(luminance);
    data[i] = r;
    data[i + 1] = g;
    data[i + 2] = b;
  }
  const tinted = await sharp(data, { raw: info }).png().toBuffer();
  const ink = await sharp(`${images}pedro-side-ink.webp`).png().toBuffer();
  const layered = await sharp(tinted)
    .composite([{ input: ink }])
    .png()
    .toBuffer();
  return sharp(layered).resize({ height: FIGURE_HEIGHT }).png().toBuffer();
}

async function antonFont() {
  const css = await fetch(FONT_CSS_URL).then((response) => response.text());
  const [, fontUrl] = css.match(/url\((.+?)\)/);
  return fetch(fontUrl).then((response) => response.arrayBuffer());
}

function word(text, style) {
  return h(
    'div',
    {
      style: {
        position: 'absolute',
        fontFamily: 'Anton',
        lineHeight: 1,
        color: INK,
        ...style,
      },
    },
    text,
  );
}

function arrow() {
  return h(
    'svg',
    { width: 30, height: 30, viewBox: '0 0 24 24' },
    h('path', {
      d: 'M5 12h13M12 5l7 7-7 7',
      stroke: PAPER,
      strokeWidth: 3,
      fill: 'none',
    }),
  );
}

function callToAction() {
  return h(
    'div',
    {
      style: {
        position: 'absolute',
        top: 150,
        right: 52,
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        padding: '14px 22px',
        background: INK,
        color: PAPER,
        fontFamily: 'Anton',
        fontSize: 36,
        lineHeight: 1,
      },
    },
    CALL_TO_ACTION,
    arrow(),
  );
}

const [figure, font] = await Promise.all([tintedFigure(), antonFont()]);
const figureSrc = `data:image/png;base64,${figure.toString('base64')}`;
const { width: figureWidth } = await sharp(figure).metadata();

const card = h(
  'div',
  {
    style: {
      position: 'relative',
      display: 'flex',
      width: WIDTH,
      height: HEIGHT,
      background: RED,
      overflow: 'hidden',
    },
  },
  word('PEDRO', { top: 40, left: 48, fontSize: 220 }),
  h('img', {
    src: figureSrc,
    width: figureWidth,
    height: FIGURE_HEIGHT,
    style: {
      position: 'absolute',
      bottom: 0,
      left: (WIDTH - figureWidth) / 2 + 180,
    },
  }),
  word('CHAPELIN', { bottom: 24, right: 48, fontSize: 250 }),
  word('FULL-STACK DEVELOPER', { top: 52, right: 52, fontSize: 34 }),
  word('CHAPELIN.COM.BR', { top: 96, right: 52, fontSize: 34 }),
  callToAction(),
);

const response = new ImageResponse(card, {
  width: WIDTH,
  height: HEIGHT,
  fonts: [{ name: 'Anton', data: font, weight: 400, style: 'normal' }],
});
const png = Buffer.from(await response.arrayBuffer());
const jpeg = await sharp(png)
  .jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
  .toBuffer();
await writeFile(output, jpeg);
console.log(`${output} ${Math.round(jpeg.length / 1024)} KB`);
