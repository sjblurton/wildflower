import { describe, it, expect } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import SEO from './SEO.astro';
import type { AstroComponentFactory } from 'astro/runtime/server/index.js';

describe('SEO.astro', () => {
  const Component = SEO as AstroComponentFactory;
  it('renders with required props', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Component, {
      props: { pathname: '/' },
    });
    expect(html).toContain('<title>');
    expect(html).toContain('meta');
  });
});
