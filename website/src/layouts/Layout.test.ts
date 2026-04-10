import { describe, it, expect } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import Layout from './Layout.astro';
import type { AstroComponentFactory } from 'astro/runtime/server/render/astro/index.js';

describe('Layout.astro', () => {
  it('renders with slot', async () => {
    const Component = Layout as AstroComponentFactory;
    const container = await AstroContainer.create();
    const html = await container.renderToString(Component, {
      slots: { default: '<div>slot</div>' },
      props: { pageSlug: 'home' },
    });
    expect(html).toContain('slot');
  });
});
