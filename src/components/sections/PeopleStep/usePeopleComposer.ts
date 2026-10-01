'use client';

import { useState } from 'react';
import type { KeyboardEvent } from 'react';
import { MAX_PARTICIPANTS } from '@/constants/draw';
import { fill } from '@/lib/format';
import { nameKey, normalizeName } from '@/lib/participants';
import { useDraw } from '@/hooks/useDraw';
import type { PeopleCopy } from '@/types/components/sections';

export function usePeopleComposer(copy: PeopleCopy) {
  const { state, addParticipants } = useDraw();
  const { participants } = state;
  const [draft, setDraftValue] = useState('');
  const [error, setError] = useState<string | null>(null);

  const setDraft = (value: string) => {
    setDraftValue(value);
    setError(null);
  };

  const submit = () => {
    const name = normalizeName(draft);
    if (!name) return;
    if (participants.length >= MAX_PARTICIPANTS) {
      setError(fill(copy.full, { max: MAX_PARTICIPANTS }));
      return;
    }
    if (participants.some((person) => nameKey(person.name) === nameKey(name))) {
      setError(fill(copy.alreadyIn, { name }));
      return;
    }
    addParticipants([name]);
    setDraftValue('');
    setError(null);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter' || event.nativeEvent.isComposing) return;
    event.preventDefault();
    submit();
  };

  return { draft, setDraft, error, submit, onKeyDown };
}
