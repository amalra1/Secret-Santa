import { describe, expect, it } from 'vitest';
import { findDuplicateIds, nameKey, normalizeName } from '@/lib/participants';

describe('participants', () => {
  it('normalizes spacing', () => {
    expect(normalizeName('  Ana   Clara ')).toBe('Ana Clara');
  });

  it('flags case-insensitive duplicates and ignores blanks', () => {
    const duplicates = findDuplicateIds([
      { id: '1', name: 'Ana' },
      { id: '2', name: ' ana ' },
      { id: '3', name: 'Bia' },
      { id: '4', name: '' },
      { id: '5', name: ' ' },
    ]);
    expect([...duplicates].sort()).toEqual(['1', '2']);
  });

  it('compares names ignoring case and extra spaces', () => {
    expect(nameKey('  ANA   clara ')).toBe(nameKey('Ana Clara'));
  });
});
