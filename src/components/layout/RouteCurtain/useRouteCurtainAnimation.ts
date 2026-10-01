'use client';

import { useRef } from 'react';
import type { RefObject } from 'react';
import { MAIN_CONTENT_ID } from '@/constants/routes';
import { gsap } from '@/lib/gsap';
import { useMediaAnimation } from '@/hooks/useMediaAnimation';

const CONTENT_OFFSET = 40;

export function useRouteCurtainAnimation(
  ref: RefObject<HTMLDivElement | null>,
  pathname: string,
) {
  const previous = useRef(pathname);

  useMediaAnimation(
    () => {
      const curtain = ref.current;
      if (!curtain || previous.current === pathname) return;
      previous.current = pathname;
      const main = document.getElementById(MAIN_CONTENT_ID);

      gsap
        .timeline()
        .fromTo(
          curtain,
          { autoAlpha: 1, clipPath: 'inset(0% 0% 0% 0%)' },
          {
            clipPath: 'inset(0% 0% 100% 0%)',
            duration: 0.75,
            ease: 'expo.inOut',
          },
        )
        .set(curtain, { autoAlpha: 0 })
        .from(
          main,
          {
            y: CONTENT_OFFSET,
            autoAlpha: 0,
            duration: 0.8,
            ease: 'power3.out',
            clearProps: 'transform,opacity,visibility',
          },
          0.25,
        );
    },
    { dependencies: [pathname], revertOnUpdate: true },
  );
}
