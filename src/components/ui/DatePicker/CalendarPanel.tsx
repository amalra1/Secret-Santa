'use client';

import { useEffect, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import {
  addDays,
  addMonths,
  isSameDay,
  isSameMonth,
  monthGrid,
  startOfDay,
  startOfMonth,
  toISODate,
} from '@/lib/calendar';
import { cx } from '@/lib/classNames';
import { useLanguage } from '@/hooks/useLanguage';
import type { CalendarPanelProps } from '@/types/components/ui';
import styles from './DatePicker.module.css';

const KEY_STEPS: Record<string, number> = {
  ArrowLeft: -1,
  ArrowRight: 1,
  ArrowUp: -7,
  ArrowDown: 7,
};
const SUNDAY = new Date(2023, 0, 1);

export default function CalendarPanel({
  selected,
  min,
  labels,
  onSelect,
  onClose,
}: CalendarPanelProps) {
  const { language } = useLanguage();
  const today = startOfDay(min);
  const [focused, setFocused] = useState(() =>
    selected && selected >= today ? selected : today,
  );
  const [month, setMonth] = useState(() => startOfMonth(focused));
  const panelRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const moved = useRef(false);

  useEffect(() => {
    panelRef.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }, []);

  const monthLabel = new Intl.DateTimeFormat(language, {
    month: 'long',
    year: 'numeric',
  }).format(month);
  const weekday = new Intl.DateTimeFormat(language, { weekday: 'narrow' });
  const dayLabel = new Intl.DateTimeFormat(language, { dateStyle: 'full' });
  const canGoBack = month > startOfMonth(today);
  const days = monthGrid(month);
  const tabbable = isSameMonth(focused, month)
    ? focused
    : (days.find((day) => isSameMonth(day, month) && day >= today) ?? focused);

  useEffect(() => {
    const target = gridRef.current?.querySelector<HTMLButtonElement>(
      `[data-date="${toISODate(focused)}"]`,
    );
    target?.focus({ preventScroll: !moved.current });
    moved.current = true;
  }, [focused]);

  const focusDate = (date: Date) => {
    const next = date < today ? today : date;
    setFocused(next);
    if (!isSameMonth(next, month)) setMonth(startOfMonth(next));
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') return onClose();
    const step = KEY_STEPS[event.key];
    const monthStep = { PageUp: -1, PageDown: 1 }[event.key];
    if (step === undefined && monthStep === undefined) return;
    event.preventDefault();
    focusDate(
      step !== undefined
        ? addDays(focused, step)
        : addMonths(focused, monthStep ?? 0),
    );
  };

  return (
    <div
      ref={panelRef}
      className={styles.panel}
      role="dialog"
      aria-label={labels.label}
      onKeyDown={onKeyDown}
    >
      <div className={styles.head}>
        <button
          type="button"
          className={styles.nav}
          onClick={() => setMonth(addMonths(month, -1))}
          disabled={!canGoBack}
          aria-label={labels.previousMonth}
        >
          <span aria-hidden="true">←</span>
        </button>
        <p className={cx(styles.month, 'display')} aria-live="polite">
          {monthLabel}
        </p>
        <button
          type="button"
          className={styles.nav}
          onClick={() => setMonth(addMonths(month, 1))}
          aria-label={labels.nextMonth}
        >
          <span aria-hidden="true">→</span>
        </button>
      </div>

      <div className={cx(styles.weekdays, 'mono')} aria-hidden="true">
        {Array.from({ length: 7 }, (_, index) => (
          <span key={index}>{weekday.format(addDays(SUNDAY, index))}</span>
        ))}
      </div>

      <div ref={gridRef} className={styles.grid}>
        {days.map((day) => {
          const past = day < today;
          const outside = !isSameMonth(day, month);
          return (
            <button
              key={toISODate(day)}
              type="button"
              data-date={toISODate(day)}
              className={cx(
                styles.day,
                outside && styles.outside,
                isSameDay(day, today) && styles.today,
                selected && isSameDay(day, selected) && styles.selected,
              )}
              disabled={past}
              tabIndex={isSameDay(day, tabbable) ? 0 : -1}
              aria-label={dayLabel.format(day)}
              aria-pressed={Boolean(selected && isSameDay(day, selected))}
              onClick={() => onSelect(day)}
            >
              {day.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}
