import type { CSSProperties } from 'react';

type SvgProps = {
  className?: string;
  style?: CSSProperties;
  /** Fill color; defaults to currentColor so it follows the text color. */
  color?: string;
};

/**
 * Tribal sun: a ring with curved, tapered rays. Decorative only.
 */
export function TribalSun({ className, style, color = 'currentColor' }: SvgProps) {
  const rays = Array.from({ length: 16 }, (_, i) => i);
  return (
    <svg
      viewBox="-100 -100 200 200"
      className={className}
      style={style}
      aria-hidden="true"
      focusable="false"
    >
      <g fill={color}>
        <circle r="13" />
        <circle r="24" fill="none" stroke={color} strokeWidth="4" />
        {rays.map((i) => (
          <path
            key={i}
            transform={`rotate(${i * 22.5})`}
            d={
              i % 2 === 0
                ? 'M0 -30 C 10 -50, 10 -74, 3 -98 C -1 -74, -6 -50, 0 -30 Z'
                : 'M0 -30 C 7 -44, 7 -58, 2 -70 C -1 -58, -4 -44, 0 -30 Z'
            }
          />
        ))}
      </g>
    </svg>
  );
}

/**
 * Tribal divider: a repeating row of mirrored thorns with a diamond between.
 * Stretches to the width of its container.
 */
export function TribalDivider({ className, style, color = 'currentColor' }: SvgProps) {
  const id = 'tribal-thorns';
  return (
    <svg
      className={className}
      style={{ width: '100%', height: 28, display: 'block', ...style }}
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio="none"
    >
      <defs>
        <pattern id={id} width="96" height="28" patternUnits="userSpaceOnUse">
          <g fill={color}>
            <path d="M0 28 C 20 27, 34 16, 40 0 C 37 14, 26 25, 0 28 Z" />
            <path d="M96 28 C 76 27, 62 16, 56 0 C 59 14, 70 25, 96 28 Z" />
            <path d="M48 24 l5 -8 l-5 -8 l-5 8 z" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="28" fill={`url(#${id})`} />
    </svg>
  );
}

/**
 * Tribal thorn: a single curved spike, used as a corner mark.
 */
export function TribalThorn({ className, style, color = 'currentColor' }: SvgProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      style={style}
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill={color}
        d="M0 48 C 3 28, 14 10, 48 0 C 20 10, 8 26, 0 48 Z M10 48 C 14 36, 24 24, 46 14 C 28 26, 18 38, 10 48 Z"
      />
    </svg>
  );
}

/**
 * Tribal spikes: three thorns fanning out, used as a section marker.
 */
export function TribalSpikes({ className, style, color = 'currentColor' }: SvgProps) {
  return (
    <svg
      viewBox="0 0 120 48"
      className={className}
      style={style}
      aria-hidden="true"
      focusable="false"
    >
      <g fill={color}>
        <path d="M60 48 C 58 32, 59 16, 60 0 C 61 16, 62 32, 60 48 Z" />
        <path d="M60 48 C 46 38, 30 30, 6 24 C 30 26, 46 34, 60 48 Z" />
        <path d="M60 48 C 74 38, 90 30, 114 24 C 90 26, 74 34, 60 48 Z" />
        <path d="M60 48 C 50 40, 38 36, 22 40 C 40 34, 52 36, 60 48 Z" />
        <path d="M60 48 C 70 40, 82 36, 98 40 C 80 34, 68 36, 60 48 Z" />
      </g>
    </svg>
  );
}
