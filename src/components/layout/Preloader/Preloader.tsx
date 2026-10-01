'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { PRELOADER_GLYPHS } from '@/constants/glyphs';
import { releaseIntro } from '@/lib/preloader';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import TribalGlyph from '@/components/ornaments/TribalGlyph/TribalGlyph';
import TribalSun from '@/components/ornaments/TribalSun/TribalSun';
import { usePreloaderAnimation } from './usePreloaderAnimation';
import styles from './Preloader.module.css';

export default function Preloader() {
  const ref = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);
  const reduced = useReducedMotion();
  const active = !done && !reduced;

  const finish = useCallback(() => setDone(true), []);
  usePreloaderAnimation(ref, finish);

  useEffect(() => {
    if (!active) releaseIntro();
  }, [active]);

  if (!active) return null;

  return (
    <div ref={ref} className={styles.preloader} aria-hidden="true">
      <span className={styles.ring} />
      <TribalSun className={styles.symbol} />
      {PRELOADER_GLYPHS.map((name) => (
        <TribalGlyph key={name} name={name} className={styles.symbol} />
      ))}
    </div>
  );
}
