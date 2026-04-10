import { describe, it, expect } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import LayoutView from './LayoutView.astro';
import type { AstroComponentFactory } from 'astro/runtime/server/index.js';

describe('LayoutView.astro', () => {
  it('renders with slot', async () => {
    const Component = LayoutView as AstroComponentFactory;
    const container = await AstroContainer.create();
    const html = await container.renderToString(Component, {
      slots: { default: '<div>slot</div>' },
    });
    expect(html).toContain('slot');
  });
});
