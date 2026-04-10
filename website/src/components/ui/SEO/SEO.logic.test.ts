import { describe, it, expect } from 'vitest';
import { loadSeoMetadata } from './SEO.logic';

describe('loadSeoMetadata', () => {
  it('is defined', () => {
    expect(typeof loadSeoMetadata).toBe('function');
  });
});
