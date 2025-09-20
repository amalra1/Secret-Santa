'use client';

import { useState } from 'react';

type Participant = {
  id: number;
  name: string;
  email: string;
  error: string | null;
};

const validateEmail = (email: string) => {
  if (!email) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export function useParticipants() {
  const [participants, setParticipants] = useState<Participant[]>([
    { id: Date.now(), name: '', email: '', error: null },
  ]);

  const handleAddParticipant = () => {
    setParticipants((prev) => [
      ...prev,
      { id: Date.now(), name: '', email: '', error: null },
    ]);
  };

  const handleRemoveParticipant = (id: number) => {
    setParticipants((prev) => prev.filter((p) => p.id !== id));
  };

  const handleParticipantChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newParticipants = [...participants];
    const participant = newParticipants[index];
    participant[event.target.name as 'name' | 'email'] = event.target.value;

    if (event.target.name === 'email') {
      participant.error = null;
    }

    setParticipants(newParticipants);
  };

  const handleEmailBlur = (index: number) => {
    const newParticipants = [...participants];
    const participant = newParticipants[index];

    if (!validateEmail(participant.email)) {
      participant.error = 'Please enter a valid email format.';
    } else {
      participant.error = null;
    }
    setParticipants(newParticipants);
  };

  return {
    participants,
    setParticipants,
    handleAddParticipant,
    handleRemoveParticipant,
    handleParticipantChange,
    handleEmailBlur,
    validateEmail,
  };
}
