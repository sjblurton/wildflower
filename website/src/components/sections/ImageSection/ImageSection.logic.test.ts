import { describe, it, expect } from 'vitest';
import { getImageSectionLogic } from './ImageSection.logic';

describe('getImageSectionLogic', () => {
  it('returns tailwind overlay with opacity 0', () => {
    const result = getImageSectionLogic({
      image: { asset: '/test.jpg', alt: 'Test image', _type: 'image' },
      overlayOpacity: 0,
    });
    expect(result.tailwindOpacity).toBe(0);
  });

  it('computes Tailwind opacity', () => {
    const result = getImageSectionLogic({
      image: { asset: '/test.jpg', alt: 'Test image', _type: 'image' },
      overlayOpacity: 5,
    });
    expect(result.tailwindOpacity).toBe(50);
  });
});
