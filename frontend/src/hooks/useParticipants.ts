'use client';

import { useState } from 'react';

type Participant = {
  id: number;
  name: string;
  errors: {
    name: string | null;
  };
};

const createEmptyParticipant = (): Participant => ({
  id: Date.now() + Math.random(),
  name: '',
  errors: { name: null },
});

export function useParticipants() {
  const [participants, setParticipants] = useState<Participant[]>([
    createEmptyParticipant(),
    createEmptyParticipant(),
    createEmptyParticipant(),
    createEmptyParticipant(),
  ]);

  const handleAddParticipant = () => {
    if (participants.length < 20) {
      setParticipants((prev) => [...prev, createEmptyParticipant()]);
    }
  };

  const handleRemoveParticipant = (id: number) => {
    if (participants.length > 4) {
      setParticipants((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const handleParticipantChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newParticipants = [...participants];
    const participant = newParticipants[index];

    participant.name = event.target.value;
    participant.errors.name = null;

    setParticipants(newParticipants);
  };

  const handleNameBlur = (index: number) => {
    const newParticipants = [...participants];
    const participant = newParticipants[index];
    const trimmedName = participant.name.trim();

    if (trimmedName === '') {
      participant.errors.name = null;
      setParticipants(newParticipants);
      return;
    }

    const isDuplicate = participants.some(
      (p, i) =>
        i !== index &&
        p.name.trim().toLowerCase() === trimmedName.toLowerCase(),
    );

    participant.errors.name = isDuplicate
      ? 'This name is already in the list.'
      : null;
    setParticipants(newParticipants);
  };

  return {
    participants,
    setParticipants,
    handleAddParticipant,
    handleRemoveParticipant,
    handleParticipantChange,
    handleNameBlur,
  };
}
