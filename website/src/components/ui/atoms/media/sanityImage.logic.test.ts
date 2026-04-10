import { describe, it, expect } from 'vitest';
import { buildUrl, buildSanityImageRenderData } from './sanityImage.logic';

describe('sanityImage.logic', () => {
  const validAssetRef = 'image-Tb9Ew8CXIwaY6R1kjMvI0uRR-2000x3000-jpg';
  const image = {
    _type: 'image' as const,
    alt: 'alt',
    asset: { _ref: validAssetRef, _type: 'reference' as const },
  };

  it('buildUrl returns a string', () => {
    expect(typeof buildUrl(image, 100, 100)).toBe('string');
  });

  it('buildSanityImageRenderData returns correct alt', () => {
    const result = buildSanityImageRenderData({ image });
    expect(result.altText).toBe('alt');
  });

  it('buildSanityImageRenderData returns null src for missing image', () => {
    const result = buildSanityImageRenderData({ image: undefined });
    expect(result.src).toBeNull();
  });

  it('buildSanityImageRenderData returns empty alt for decorative', () => {
    const result = buildSanityImageRenderData({ image, decorative: true });
    expect(result.altText).toBe('');
  });

  it('buildSanityImageRenderData returns correct srcSet and sizes', () => {
    const result = buildSanityImageRenderData({ image, width: 400, height: 200 });
    expect(result.srcSet).toMatch(/400w/);
    expect(result.sizes).toBeDefined();
  });
});
