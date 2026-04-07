import { describe, expect, it } from 'vitest';

import { normaliseSlug, toTrimmedString } from './strings';

describe('toTrimmedString', () => {
  it('returns trimmed value for non-empty strings', () => {
    expect(toTrimmedString('  hello  ')).toBe('hello');
  });

  it('returns undefined for empty or whitespace strings', () => {
    expect(toTrimmedString('')).toBeUndefined();
    expect(toTrimmedString('   ')).toBeUndefined();
  });

  it('returns undefined for non-string values', () => {
    expect(toTrimmedString(null)).toBeUndefined();
    expect(toTrimmedString(123)).toBeUndefined();
    expect(toTrimmedString({})).toBeUndefined();
  });
});

describe('normaliseSlug', () => {
  it('maps home to root', () => {
    expect(normaliseSlug('home')).toBe('/');
  });

  it('keeps leading slash values unchanged', () => {
    expect(normaliseSlug('/contact')).toBe('/contact');
  });

  it('prefixes slash for bare slugs', () => {
    expect(normaliseSlug('about')).toBe('/about');
  });
});
