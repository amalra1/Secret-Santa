'use client';

import { useEffect, useRef, useState } from 'react';
import { parseISODate, toISODate } from '@/lib/calendar';
import { cx } from '@/lib/classNames';
import { formatEventDate } from '@/lib/format';
import { useLanguage } from '@/hooks/useLanguage';
import Field from '@/components/ui/Field/Field';
import TribalGlyph from '@/components/ornaments/TribalGlyph/TribalGlyph';
import type { DatePickerProps } from '@/types/components/ui';
import CalendarPanel from './CalendarPanel';
import styles from './DatePicker.module.css';

export default function DatePicker({
  value,
  min,
  labels,
  onChange,
  className,
}: DatePickerProps) {
  const { language } = useLanguage();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const selected = parseISODate(value);
  const minDate = parseISODate(min) ?? new Date();

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [open]);

  const close = () => {
    setOpen(false);
    triggerRef.current?.focus();
  };

  return (
    <div ref={rootRef} className={cx(styles.picker, className)}>
      <Field label={labels.label} optionalLabel={labels.optional}>
        {(control) => (
          <button
            {...control}
            ref={triggerRef}
            type="button"
            className={cx(control.className, styles.trigger)}
            aria-haspopup="dialog"
            aria-expanded={open}
            onClick={() => setOpen((isOpen) => !isOpen)}
          >
            <span className={cx(!selected && styles.placeholder)}>
              {selected ? formatEventDate(value, language) : labels.placeholder}
            </span>
            <TribalGlyph name="calendar" className={styles.icon} />
          </button>
        )}
      </Field>

      {open && (
        <CalendarPanel
          selected={selected}
          min={minDate}
          labels={labels}
          onSelect={(date) => {
            onChange(toISODate(date));
            close();
          }}
          onClose={close}
        />
      )}

      {selected && !open && (
        <button
          type="button"
          className={cx(styles.clear, 'mono')}
          onClick={() => onChange('')}
        >
          {labels.clear} <span aria-hidden="true">✕</span>
        </button>
      )}
    </div>
  );
}
