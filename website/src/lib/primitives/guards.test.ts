import { describe, expect, it } from 'vitest';

import { isRecord } from './guards';

describe('isRecord', () => {
  it('returns true for plain objects', () => {
    expect(isRecord({ key: 'value' })).toBe(true);
  });

  it('returns true for arrays (object values)', () => {
    expect(isRecord([])).toBe(true);
  });

  it('returns false for null', () => {
    expect(isRecord(null)).toBe(false);
  });

  it('returns false for primitives', () => {
    expect(isRecord('x')).toBe(false);
    expect(isRecord(1)).toBe(false);
    expect(isRecord(false)).toBe(false);
    expect(isRecord(undefined)).toBe(false);
  });
});
