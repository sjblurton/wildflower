import { describe, it, expect } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import ProductCardView from './ProductCardView.astro';
import type { AstroComponentFactory } from 'astro/runtime/server/render/astro/index.js';
import type { ProductCardViewProps } from './ProductCardView.interface';

const sanityImageMock = {
  alt: 'test alt',
  _type: 'image',
  asset: { _ref: 'image-Tb9Ew8CXIwaY6R1kjMvI0uRR-2000x3000-jpg', _type: 'reference' },
} as const;

const minimalProps = {
  title: 'Test Product',
  description: 'A product description',
  image: sanityImageMock,
} satisfies ProductCardViewProps;

const ProductCardComponent = ProductCardView as unknown as AstroComponentFactory;

describe('ProductCardView', () => {
  it('renders with minimal props', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(ProductCardComponent, { props: minimalProps });
    expect(html).toContain('Test Product');
    expect(html).toContain('A product description');
    expect(html).toContain('data-testid="sanity-image-product-card"');
  });
});
