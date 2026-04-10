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

  it('buildSanityImageRenderData returns image alt if there no alt', () => {
    const result = buildSanityImageRenderData({ image, alt: undefined });
    expect(result.altText).toBe('alt');
  });

  it('buildSanityImageRenderData overrides image alt if alt is provided', () => {
    const result = buildSanityImageRenderData({ image, alt: 'new alt' });
    expect(result.altText).toBe('new alt');
  });

  it('buildSanityImageRenderData has no image alt or alt the alt will be an empty string', () => {
    const result = buildSanityImageRenderData({
      // @ts-expect-error - testing missing alt on image
      image: { ...image, alt: undefined },
      alt: undefined,
    });
    expect(result.altText).toBe('');
  });

  it('buildSanityImageRenderData returns correct srcSet and sizes', () => {
    const result = buildSanityImageRenderData({ image, width: 400, height: 200 });
    expect(result.srcSet).toMatch(/400w/);
    expect(result.sizes).toBeDefined();
  });

  it('buildSanityImageRenderData returns srcSet undefined if width is 0', () => {
    const result = buildSanityImageRenderData({ image, width: 0, height: 200 });
    expect(result.srcSet).toBeUndefined();
  });

  it('buildSanityImageRenderData should add the quality to the URL', () => {
    const result = buildSanityImageRenderData({ image, width: 400, height: 200, quality: 80 });
    expect(result.src).toContain('q=80');
  });

  it('buildSanityImageRenderData have no image should return empty altText and null src', () => {
    const result = buildSanityImageRenderData({ image: undefined });
    expect(result.altText).toBe('');
    expect(result.src).toBeNull();
  });
});
