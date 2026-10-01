import type { GlyphName } from '@/types/glyph';

export function glyphAt(order: readonly GlyphName[], index: number) {
  return order[index % order.length];
}
