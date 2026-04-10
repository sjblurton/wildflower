import { describe, it, expect } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import SanityImageAtom from './SanityImageAtom.astro';

describe('SanityImageAtom.astro', () => {
  const validAssetRef = 'image-Tb9Ew8CXIwaY6R1kjMvI0uRR-2000x3000-jpg';
  it('renders with minimal props', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(SanityImageAtom, {
      props: {
        image: { asset: { _ref: validAssetRef, _type: 'reference' }, alt: 'alt', _type: 'image' },
        alt: 'alt',
      },
    });
    expect(html).toContain('alt');
    expect(html).toContain('img');
  });
});
