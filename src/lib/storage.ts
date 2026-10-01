import { STATE_STORAGE_KEY, STATE_VERSION } from '@/constants/storage';
import type { DrawState } from '@/types/draw';

export function createInitialState(): DrawState {
  return {
    version: STATE_VERSION,
    groupName: '',
    participants: [],
    details: { budget: '', date: '', place: '', note: '' },
    assignments: [],
    revealedIds: [],
  };
}

function isDrawState(value: unknown): value is DrawState {
  if (typeof value !== 'object' || value === null) return false;
  const data = value as Partial<DrawState>;
  return (
    data.version === STATE_VERSION &&
    typeof data.groupName === 'string' &&
    Array.isArray(data.participants) &&
    Array.isArray(data.assignments) &&
    Array.isArray(data.revealedIds) &&
    typeof data.details === 'object' &&
    data.details !== null
  );
}

export function readState(): DrawState | null {
  try {
    const raw = window.localStorage.getItem(STATE_STORAGE_KEY);
    if (!raw) return null;
    const data: unknown = JSON.parse(raw);
    if (!isDrawState(data)) return null;
    return { ...createInitialState(), ...data };
  } catch {
    return null;
  }
}

export function writeState(state: DrawState) {
  try {
    window.localStorage.setItem(STATE_STORAGE_KEY, JSON.stringify(state));
  } catch {}
}

export function readSession(key: string) {
  try {
    return window.sessionStorage.getItem(key);
  } catch {
    return null;
  }
}

export function writeSession(key: string, value: string) {
  try {
    window.sessionStorage.setItem(key, value);
  } catch {}
}
