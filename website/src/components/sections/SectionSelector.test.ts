import { describe, it, expect, vi } from 'vitest';
import * as SectionSelector from './SectionSelector';

describe('SectionSelector', () => {
  it('should export getSectionComponent', () => {
    expect(typeof SectionSelector.getSectionComponent).toBe('function');
  });
  it('should export parseSections', () => {
    expect(typeof SectionSelector.parseSections).toBe('function');
  });

  it('getSectionComponent returns correct component and props for imageSection', () => {
    const section = {
      _type: 'imageSection',
      _key: 'abc',
      image: {
        _type: 'image',
        alt: 'alt',
        asset: { _ref: 'image-Tb9Ew8CXIwaY6R1kjMvI0uRR-2000x3000-jpg', _type: 'reference' },
      },
      overlayTitle: 'Overlay',
      overlayOpacity: 5,
    } as const;
    const result = SectionSelector.getSectionComponent(section);
    expect(result).toBeTruthy();
    expect(result!.props.overlayTitle).toBe('Overlay');
    expect(result!.props.overlayOpacity).toBe(5);
    expect(result!.props.image.alt).toBe('alt');
  });

  it('getSectionComponent returns null for unknown section type', () => {
    const section = { _type: 'unknown', _key: 'abc' } as const;
    // @ts-expect-error Testing unknown section type
    const result = SectionSelector.getSectionComponent(section);
    expect(result).toBeNull();
  });

  it('parseSections returns valid sections and logs errors for invalid', () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const validSection = {
      _type: 'imageSection',
      _key: 'abc',
      image: {
        _type: 'image',
        alt: 'alt',
        asset: { _ref: 'image-Tb9Ew8CXIwaY6R1kjMvI0uRR-2000x3000-jpg', _type: 'reference' },
      },
      overlayTitle: 'Overlay',
      overlayOpacity: 5,
    };
    const invalidSection = { _type: 'imageSection', _key: '', image: {}, overlayOpacity: 99 };
    const result = SectionSelector.parseSections([validSection, invalidSection]);
    expect(result.length).toBe(1);
    expect(result[0]._key).toBe('abc');
    errorSpy.mockRestore();
  });

  it('parseSections handles empty input', () => {
    const result = SectionSelector.parseSections([]);
    expect(result).toEqual([]);
  });

  it('parseSections handles all invalid input', () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const invalidSection = { _type: 'imageSection', _key: '', image: {}, overlayOpacity: 99 };
    const result = SectionSelector.parseSections([invalidSection]);
    expect(result).toEqual([]);
    errorSpy.mockRestore();
  });
});
