'use client';

import { cx } from '@/lib/classNames';
import { formatEventDate } from '@/lib/format';
import { useCopy } from '@/hooks/useCopy';
import { useLanguage } from '@/hooks/useLanguage';
import type { EventDetailsListProps } from '@/types/components/sections';
import styles from './EventDetails.module.css';

export default function EventDetails({
  details,
  className,
}: EventDetailsListProps) {
  const { draw } = useCopy();
  const { language } = useLanguage();
  const items = [
    { label: draw.budget, value: details.budget },
    {
      label: draw.date,
      value: details.date && formatEventDate(details.date, language),
    },
    { label: draw.place, value: details.place },
  ].filter(({ value }) => value);

  if (!items.length && !details.note) return null;

  return (
    <div className={cx(styles.details, className)}>
      {items.length > 0 && (
        <dl className={styles.list}>
          {items.map(({ label, value }) => (
            <div key={label} className={styles.item}>
              <dt className="mono">{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      )}
      {details.note && (
        <blockquote className={styles.note}>
          <p className={cx(styles.noteLabel, 'mono')}>{draw.note}</p>
          <p>{details.note}</p>
        </blockquote>
      )}
    </div>
  );
}
