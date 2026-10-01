'use client';

import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react';
import { createAssignments, toPairings } from '@/lib/draw';
import { drawReducer } from '@/lib/drawReducer';
import { createInitialState, readState, writeState } from '@/lib/storage';
import type { DrawContextValue, EventDetails } from '@/types/draw';
import type { DrawProviderProps } from '@/types/components/providers';

export const DrawContext = createContext<DrawContextValue | undefined>(
  undefined,
);

export function DrawProvider({ children }: DrawProviderProps) {
  const [state, dispatch] = useReducer(
    drawReducer,
    undefined,
    createInitialState,
  );
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = readState();
    if (stored) dispatch({ type: 'hydrate', state: stored });
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) writeState(state);
  }, [state, hydrated]);

  const runDraw = useCallback(() => {
    dispatch({
      type: 'setAssignments',
      assignments: createAssignments(state.participants.map(({ id }) => id)),
    });
  }, [state.participants]);

  const actions = useMemo(
    () => ({
      setGroupName: (name: string) => dispatch({ type: 'setGroupName', name }),
      addParticipants: (names: string[]) =>
        dispatch({ type: 'addParticipants', names }),
      updateParticipant: (id: string, name: string) =>
        dispatch({ type: 'updateParticipant', id, name }),
      removeParticipant: (id: string) =>
        dispatch({ type: 'removeParticipant', id }),
      setDetails: (details: Partial<EventDetails>) =>
        dispatch({ type: 'setDetails', details }),
      markRevealed: (id: string) => dispatch({ type: 'markRevealed', id }),
      reset: () => dispatch({ type: 'reset' }),
    }),
    [],
  );

  const pairings = useMemo(
    () => toPairings(state.participants, state.assignments),
    [state.participants, state.assignments],
  );

  return (
    <DrawContext.Provider
      value={{ state, hydrated, pairings, runDraw, ...actions }}
    >
      {children}
    </DrawContext.Provider>
  );
}
