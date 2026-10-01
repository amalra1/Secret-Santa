'use client';

import { useRef, useState } from 'react';
import { LONG_NAME_LENGTH } from '@/constants/draw';
import { cx } from '@/lib/classNames';
import { fill } from '@/lib/format';
import { useCopy } from '@/hooks/useCopy';
import Button from '@/components/ui/Button/Button';
import GlyphBurst from '@/components/ui/GlyphBurst/GlyphBurst';
import HoldButton from '@/components/ui/HoldButton/HoldButton';
import EventDetails from '@/components/sections/EventDetails/EventDetails';
import Ticket from '@/components/ui/Ticket/Ticket';
import TribalGlyph from '@/components/ornaments/TribalGlyph/TribalGlyph';
import type { RevealCardProps } from '@/types/components/sections';
import { useRevealAnimation } from './useRevealAnimation';
import styles from './RevealCard.module.css';

export default function RevealCard({
  groupName,
  giver,
  receiver,
  details,
  doneLabel,
  onDone,
  onRevealed,
}: RevealCardProps) {
  const { reveal } = useCopy();
  const [revealed, setRevealed] = useState(false);
  const ref = useRef<HTMLElement>(null);
  useRevealAnimation(ref, revealed);

  const onComplete = () => {
    setRevealed(true);
    onRevealed?.();
  };

  return (
    <article ref={ref} className={styles.card}>
      <Ticket
        className={styles.ticket}
        stubClassName={styles.stub}
        bodyClassName={styles.body}
        stub={
          <>
            <TribalGlyph name="gift" className={styles.stubGlyph} />
            <span className={cx(styles.stubText, 'mono')}>{groupName}</span>
            <TribalGlyph name="spark" className={styles.stubSpark} />
          </>
        }
      >
        <p className={cx(styles.kicker, 'mono')}>
          {reveal.kicker} <strong>{groupName}</strong>
        </p>
        <h2 className={cx(styles.greeting, 'gothic')}>
          {fill(reveal.greeting, { name: giver })}
        </h2>

        {revealed ? (
          <div key="result" className={styles.result} aria-live="polite">
            <p className={cx(styles.label, 'mono')}>{reveal.youGot}</p>
            <div className={styles.stage}>
              <p
                className={cx(
                  styles.receiver,
                  receiver.length > LONG_NAME_LENGTH && styles.longName,
                  'display',
                )}
              >
                {receiver}
              </p>
              <GlyphBurst active={revealed} />
            </div>
            <EventDetails details={details} className={styles.details} />
            <p className={cx(styles.secret, 'mono')}>{reveal.keepSecret}</p>
            <Button
              variant="ink"
              block
              onClick={onDone}
              className={styles.done}
            >
              {doneLabel}
            </Button>
          </div>
        ) : (
          <div key="locked" className={styles.locked}>
            <p className={cx(styles.mystery, 'display')} aria-hidden="true">
              ?
            </p>
            <HoldButton
              label={reveal.hold}
              holdingLabel={reveal.holding}
              hint={reveal.holdHint}
              onComplete={onComplete}
            />
            <button
              type="button"
              className={cx(styles.notYou, 'mono')}
              onClick={onDone}
            >
              {fill(reveal.notYou, { name: giver })}{' '}
              <span aria-hidden="true">←</span>
            </button>
          </div>
        )}
      </Ticket>
    </article>
  );
}
