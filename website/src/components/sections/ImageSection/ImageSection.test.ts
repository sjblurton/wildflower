import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import type { AstroComponentFactory } from 'astro/runtime/server/index.js';
import { describe, expect, it } from 'vitest';

import ImageSection from './ImageSection.astro';

const imageSectionComponent = ImageSection as unknown as AstroComponentFactory;

describe('ImageSection.astro', () => {
  it('renders image with alt text', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(imageSectionComponent, {
      props: {
        image: { asset: '/test.jpg', alt: 'Test image' },
        overlayStyle: 'none',
        overlayOpacity: 0,
      },
    });
    expect(html).toContain('src="/test.jpg"');
    expect(html).toContain('alt="Test image"');
  });

  it('renders overlay when style is darken', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(imageSectionComponent, {
      props: {
        image: { asset: '/test.jpg', alt: 'Test image' },
        overlayStyle: 'darken',
        overlayOpacity: 40,
      },
    });
    expect(html).toContain('class="image-section__overlay"');
    expect(html).toContain('background: rgba(0,0,0,0.40)');
  });

  it('renders overlay when style is lighten', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(imageSectionComponent, {
      props: {
        image: { asset: '/test.jpg', alt: 'Test image' },
        overlayStyle: 'lighten',
        overlayOpacity: 80,
      },
    });
    expect(html).toContain('background: rgba(255,255,255,0.80)');
  });

  it('renders overlayTitle if provided', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(imageSectionComponent, {
      props: {
        image: { asset: '/test.jpg', alt: 'Test image' },
        overlayStyle: 'darken',
        overlayOpacity: 50,
        overlayTitle: 'Overlay Title',
      },
    });
    expect(html).toContain('Overlay Title');
  });
});
