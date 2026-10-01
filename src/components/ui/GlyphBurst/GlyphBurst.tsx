'use client';

import { useRef } from 'react';
import { BURST_GLYPH_COUNT } from '@/constants/motion';
import { CARD_GLYPHS } from '@/constants/glyphs';
import { cx } from '@/lib/classNames';
import { glyphAt } from '@/lib/glyphs';
import TribalGlyph from '@/components/ornaments/TribalGlyph/TribalGlyph';
import type { GlyphBurstProps } from '@/types/components/ui';
import { useGlyphBurstAnimation } from './useGlyphBurstAnimation';
import styles from './GlyphBurst.module.css';

export default function GlyphBurst({
  active,
  count = BURST_GLYPH_COUNT,
  className,
}: GlyphBurstProps) {
  const ref = useRef<HTMLDivElement>(null);
  useGlyphBurstAnimation(ref, active);
  const glyphs = Array.from({ length: count }, (_, index) => index);

  return (
    <div ref={ref} className={cx(styles.burst, className)} aria-hidden="true">
      {glyphs.map((index) => (
        <TribalGlyph
          key={index}
          name={glyphAt(CARD_GLYPHS, index)}
          className={cx(styles.glyph, index % 3 === 0 && styles.light)}
        />
      ))}
    </div>
  );
}
