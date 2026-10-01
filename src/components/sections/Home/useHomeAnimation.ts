'use client';

import type { RefObject } from 'react';
import { gsap } from '@/lib/gsap';
import { introReady } from '@/lib/preloader';
import { useMediaAnimation } from '@/hooks/useMediaAnimation';
import styles from './Home.module.css';

export function tearStub(root: HTMLElement, onDone: () => void) {
  const q = gsap.utils.selector(root);
  gsap
    .timeline({ onComplete: onDone })
    .to(q(`.${styles.body}`), {
      x: 10,
      duration: 0.12,
      yoyo: true,
      repeat: 1,
      ease: 'power1.inOut',
    })
    .to(
      q(`.${styles.stub}`),
      {
        rotate: -28,
        x: -30,
        y: 220,
        autoAlpha: 0,
        transformOrigin: '100% 0%',
        duration: 0.6,
        ease: 'power2.in',
      },
      0.08,
    );
}

export function useHomeAnimation(ref: RefObject<HTMLElement | null>) {
  useMediaAnimation(
    () => {
      const root = ref.current;
      if (!root) return;
      const q = gsap.utils.selector(root);
      const ticket = q(`.${styles.ticket}`);
      gsap.set(ticket, { autoAlpha: 0 });

      let cancelled = false;
      introReady.then(() => {
        if (cancelled) return;
        gsap
          .timeline()
          .fromTo(
            ticket,
            { y: -160, rotate: -14, autoAlpha: 0 },
            {
              y: 0,
              rotate: -1.5,
              autoAlpha: 1,
              duration: 1,
              ease: 'back.out(1.4)',
            },
          )
          .from(
            q(`.${styles.stubGlyph}`),
            { scale: 2.4, rotate: -40, duration: 0.5, ease: 'back.out(2.4)' },
            0.55,
          )
          .from(
            q(`.${styles.voucher}`),
            {
              scale: 1.6,
              rotate: -8,
              autoAlpha: 0,
              duration: 0.5,
              ease: 'back.out(2)',
            },
            0.75,
          );
      });

      return () => {
        cancelled = true;
      };
    },
    { scope: ref },
  );
}
