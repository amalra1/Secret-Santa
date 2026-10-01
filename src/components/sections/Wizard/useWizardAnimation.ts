'use client';

import type { RefObject } from 'react';
import { gsap } from '@/lib/gsap';
import { useMediaAnimation } from '@/hooks/useMediaAnimation';
import styles from './Wizard.module.css';

export function useWizardAnimation(
  ref: RefObject<HTMLElement | null>,
  step: number,
) {
  useMediaAnimation(
    () => {
      const root = ref.current;
      if (!root) return;
      const q = gsap.utils.selector(root);

      gsap
        .timeline()
        .from(q(`.${styles.titleInner}`), {
          yPercent: 110,
          duration: 0.9,
          ease: 'power4.out',
        })
        .from(
          q(`.${styles.heading} > :not(h1)`),
          { y: 16, autoAlpha: 0, duration: 0.6, stagger: 0.06 },
          0.1,
        )
        .from(
          q(`.${styles.panel}`),
          {
            clipPath: 'inset(0% 0% 100% 0%)',
            y: 30,
            duration: 0.8,
            ease: 'expo.out',
            clearProps: 'clipPath,transform',
          },
          0.15,
        );
    },
    { scope: ref, dependencies: [step], revertOnUpdate: true },
  );
}
