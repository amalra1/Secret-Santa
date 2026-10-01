'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { ROUTES } from '@/constants/routes';
import { cx } from '@/lib/classNames';
import { fill } from '@/lib/format';
import { useCopy } from '@/hooks/useCopy';
import { useDraw } from '@/hooks/useDraw';
import EventDetails from '@/components/sections/EventDetails/EventDetails';
import PassPhone from '@/components/sections/PassPhone/PassPhone';
import DrawActions from './DrawActions';
import { useDrawHubAnimation } from './useDrawHubAnimation';
import styles from './DrawHub.module.css';

export default function DrawHub() {
  const { draw } = useCopy();
  const { state, hydrated, pairings } = useDraw();
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const ready = hydrated && pairings.length > 0;
  useDrawHubAnimation(ref, ready);

  useEffect(() => {
    if (hydrated && !pairings.length) router.replace(ROUTES.create);
  }, [hydrated, pairings.length, router]);

  if (!ready) return <div className="page" />;

  return (
    <div ref={ref} className={cx('page', styles.hub)}>
      <header className={styles.summary}>
        <p className={cx(styles.kicker, 'mono')}>
          {draw.word} · {fill(draw.people, { count: pairings.length })}
        </p>
        <h1 className={cx(styles.group, 'display')}>{state.groupName}</h1>
        <EventDetails details={state.details} />
      </header>

      <section className={styles.panel}>
        <PassPhone
          pairings={pairings}
          groupName={state.groupName}
          details={state.details}
        />
      </section>

      <DrawActions />
    </div>
  );
}
