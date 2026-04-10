import { describe, it, expect } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import SEO from './SEO.astro';

describe('SEO.astro', () => {
  it('renders with required props', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(SEO, {
      props: { pathname: '/' },
    });
    expect(html).toContain('<title>');
    expect(html).toContain('meta');
  });
});
