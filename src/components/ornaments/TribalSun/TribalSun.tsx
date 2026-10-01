import type { OrnamentProps } from '@/types/components/ornaments';

const RAY_COUNT = 16;
const RAY_ANGLE = 360 / RAY_COUNT;
const LONG_RAY_PATH =
  'M0 -30 C 10 -50, 10 -74, 3 -98 C -1 -74, -6 -50, 0 -30 Z';
const SHORT_RAY_PATH = 'M0 -30 C 7 -44, 7 -58, 2 -70 C -1 -58, -4 -44, 0 -30 Z';

export default function TribalSun({
  className,
  style,
  color = 'currentColor',
}: OrnamentProps) {
  const rays = Array.from({ length: RAY_COUNT }, (_, i) => i);
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
            transform={`rotate(${i * RAY_ANGLE})`}
            d={i % 2 === 0 ? LONG_RAY_PATH : SHORT_RAY_PATH}
          />
        ))}
      </g>
    </svg>
  );
}
