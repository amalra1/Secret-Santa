'use client';

import type { RefObject } from 'react';
import { gsap } from '@/lib/gsap';
import { useMediaAnimation } from '@/hooks/useMediaAnimation';
import styles from './DrawHub.module.css';

export function useDrawHubAnimation(
  ref: RefObject<HTMLElement | null>,
  ready: boolean,
) {
  useMediaAnimation(
    () => {
      const root = ref.current;
      if (!ready || !root) return;
      const q = gsap.utils.selector(root);

      gsap
        .timeline()
        .from(q(`.${styles.group}`), {
          yPercent: 40,
          autoAlpha: 0,
          duration: 0.9,
          ease: 'power4.out',
        })
        .from(
          q(`.${styles.summary} > :not(h1)`),
          { y: 18, autoAlpha: 0, duration: 0.6, stagger: 0.05 },
          0.15,
        )
        .from(
          q('li'),
          { y: 30, autoAlpha: 0, duration: 0.6, stagger: 0.04 },
          0.3,
        );
    },
    { scope: ref, dependencies: [ready], revertOnUpdate: true },
  );
}
