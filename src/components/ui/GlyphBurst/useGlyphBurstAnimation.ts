'use client';

import type { RefObject } from 'react';
import { gsap } from '@/lib/gsap';
import { useMediaAnimation } from '@/hooks/useMediaAnimation';
import styles from './GlyphBurst.module.css';

const MIN_DISTANCE = 0.45;
const MAX_DISTANCE = 1;
const ANGLE_JITTER = 0.35;

export function useGlyphBurstAnimation(
  ref: RefObject<HTMLDivElement | null>,
  active: boolean,
) {
  useMediaAnimation(
    () => {
      const root = ref.current;
      if (!active || !root) return;
      const glyphs = gsap.utils.toArray<Element>(`.${styles.glyph}`, root);
      const radius = Math.min(window.innerWidth, window.innerHeight) * 0.42;
      const angleOf = (index: number) =>
        (index / glyphs.length) * Math.PI * 2 +
        gsap.utils.random(-ANGLE_JITTER, ANGLE_JITTER);
      const distance = () =>
        radius * gsap.utils.random(MIN_DISTANCE, MAX_DISTANCE);
      const angles = glyphs.map((_, index) => angleOf(index));

      gsap
        .timeline()
        .fromTo(
          glyphs,
          { x: 0, y: 0, scale: 0, rotate: 0, autoAlpha: 1 },
          {
            x: (index) => Math.cos(angles[index]) * distance(),
            y: (index) => Math.sin(angles[index]) * distance(),
            rotate: () => gsap.utils.random(-200, 200),
            scale: () => gsap.utils.random(0.55, 1.25),
            duration: () => gsap.utils.random(0.7, 1.1),
            ease: 'expo.out',
          },
        )
        .to(
          glyphs,
          { autoAlpha: 0, scale: 0, duration: 0.5, stagger: 0.025 },
          '-=0.35',
        );
    },
    { scope: ref, dependencies: [active], revertOnUpdate: true },
  );
}
