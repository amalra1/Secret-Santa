'use client';

import { useState } from 'react';

type Participant = {
  id: number;
  name: string;
  email: string;
  errors: {
    name: string | null;
    email: string | null;
  };
};

const validateEmail = (email: string) => {
  if (!email) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export function useParticipants() {
  const [participants, setParticipants] = useState<Participant[]>([
    {
      id: Date.now(),
      name: '',
      email: '',
      errors: { name: null, email: null },
    },
  ]);

  const handleAddParticipant = () => {
    setParticipants((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: '',
        email: '',
        errors: { name: null, email: null },
      },
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
    const fieldName = event.target.name as 'name' | 'email';

    participant[fieldName] = event.target.value;
    participant.errors[fieldName] = null;

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

  const handleEmailBlur = (index: number) => {
    const newParticipants = [...participants];
    const participant = newParticipants[index];
    const trimmedEmail = participant.email.trim();

    if (trimmedEmail === '') {
      participant.errors.email = null;
      setParticipants(newParticipants);
      return;
    }

    if (!validateEmail(trimmedEmail)) {
      participant.errors.email = 'Please enter a valid email format.';
    } else {
      const isDuplicate = participants.some(
        (p, i) =>
          i !== index &&
          p.email.trim().toLowerCase() === trimmedEmail.toLowerCase(),
      );
      participant.errors.email = isDuplicate
        ? 'This email is already in the list.'
        : null;
    }
    setParticipants(newParticipants);
  };

  return {
    participants,
    setParticipants,
    handleAddParticipant,
    handleRemoveParticipant,
    handleParticipantChange,
    handleNameBlur,
    handleEmailBlur,
    validateEmail,
  };
}
