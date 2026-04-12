import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { describe, it, expect } from 'vitest';
import type { CTAButtonViewProps } from '../types/CTAButton.interfaces';
import CTAButtonView from './CTAButtonView.astro';
import type { AstroComponentFactory } from 'astro/runtime/server/index.js';
import type { SanityImage } from '../../../../lib/schemas/shared/primitives';

const baseProps: CTAButtonViewProps = {
  _key: 'test-key',
  label: 'Test CTA',
  url: '/test',
  class: 'btn-primary',
  icon: null,
  iconPosition: null,
};

const ctaButtonViewComponent = CTAButtonView as unknown as AstroComponentFactory;

describe('CTAButtonView', () => {
  it('renders label and url', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(ctaButtonViewComponent, {
      props: { ...baseProps },
    });
    expect(html).toContain('href="/test"');
    expect(html).toContain('Test CTA');
  });

  it('renders left image icon', async () => {
    const props = {
      ...baseProps,
      icon: {
        _type: 'image',
        asset: { _ref: 'image-Tb9Ew8CXIwaY6R1kjMvI0uRR-2000x3000-jpg', _type: 'reference' },
      } as SanityImage,
      iconPosition: 'left',
    };
    const container = await AstroContainer.create();
    const html = await container.renderToString(ctaButtonViewComponent, { props });
    expect(html).toContain('data-testid="cta-image-icon"');
  });

  it('renders right internal icon', async () => {
    const props = {
      ...baseProps,
      icon: { _type: 'internal', link: '<svg></svg>' },
      iconPosition: 'right',
    };
    const container = await AstroContainer.create();
    const html = await container.renderToString(ctaButtonViewComponent, { props });
    expect(html).toContain('data-testid="cta-internal-icon"');
  });

  it('renders nothing for null icon', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(ctaButtonViewComponent, {
      props: { ...baseProps, icon: null },
    });
    expect(html).not.toContain('data-testid="cta-image-icon"');
    expect(html).not.toContain('data-testid="cta-internal-icon"');
  });
});
