import type { OrnamentProps } from '@/types/components/ornaments';

export default function TribalSpikes({
  className,
  style,
  color = 'currentColor',
}: OrnamentProps) {
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
