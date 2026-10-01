'use client';

import { useId, useState } from 'react';
import type { KeyboardEvent, PointerEvent } from 'react';
import { HOLD_TO_REVEAL_MS } from '@/constants/motion';
import { cx } from '@/lib/classNames';
import type { HoldButtonProps } from '@/types/components/ui';
import { useHoldProgress } from './useHoldProgress';
import styles from './HoldButton.module.css';

const HOLD_KEYS = new Set([' ', 'Enter']);

export default function HoldButton({
  label,
  holdingLabel,
  hint,
  onComplete,
  duration = HOLD_TO_REVEAL_MS,
  className,
}: HoldButtonProps) {
  const hintId = useId();
  const [holding, setHolding] = useState(false);
  const { ref, start, stop } = useHoldProgress({
    duration,
    onComplete,
    onHoldingChange: setHolding,
  });

  const onPointerDown = (event: PointerEvent<HTMLButtonElement>) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    start();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (!HOLD_KEYS.has(event.key)) return;
    event.preventDefault();
    if (!event.repeat) start();
  };

  const onKeyUp = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (HOLD_KEYS.has(event.key)) stop();
  };

  return (
    <button
      ref={ref}
      type="button"
      className={cx(
        styles.hold,
        'display',
        holding && styles.holding,
        className,
      )}
      aria-describedby={hintId}
      onPointerDown={onPointerDown}
      onPointerUp={stop}
      onPointerCancel={stop}
      onLostPointerCapture={stop}
      onKeyDown={onKeyDown}
      onKeyUp={onKeyUp}
      onBlur={stop}
      onContextMenu={(event) => event.preventDefault()}
    >
      <span className={styles.fill} aria-hidden="true" />
      <span className={styles.label}>{holding ? holdingLabel : label}</span>
      <span id={hintId} className="visually-hidden">
        {hint}
      </span>
    </button>
  );
}
