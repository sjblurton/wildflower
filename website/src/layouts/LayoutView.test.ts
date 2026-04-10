import { describe, it, expect } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import LayoutView from './LayoutView.astro';

describe('LayoutView.astro', () => {
  it('renders with slot', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(LayoutView, {
      slots: { default: '<div>slot</div>' },
    });
    expect(html).toContain('slot');
  });
});
