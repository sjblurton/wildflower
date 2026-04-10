import { describe, it, expect, vi, afterEach } from 'vitest';
import * as SectionSelector from './SectionSelector';

describe('SectionSelector', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should export getSectionComponent', () => {
    expect(typeof SectionSelector.getSectionComponent).toBe('function');
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

  it('getSectionComponent returns empty string for missing overlayTitle', () => {
    const section = {
      _type: 'imageSection',
      _key: 'abc',
      image: {
        _type: 'image',
        alt: 'alt',
        asset: { _ref: 'image-Tb9Ew8CXIwaY6R1kjMvI0uRR-2000x3000-jpg', _type: 'reference' },
      },
      overlayOpacity: 5,
    } as const;
    const result = SectionSelector.getSectionComponent(section);
    expect(result).toBeTruthy();
    expect(result!.props.overlayTitle).toBe('');
  });

  it('getSectionComponent returns null for unknown section type', () => {
    const section = { _type: 'unknown', _key: 'abc' } as const;
    // @ts-expect-error Testing unknown section type
    const result = SectionSelector.getSectionComponent(section);
    expect(result).toBeNull();
  });
});
