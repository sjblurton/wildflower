import { describe, it, expect, vi } from 'vitest';
import { sectionSchema, contentSchema } from './section';

describe('sectionSchema', () => {
  it('validates a correct imageSection', () => {
    const valid = {
      _type: 'imageSection',
      _key: 'abc',
      image: {
        _type: 'image' as const,
        alt: 'alt',
        asset: {
          _ref: 'image-Tb9Ew8CXIwaY6R1kjMvI0uRR-2000x3000-jpg',
          _type: 'reference' as const,
        },
      },
      overlayTitle: 'Overlay',
      overlayOpacity: 5,
    };
    expect(sectionSchema.safeParse(valid).success).toBe(true);
  });

  it('fails validation for missing _key', () => {
    const invalid = {
      _type: 'imageSection',
      image: {
        _type: 'image',
        alt: 'alt',
        asset: { _ref: 'image-Tb9Ew8CXIwaY6R1kjMvI0uRR-2000x3000-jpg', _type: 'reference' },
      },
      overlayTitle: 'Overlay',
      overlayOpacity: 5,
    };
    expect(sectionSchema.safeParse(invalid).success).toBe(false);
  });
});

describe('contentSchema', () => {
  it('transforms valid array to valid sections', () => {
    const valid = [
      {
        _type: 'imageSection',
        _key: 'abc',
        image: {
          _type: 'image' as const,
          alt: 'alt',
          asset: {
            _ref: 'image-Tb9Ew8CXIwaY6R1kjMvI0uRR-2000x3000-jpg',
            _type: 'reference' as const,
          },
        },
        overlayTitle: 'Overlay',
        overlayOpacity: 5,
      },
    ];
    const result = contentSchema.parse(valid) as import('./section').Section[];
    expect(result.length).toBe(1);
    expect(result[0]._key).toBe('abc');
  });

  it('filters out invalid sections and logs error', () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const valid = {
      _type: 'imageSection',
      _key: 'abc',
      image: {
        _type: 'image' as const,
        alt: 'alt',
        asset: {
          _ref: 'image-Tb9Ew8CXIwaY6R1kjMvI0uRR-2000x3000-jpg',
          _type: 'reference' as const,
        },
      },
      overlayTitle: 'Overlay',
      overlayOpacity: 5,
    };
    const invalid = { _type: 'imageSection', _key: '', image: {}, overlayOpacity: 99 };
    const result = contentSchema.parse([valid, invalid]) as import('./section').Section[];
    expect(result.length).toBe(1);
    expect(result[0]._key).toBe('abc');
    errorSpy.mockRestore();
  });
});
