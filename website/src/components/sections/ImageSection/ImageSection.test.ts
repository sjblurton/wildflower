import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import type { AstroComponentFactory } from 'astro/runtime/server/index.js';
import { describe, expect, it } from 'vitest';

import ImageSection from './ImageSection.astro';

const containerComponent = ImageSection as unknown as AstroComponentFactory;

describe('ImageSection.astro (container)', () => {
  it('smoke renders with minimal props', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(containerComponent, {
      props: {
        image: { asset: '/test.jpg', alt: 'Test image', _type: 'image' },
        overlayStyle: 'none',
        overlayOpacity: 0,
      },
    });
    expect(html).toContain('src="/test.jpg"');
    expect(html).toContain('alt="Test image"');
  });
});
