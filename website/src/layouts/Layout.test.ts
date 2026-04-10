import { describe, it, expect } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import Layout from './Layout.astro';

describe('Layout.astro', () => {
  it('renders with slot', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Layout, {
      slots: { default: '<div>slot</div>' },
      props: { pageSlug: 'home' },
    });
    expect(html).toContain('slot');
  });
});
