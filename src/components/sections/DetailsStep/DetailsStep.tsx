'use client';

import {
  BUDGET_MAX_LENGTH,
  NOTE_MAX_LENGTH,
  PLACE_MAX_LENGTH,
} from '@/constants/draw';
import { useCopy } from '@/hooks/useCopy';
import { useDraw } from '@/hooks/useDraw';
import { startOfDay, toISODate } from '@/lib/calendar';
import DatePicker from '@/components/ui/DatePicker/DatePicker';
import Field from '@/components/ui/Field/Field';
import styles from './DetailsStep.module.css';

export default function DetailsStep() {
  const { wizard } = useCopy();
  const { state, setDetails } = useDraw();
  const { details } = state;
  const copy = wizard.details;

  return (
    <div className={styles.grid}>
      <Field label={copy.budget} optionalLabel={wizard.optional}>
        {(control) => (
          <input
            {...control}
            type="text"
            inputMode="text"
            value={details.budget}
            maxLength={BUDGET_MAX_LENGTH}
            placeholder={copy.budgetPlaceholder}
            autoComplete="off"
            enterKeyHint="next"
            onChange={(event) => setDetails({ budget: event.target.value })}
          />
        )}
      </Field>
      <Field label={copy.place} optionalLabel={wizard.optional}>
        {(control) => (
          <input
            {...control}
            type="text"
            value={details.place}
            maxLength={PLACE_MAX_LENGTH}
            placeholder={copy.placePlaceholder}
            autoComplete="off"
            enterKeyHint="next"
            onChange={(event) => setDetails({ place: event.target.value })}
          />
        )}
      </Field>
      <DatePicker
        className={styles.wide}
        value={details.date}
        min={toISODate(startOfDay(new Date()))}
        labels={{
          label: copy.date,
          optional: wizard.optional,
          placeholder: copy.datePlaceholder,
          previousMonth: copy.previousMonth,
          nextMonth: copy.nextMonth,
          clear: copy.clearDate,
        }}
        onChange={(date) => setDetails({ date })}
      />
      <Field
        label={copy.note}
        optionalLabel={wizard.optional}
        length={details.note.length}
        maxLength={NOTE_MAX_LENGTH}
        className={styles.wide}
      >
        {(control) => (
          <textarea
            {...control}
            value={details.note}
            maxLength={NOTE_MAX_LENGTH}
            placeholder={copy.notePlaceholder}
            onChange={(event) => setDetails({ note: event.target.value })}
          />
        )}
      </Field>
    </div>
  );
}
