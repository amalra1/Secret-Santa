import type { AppCopy } from '@/types/copy';
import type { EventDetails, Pairing, Participant } from '@/types/draw';

export type PeopleCopy = AppCopy['wizard']['people'];

export interface PersonRowProps {
  index: number;
  participant: Participant;
  duplicate: boolean;
  copy: PeopleCopy;
  onRename: (id: string, name: string) => void;
  onRemove: (id: string) => void;
  onEnter: () => void;
}

export interface DrawSummaryProps {
  groupName: string;
  count: number;
  details: EventDetails;
}

export interface EventDetailsListProps {
  details: EventDetails;
  className?: string;
}

export interface PassPhoneProps {
  pairings: Pairing[];
  groupName: string;
  details: EventDetails;
}

export interface NameCardProps {
  giverId: string;
  index: number;
  name: string;
  seen: boolean;
  seenLabel: string;
  onSelect: () => void;
}

export interface RevealCardProps {
  groupName: string;
  giver: string;
  receiver: string;
  details: EventDetails;
  doneLabel: string;
  onDone: () => void;
  onRevealed?: () => void;
}

export type DrawDialog = 'redo' | 'reset' | null;

export interface DrawCompleteProps {
  date: string;
}
