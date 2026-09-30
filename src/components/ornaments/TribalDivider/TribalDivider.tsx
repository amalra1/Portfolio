import type { OrnamentProps } from '@/types/components/ornaments';

const PATTERN_ID = 'tribal-thorns';

export default function TribalDivider({
  className,
  style,
  color = 'currentColor',
}: OrnamentProps) {
  return (
    <svg
      className={className}
      style={{ width: '100%', height: 28, display: 'block', ...style }}
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio="none"
    >
      <defs>
        <pattern
          id={PATTERN_ID}
          width="96"
          height="28"
          patternUnits="userSpaceOnUse"
        >
          <g fill={color}>
            <path d="M0 28 C 20 27, 34 16, 40 0 C 37 14, 26 25, 0 28 Z" />
            <path d="M96 28 C 76 27, 62 16, 56 0 C 59 14, 70 25, 96 28 Z" />
            <path d="M48 24 l5 -8 l-5 -8 l-5 8 z" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="28" fill={`url(#${PATTERN_ID})`} />
    </svg>
  );
}
