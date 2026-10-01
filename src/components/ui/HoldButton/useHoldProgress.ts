'use client';

import { useCallback, useEffect, useRef } from 'react';
import { HAPTIC_PULSE_MS } from '@/constants/motion';
import type { HoldProgressOptions } from '@/types/hooks';

const RELEASE_SPEED = 2.5;
const PROGRESS_PROPERTY = '--progress';

export function useHoldProgress({
  duration,
  onComplete,
  onHoldingChange,
}: HoldProgressOptions) {
  const ref = useRef<HTMLButtonElement>(null);
  const frame = useRef(0);
  const progress = useRef(0);
  const lastTime = useRef(0);
  const holding = useRef(false);
  const completed = useRef(false);

  const tick = useCallback(
    (now: number) => {
      const step = (now - lastTime.current) / duration;
      lastTime.current = now;
      const delta = holding.current ? step : -step * RELEASE_SPEED;
      progress.current = Math.min(Math.max(progress.current + delta, 0), 1);
      ref.current?.style.setProperty(
        PROGRESS_PROPERTY,
        String(progress.current),
      );

      if (progress.current >= 1) {
        frame.current = 0;
        completed.current = true;
        holding.current = false;
        onHoldingChange(false);
        navigator.vibrate?.(HAPTIC_PULSE_MS);
        onComplete();
        return;
      }
      if (progress.current <= 0 && !holding.current) {
        frame.current = 0;
        return;
      }
      frame.current = requestAnimationFrame(tick);
    },
    [duration, onComplete, onHoldingChange],
  );

  const run = useCallback(
    (nextHolding: boolean) => {
      if (completed.current || holding.current === nextHolding) return;
      holding.current = nextHolding;
      onHoldingChange(nextHolding);
      if (frame.current) return;
      lastTime.current = performance.now();
      frame.current = requestAnimationFrame(tick);
    },
    [onHoldingChange, tick],
  );

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  return {
    ref,
    start: useCallback(() => run(true), [run]),
    stop: useCallback(() => run(false), [run]),
  };
}
