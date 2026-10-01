'use client';

import { useRef } from 'react';
import type { KeyboardEvent } from 'react';
import { PARTICIPANT_NAME_MAX_LENGTH } from '@/constants/draw';
import { cx } from '@/lib/classNames';
import { fill, padIndex } from '@/lib/format';
import { gsap } from '@/lib/gsap';
import { normalizeName } from '@/lib/participants';
import { useMediaAnimation } from '@/hooks/useMediaAnimation';
import type { PersonRowProps } from '@/types/components/sections';
import styles from './PeopleStep.module.css';

export default function PersonRow({
  index,
  participant,
  duplicate,
  copy,
  onRename,
  onRemove,
  onEnter,
}: PersonRowProps) {
  const ref = useRef<HTMLLIElement>(null);
  const { id, name } = participant;

  useMediaAnimation(
    () => {
      gsap.from(ref.current, {
        x: -24,
        autoAlpha: 0,
        duration: 0.5,
        ease: 'back.out(1.6)',
      });
    },
    { scope: ref },
  );

  const onBlur = () => {
    const cleaned = normalizeName(name);
    if (!cleaned) return onRemove(id);
    if (cleaned !== name) onRename(id, cleaned);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter' || event.nativeEvent.isComposing) return;
    event.preventDefault();
    onEnter();
  };

  return (
    <li ref={ref} className={cx(styles.row, duplicate && styles.duplicate)}>
      <span className={cx(styles.index, 'mono')} aria-hidden="true">
        {padIndex(index)}
      </span>
      <input
        className={styles.name}
        type="text"
        value={name}
        maxLength={PARTICIPANT_NAME_MAX_LENGTH}
        aria-label={fill(copy.rename, { index })}
        aria-invalid={duplicate}
        autoComplete="off"
        autoCapitalize="words"
        enterKeyHint="enter"
        onChange={(event) => onRename(id, event.target.value)}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
      />
      {duplicate && (
        <span className={cx(styles.tag, 'mono')}>{copy.duplicate}</span>
      )}
      <button
        type="button"
        className={styles.remove}
        onClick={() => onRemove(id)}
        aria-label={fill(copy.remove, { name })}
      >
        <span aria-hidden="true">✕</span>
      </button>
    </li>
  );
}
