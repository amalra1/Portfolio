import type { OrnamentProps } from '@/types/components/ornaments';

export default function TribalThorn({
  className,
  style,
  color = 'currentColor',
}: OrnamentProps) {
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
