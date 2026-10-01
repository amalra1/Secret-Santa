import type { CSSProperties } from 'react';
import type { GlyphName } from '@/types/glyph';

export interface OrnamentProps {
  className?: string;
  style?: CSSProperties;
  color?: string;
}

export interface TribalGlyphProps extends OrnamentProps {
  name: GlyphName;
}
