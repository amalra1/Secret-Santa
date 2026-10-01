'use client';

import { useMemo, useRef } from 'react';
import { MAX_PARTICIPANTS, MIN_PARTICIPANTS } from '@/constants/draw';
import { cx } from '@/lib/classNames';
import { fill, padIndex } from '@/lib/format';
import { findDuplicateIds } from '@/lib/participants';
import { useCopy } from '@/hooks/useCopy';
import { useDraw } from '@/hooks/useDraw';
import Field from '@/components/ui/Field/Field';
import TribalGlyph from '@/components/ornaments/TribalGlyph/TribalGlyph';
import PersonRow from './PersonRow';
import { usePeopleComposer } from './usePeopleComposer';
import styles from './PeopleStep.module.css';

export default function PeopleStep() {
  const { wizard } = useCopy();
  const copy = wizard.people;
  const { state, updateParticipant, removeParticipant } = useDraw();
  const { participants } = state;
  const inputRef = useRef<HTMLInputElement>(null);
  const composer = usePeopleComposer(copy);
  const duplicates = useMemo(
    () => findDuplicateIds(participants),
    [participants],
  );
  const full = participants.length >= MAX_PARTICIPANTS;
  const belowMinimum = participants.length < MIN_PARTICIPANTS;

  return (
    <div className={styles.people}>
      <Field label={copy.label} error={composer.error ?? undefined}>
        {(control) => (
          <div className={styles.composer}>
            <input
              {...control}
              ref={inputRef}
              type="text"
              value={composer.draft}
              placeholder={copy.placeholder}
              autoComplete="off"
              autoCapitalize="words"
              enterKeyHint="enter"
              disabled={full}
              onChange={(event) => composer.setDraft(event.target.value)}
              onKeyDown={composer.onKeyDown}
            />
            <button
              type="button"
              className={cx(styles.add, 'display')}
              onClick={() => {
                composer.submit();
                inputRef.current?.focus();
              }}
              disabled={full || !composer.draft.trim()}
              aria-label={copy.add}
            >
              <span aria-hidden="true">+</span>
            </button>
          </div>
        )}
      </Field>

      <div className={cx(styles.status, 'mono')}>
        <span aria-live="polite">
          {fill(copy.count, {
            count: padIndex(participants.length),
            max: MAX_PARTICIPANTS,
          })}
        </span>
        {belowMinimum && (
          <span className={styles.minimum}>
            {fill(copy.minimum, { min: MIN_PARTICIPANTS })}
          </span>
        )}
      </div>

      {participants.length === 0 ? (
        <div className={styles.empty}>
          <TribalGlyph name="koru" className={styles.emptyGlyph} />
          <p className="mono">{copy.empty}</p>
        </div>
      ) : (
        <ol className={styles.list}>
          {participants.map((participant, index) => (
            <PersonRow
              key={participant.id}
              index={index + 1}
              participant={participant}
              duplicate={duplicates.has(participant.id)}
              copy={copy}
              onRename={updateParticipant}
              onRemove={removeParticipant}
              onEnter={() => inputRef.current?.focus()}
            />
          ))}
        </ol>
      )}
    </div>
  );
}
