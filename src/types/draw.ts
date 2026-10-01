export interface Participant {
  id: string;
  name: string;
}

export interface EventDetails {
  budget: string;
  date: string;
  place: string;
  note: string;
}

export interface Assignment {
  giverId: string;
  receiverId: string;
}

export interface DrawState {
  version: number;
  groupName: string;
  participants: Participant[];
  details: EventDetails;
  assignments: Assignment[];
  revealedIds: string[];
}

export interface Pairing {
  giver: Participant;
  receiver: Participant;
}

export type RandomSource = () => number;

export type DrawAction =
  | { type: 'hydrate'; state: DrawState }
  | { type: 'setGroupName'; name: string }
  | { type: 'addParticipants'; names: string[] }
  | { type: 'updateParticipant'; id: string; name: string }
  | { type: 'removeParticipant'; id: string }
  | { type: 'setDetails'; details: Partial<EventDetails> }
  | { type: 'setAssignments'; assignments: Assignment[] }
  | { type: 'markRevealed'; id: string }
  | { type: 'reset' };

export interface DrawContextValue {
  state: DrawState;
  hydrated: boolean;
  pairings: Pairing[];
  setGroupName: (name: string) => void;
  addParticipants: (names: string[]) => void;
  updateParticipant: (id: string, name: string) => void;
  removeParticipant: (id: string) => void;
  setDetails: (details: Partial<EventDetails>) => void;
  runDraw: () => void;
  markRevealed: (id: string) => void;
  reset: () => void;
}
