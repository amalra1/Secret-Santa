import { cryptoRandom, shuffle } from '@/lib/random';
import type { Assignment, Participant, Pairing } from '@/types/draw';

export function createAssignments(
  participantIds: readonly string[],
  random = cryptoRandom,
): Assignment[] {
  if (participantIds.length < 2) return [];
  const chain = shuffle(participantIds, random);
  const receiverOf = new Map(
    chain.map((id, index) => [id, chain[(index + 1) % chain.length]]),
  );
  return participantIds.map((giverId) => ({
    giverId,
    receiverId: receiverOf.get(giverId) as string,
  }));
}

export function toPairings(
  participants: readonly Participant[],
  assignments: readonly Assignment[],
): Pairing[] {
  const byId = new Map(participants.map((person) => [person.id, person]));
  return assignments.flatMap(({ giverId, receiverId }) => {
    const giver = byId.get(giverId);
    const receiver = byId.get(receiverId);
    return giver && receiver ? [{ giver, receiver }] : [];
  });
}
