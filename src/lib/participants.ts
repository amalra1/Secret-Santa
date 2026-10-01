import type { Participant } from '@/types/draw';

export function normalizeName(name: string) {
  return name.replace(/\s+/g, ' ').trim();
}

export function nameKey(name: string) {
  return normalizeName(name).toLocaleLowerCase();
}

export function findDuplicateIds(participants: readonly Participant[]) {
  const idsByKey = new Map<string, string[]>();
  participants.forEach(({ id, name }) => {
    const key = nameKey(name);
    if (!key) return;
    idsByKey.set(key, [...(idsByKey.get(key) ?? []), id]);
  });
  return new Set([...idsByKey.values()].filter((ids) => ids.length > 1).flat());
}
