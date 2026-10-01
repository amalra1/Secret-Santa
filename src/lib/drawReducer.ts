import { MAX_PARTICIPANTS } from '@/constants/draw';
import { createId } from '@/lib/id';
import { createInitialState } from '@/lib/storage';
import type { DrawAction, DrawState } from '@/types/draw';

function withoutDraw(state: DrawState): DrawState {
  return { ...state, assignments: [], revealedIds: [] };
}

export function drawReducer(state: DrawState, action: DrawAction): DrawState {
  switch (action.type) {
    case 'hydrate':
      return action.state;
    case 'setGroupName':
      return { ...state, groupName: action.name };
    case 'addParticipants': {
      const room = MAX_PARTICIPANTS - state.participants.length;
      const added = action.names
        .slice(0, Math.max(room, 0))
        .map((name) => ({ id: createId(), name }));
      if (!added.length) return state;
      return withoutDraw({
        ...state,
        participants: [...state.participants, ...added],
      });
    }
    case 'updateParticipant':
      return withoutDraw({
        ...state,
        participants: state.participants.map((person) =>
          person.id === action.id ? { ...person, name: action.name } : person,
        ),
      });
    case 'removeParticipant':
      return withoutDraw({
        ...state,
        participants: state.participants.filter(({ id }) => id !== action.id),
      });
    case 'setDetails':
      return { ...state, details: { ...state.details, ...action.details } };
    case 'setAssignments':
      return {
        ...state,
        assignments: action.assignments,
        revealedIds: [],
      };
    case 'markRevealed':
      return state.revealedIds.includes(action.id)
        ? state
        : { ...state, revealedIds: [...state.revealedIds, action.id] };
    case 'reset':
      return createInitialState();
  }
}
