import { GLYPHS } from '@/constants/glyphs';
import type { TribalGlyphProps } from '@/types/components/ornaments';

export default function TribalGlyph({
  name,
  className,
  style,
  color = 'currentColor',
}: TribalGlyphProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      style={style}
      aria-hidden="true"
      focusable="false"
    >
      <g fill={color} fillRule="evenodd">
        {GLYPHS[name].map((path) => (
          <path key={path} d={path} />
        ))}
      </g>
    </svg>
  );
}
