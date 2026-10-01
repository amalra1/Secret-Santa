import { describe, expect, it } from 'vitest';
import { createAssignments, toPairings } from '@/lib/draw';

const RUNS = 2000;

function idsOf(count: number) {
  return Array.from({ length: count }, (_, index) => `p${index}`);
}

function cycleLength(assignments: ReturnType<typeof createAssignments>) {
  const receiverOf = new Map(
    assignments.map(({ giverId, receiverId }) => [giverId, receiverId]),
  );
  const start = assignments[0].giverId;
  let current = receiverOf.get(start);
  let length = 1;
  while (current !== start) {
    current = receiverOf.get(current as string);
    length += 1;
  }
  return length;
}

describe('createAssignments', () => {
  it('never assigns someone to themselves', () => {
    for (let run = 0; run < RUNS; run++) {
      const assignments = createAssignments(idsOf(3 + (run % 10)));
      assignments.forEach(({ giverId, receiverId }) =>
        expect(giverId).not.toBe(receiverId),
      );
    }
  });

  it('gives and receives exactly once per person', () => {
    const ids = idsOf(12);
    const assignments = createAssignments(ids);
    expect(assignments.map(({ giverId }) => giverId)).toEqual(ids);
    expect(assignments.map(({ receiverId }) => receiverId).sort()).toEqual(
      [...ids].sort(),
    );
  });

  it('links everyone in a single chain', () => {
    for (let run = 0; run < 200; run++) {
      const ids = idsOf(3 + (run % 20));
      expect(cycleLength(createAssignments(ids))).toBe(ids.length);
    }
  });

  it('spreads receivers evenly', () => {
    const ids = idsOf(4);
    const counts = new Map<string, number>();
    for (let run = 0; run < RUNS * 3; run++) {
      const { receiverId } = createAssignments(ids)[0];
      counts.set(receiverId, (counts.get(receiverId) ?? 0) + 1);
    }
    expect(counts.has('p0')).toBe(false);
    const expected = (RUNS * 3) / 3;
    counts.forEach((count) =>
      expect(Math.abs(count - expected) / expected).toBeLessThan(0.1),
    );
  });

  it('returns nothing for fewer than two people', () => {
    expect(createAssignments(['solo'])).toEqual([]);
  });
});

describe('toPairings', () => {
  it('resolves ids into people and drops unknown ids', () => {
    const people = [
      { id: 'a', name: 'Ana' },
      { id: 'b', name: 'Bia' },
    ];
    const pairings = toPairings(people, [
      { giverId: 'a', receiverId: 'b' },
      { giverId: 'b', receiverId: 'ghost' },
    ]);
    expect(pairings).toEqual([{ giver: people[0], receiver: people[1] }]);
  });
});
