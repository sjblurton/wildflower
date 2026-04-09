import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import type { AstroComponentFactory } from 'astro/runtime/server/index.js';
import { describe, expect, it } from 'vitest';

import ImageSectionShow from './ImageSectionShow.astro';

const imageSectionShowComponent = ImageSectionShow as unknown as AstroComponentFactory;

describe('ImageSectionShow.astro', () => {
  it('smoke renders with minimal props', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(imageSectionShowComponent, {
      props: {
        image: { asset: '/test.jpg', alt: 'Test image', _type: 'image' },
        overlayOpacity: 0,
      },
    });
    expect(html).toContain('src="/test.jpg"');
    expect(html).toContain('alt="Test image"');
  });

  it('does NOT renders overlay if no title', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(imageSectionShowComponent, {
      props: {
        image: { asset: '/test.jpg', alt: 'Test image', _type: 'image' },
        overlayOpacity: 8,
      },
    });
    expect(html).not.toMatch(/class="[^"]*bg-base-200\/80[^"]*"/);
  });

  it('renders overlayTitle if provided', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(imageSectionShowComponent, {
      props: {
        image: { asset: '/test.jpg', alt: 'Test image', _type: 'image' },
        overlayOpacity: 5,
        overlayTitle: 'Overlay Title',
      },
    });
    expect(html).toMatch(/class="[^"]*bg-base-200\/50[^"]*"/);
    expect(html).toContain('Overlay Title');
  });

  it('renders fallback when image is missing', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(imageSectionShowComponent, {
      props: {
        image: undefined,
        overlayOpacity: 0,
      },
    });
    expect(html).toContain('Image unavailable');
  });

  it('renders fallback when asset is missing', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(imageSectionShowComponent, {
      props: {
        image: { alt: 'Test image', _type: 'image' },
        overlayOpacity: 0,
      },
    });
    expect(html).toContain('Image unavailable');
  });

  it('does not render overlay when opacity is 0', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(imageSectionShowComponent, {
      props: {
        image: { asset: '/test.jpg', alt: 'Test image', _type: 'image' },
        overlayOpacity: 0,
      },
    });
    expect(html).not.toMatch(/class="[^"]*image-section__overlay[^"]*bg-base-200\/0[^"]*"/);
  });

  it('does not render overlayTitle when not provided', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(imageSectionShowComponent, {
      props: {
        image: { asset: '/test.jpg', alt: 'Test image', _type: 'image' },
        overlayOpacity: 8,
      },
    });
    expect(html).not.toContain('text-4xl font-bold');
  });
});
