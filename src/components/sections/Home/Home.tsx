'use client';

import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import { ROUTES } from '@/constants/routes';
import { cx } from '@/lib/classNames';
import { fill } from '@/lib/format';
import { useCopy } from '@/hooks/useCopy';
import { useDraw } from '@/hooks/useDraw';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import Button from '@/components/ui/Button/Button';
import ButtonLink from '@/components/ui/ButtonLink/ButtonLink';
import Ticket from '@/components/ui/Ticket/Ticket';
import TribalGlyph from '@/components/ornaments/TribalGlyph/TribalGlyph';
import { tearStub, useHomeAnimation } from './useHomeAnimation';
import styles from './Home.module.css';

export default function Home() {
  const { home } = useCopy();
  const { state, hydrated } = useDraw();
  const router = useRouter();
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  useHomeAnimation(ref);
  const canResume = hydrated && state.assignments.length > 0;

  const start = () => {
    const go = () => router.push(ROUTES.create);
    if (reduced || !ref.current) return go();
    tearStub(ref.current, go);
  };

  return (
    <section ref={ref} className={styles.home}>
      <Ticket
        className={styles.ticket}
        stubClassName={styles.stub}
        bodyClassName={styles.body}
        stub={
          <>
            <TribalGlyph name="gift" className={styles.stubGlyph} />
            <span className={cx(styles.serial, 'mono')}>{home.serial}</span>
            <TribalGlyph name="spark" className={styles.stubSpark} />
          </>
        }
      >
        <span className={cx(styles.kicker, 'mono')}>{home.kicker}</span>
        <h1 className={cx(styles.title, 'display')}>
          <span>{home.titleTop}</span>{' '}
          <span className={styles.accent}>{home.titleBottom}</span>
        </h1>
        <span className={cx(styles.voucher, 'gothic')}>{home.voucher}</span>
        <span className={styles.tagline}>{home.tagline}</span>
        <Button block arrow="→" onClick={start} className={styles.cta}>
          {home.start}
        </Button>
      </Ticket>

      {canResume && (
        <ButtonLink href={ROUTES.draw} variant="quiet" arrow="↺">
          {fill(home.resume, { group: state.groupName })}
        </ButtonLink>
      )}
    </section>
  );
}
