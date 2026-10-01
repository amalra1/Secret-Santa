'use client';

import type { RefObject } from 'react';
import { gsap } from '@/lib/gsap';
import { useMediaAnimation } from '@/hooks/useMediaAnimation';
import styles from './RevealCard.module.css';

export function useRevealAnimation(
  ref: RefObject<HTMLElement | null>,
  revealed: boolean,
) {
  useMediaAnimation(
    () => {
      const root = ref.current;
      if (!root) return;
      const q = gsap.utils.selector(root);

      if (!revealed) {
        gsap
          .timeline()
          .from(root, {
            y: 60,
            rotate: 3,
            autoAlpha: 0,
            duration: 0.8,
            ease: 'power4.out',
          })
          .from(
            q(`.${styles.mystery}`),
            { scale: 0, rotate: -40, duration: 0.6, ease: 'back.out(2.4)' },
            0.25,
          )
          .to(q(`.${styles.mystery}`), {
            rotate: 8,
            duration: 1.4,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          });
        return;
      }

      gsap
        .timeline()
        .fromTo(
          root,
          { x: 0 },
          { x: 6, duration: 0.05, repeat: 5, yoyo: true, ease: 'none' },
        )
        .from(
          q(`.${styles.receiver}`),
          {
            scale: 2.6,
            rotate: -18,
            autoAlpha: 0,
            duration: 0.55,
            ease: 'back.out(2.5)',
          },
          0.05,
        );
    },
    { scope: ref, dependencies: [revealed], revertOnUpdate: true },
  );
}
