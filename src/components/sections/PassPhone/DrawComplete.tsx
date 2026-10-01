'use client';

import { daysUntil } from '@/lib/calendar';
import { cx } from '@/lib/classNames';
import { fill, formatEventDate } from '@/lib/format';
import { useCopy } from '@/hooks/useCopy';
import { useLanguage } from '@/hooks/useLanguage';
import GlyphBurst from '@/components/ui/GlyphBurst/GlyphBurst';
import Ticket from '@/components/ui/Ticket/Ticket';
import TribalGlyph from '@/components/ornaments/TribalGlyph/TribalGlyph';
import type { DrawCompleteProps } from '@/types/components/sections';
import styles from './DrawComplete.module.css';

export default function DrawComplete({ date }: DrawCompleteProps) {
  const { draw } = useCopy();
  const { language } = useLanguage();
  const days = daysUntil(date, new Date());

  const countdown = (() => {
    if (days === null) return draw.doneNoDate;
    if (days < 0)
      return fill(draw.donePast, { date: formatEventDate(date, language) });
    if (days === 0) return draw.doneToday;
    if (days === 1) return draw.doneTomorrow;
    return fill(draw.doneDays, { days });
  })();

  return (
    <div className={styles.complete} role="status">
      <GlyphBurst active />
      <Ticket
        className={styles.ticket}
        stubClassName={styles.stub}
        bodyClassName={styles.body}
        stub={<TribalGlyph name="crown" className={styles.crown} />}
      >
        <p className={cx(styles.kicker, 'mono')}>{draw.doneKicker}</p>
        <p className={cx(styles.title, 'display')}>{draw.doneTitle}</p>
        <p className={cx(styles.wish, 'gothic')}>{draw.doneWish}</p>
        <p className={styles.countdown}>{countdown}</p>
      </Ticket>
      <p className={cx(styles.again, 'mono')}>{draw.doneAgain}</p>
    </div>
  );
}
