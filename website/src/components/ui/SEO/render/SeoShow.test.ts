import { describe, it, expect } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import SeoShow from './SeoShow.astro';
import type { AstroComponentFactory } from 'astro/runtime/server/render/astro/index.js';

describe('SeoShow.astro', () => {
  it('renders all meta tags with full props', async () => {
    const Component = SeoShow as AstroComponentFactory;
    const container = await AstroContainer.create();
    const html = await container.renderToString(Component, {
      props: {
        title: 'Test Title',
        description: 'Test Desc',
        canonicalUrl: 'https://example.com/',
        ogImageUrl: 'https://cdn.sanity.io/og.jpg',
        ogImageAlt: 'OG',
        robotsContent: 'index, follow',
        twitterCard: 'summary_large_image',
      },
    });
    expect(html).toContain('<title>Test Title</title>');
    expect(html).toContain('name="description" content="Test Desc"');
    expect(html).toContain('property="og:image" content="https://cdn.sanity.io/og.jpg"');
    expect(html).toContain('property="og:image:alt" content="OG"');
    expect(html).toContain('name="robots" content="index, follow"');
    expect(html).toContain('name="twitter:card" content="summary_large_image"');
  });
});
