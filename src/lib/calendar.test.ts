import { describe, expect, it } from 'vitest';
import {
  addMonths,
  daysBetween,
  daysUntil,
  monthGrid,
  parseISODate,
  toISODate,
} from '@/lib/calendar';

describe('calendar', () => {
  it('round-trips ISO dates in local time', () => {
    expect(toISODate(parseISODate('2026-12-24') as Date)).toBe('2026-12-24');
  });

  it('rejects malformed or impossible dates', () => {
    expect(parseISODate('2026-02-30')).toBeNull();
    expect(parseISODate('24/12/2026')).toBeNull();
    expect(parseISODate('')).toBeNull();
  });

  it('builds whole weeks starting on Sunday', () => {
    const grid = monthGrid(new Date(2026, 11, 1));
    expect(grid.length % 7).toBe(0);
    expect(grid[0].getDay()).toBe(0);
    expect(toISODate(grid[0])).toBe('2026-11-29');
    expect(grid.some((day) => toISODate(day) === '2026-12-31')).toBe(true);
  });

  it('counts calendar days across months and DST changes', () => {
    expect(daysBetween(new Date(2026, 9, 1), new Date(2026, 11, 24))).toBe(84);
    expect(daysBetween(new Date(2026, 11, 24), new Date(2026, 11, 24))).toBe(0);
  });

  it('moves months from the first day', () => {
    expect(toISODate(addMonths(new Date(2026, 0, 31), 1))).toBe('2026-02-01');
  });

  it('counts days until a stored date', () => {
    const today = new Date(2026, 11, 20, 18, 30);
    expect(daysUntil('2026-12-24', today)).toBe(4);
    expect(daysUntil('2026-12-20', today)).toBe(0);
    expect(daysUntil('', today)).toBeNull();
  });
});
