const FILTER_ID = 'hero-tint';
const LUMINANCE_ROW = '0.2126 0.7152 0.0722 0 0';
const LUMINANCE_MATRIX = [
  LUMINANCE_ROW,
  LUMINANCE_ROW,
  LUMINANCE_ROW,
  '0 0 0 1 0',
].join(' ');

const SHADOW = [0.06, 0.04, 0.04];
const DEEP_RED = [0.42, 0.03, 0.05];
const BRAND_RED = [0.71, 0.07, 0.11];
const HIGHLIGHT = [0.86, 0.3, 0.32];
const TONES = [SHADOW, DEEP_RED, BRAND_RED, HIGHLIGHT];

function channelTable(channel: number) {
  return TONES.map((tone) => tone[channel]).join(' ');
}

export default function HeroTintFilter() {
  return (
    <svg width="0" height="0" aria-hidden="true" focusable="false">
      <filter id={FILTER_ID} colorInterpolationFilters="sRGB">
        <feColorMatrix type="matrix" values={LUMINANCE_MATRIX} />
        <feComponentTransfer>
          <feFuncR type="table" tableValues={channelTable(0)} />
          <feFuncG type="table" tableValues={channelTable(1)} />
          <feFuncB type="table" tableValues={channelTable(2)} />
        </feComponentTransfer>
      </filter>
    </svg>
  );
}
