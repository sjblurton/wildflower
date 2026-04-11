import { describe, it, expect } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import ProductCardView from './ProductCardView.astro';
import type {
  CtaProps,
  MappedProductCardIcon,
  ProductCardButton,
} from '../logic/ProductCard.logic';
import type { AstroComponentFactory } from 'astro/runtime/server/render/astro/index.js';
import type { SanityImage } from '../../../../lib/schemas/shared/primitives';

type ProductCardViewProps = {
  description: string;
  title: string;
  image?: SanityImage | null;
  cta: CtaProps[] | null;
};

const sanityImageMock = {
  alt: 'test alt',
  _type: 'image',
  asset: { _ref: 'image-Tb9Ew8CXIwaY6R1kjMvI0uRR-2000x3000-jpg', _type: 'reference' },
} as const;

const minimalProps = {
  title: 'Test Product',
  description: 'A product description',
  image: sanityImageMock,
  cta: [
    {
      _key: 'btn1',
      label: 'Buy',
      buttons: [
        {
          label: 'Buy',
          iconPosition: 'left',
          class: 'primary',
          url: '/buy',
          icon: { _type: 'internal', link: '/buy' },
          _key: 'btn1',
        },
      ],
    },
  ],
} satisfies ProductCardViewProps;

const allProps = {
  ...minimalProps,
} satisfies ProductCardViewProps;

const iconTypes = [
  sanityImageMock,
  { _type: 'internal', link: 'star' },
] satisfies MappedProductCardIcon[];

const iconPositions = ['left', 'right', undefined];

const nullish = [null, undefined, ''];

const ProductCardComponent = ProductCardView as unknown as AstroComponentFactory;

for (const icon of iconTypes) {
  for (const iconPosition of iconPositions) {
    it(`renders with icon type=${icon?._type ?? 'undefined'} and position=${iconPosition ?? 'undefined'}`, async () => {
      const container = await AstroContainer.create();
      const html = await container.renderToString(ProductCardComponent, {
        props: {
          ...minimalProps,
          icon,
          iconPosition,
        },
      });
      if (icon) {
        expect(html).toContain('data-testid="product-card-internal-icon"');
      } else {
        expect(html).not.toContain('data-testid="product-card-internal-icon"');
      }
    });
  }
}

describe('ProductCardView', () => {
  it('renders with minimal props', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(ProductCardComponent, { props: minimalProps });
    expect(html).toContain('Test Product');
    expect(html).toContain('A product description');
    expect(html).toContain('data-testid="sanity-image-product-card"');
  });

  it('renders with all props', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(ProductCardComponent, { props: allProps });
    expect(html).toContain('data-testid="product-card-internal-icon"');
    expect(html).toContain('Buy');
  });

  it('renders with no buttons', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(ProductCardComponent, {
      props: { ...minimalProps, buttons: [] },
    });
    // No <button> or <a> with role="button" or role="link"
    expect(html).not.toMatch(/role=("|')button("|')/);
    expect(html).not.toMatch(/role=("|')link("|').*Buy|Info/);
  });

  it('renders with one button', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(ProductCardComponent, {
      props: { ...minimalProps, buttons: [{ label: 'Buy', href: '/buy', style: 'primary' }] },
    });
    expect(html).toContain('Buy');
  });

  it('renders with multiple buttons', async () => {
    const container = await AstroContainer.create();
    const buttons: ProductCardButton[] = [
      { label: 'Buy', url: '/buy', class: 'primary', icon: null, iconPosition: null, _key: 'btn1' },
      {
        label: 'Info',
        url: '/info',
        class: 'secondary',
        icon: null,
        iconPosition: null,
        _key: 'btn2',
      },
    ];
    const props = {
      ...minimalProps,
      cta: [{ _key: 'cta1', label: 'Learn more', buttons }],
    } satisfies ProductCardViewProps;
    const html = await container.renderToString(ProductCardComponent, {
      props,
    });
    expect(html).toContain('Buy');
    expect(html).toContain('Info');
  });

  it('handles null/empty/invalid props gracefully', async () => {
    for (const val of nullish) {
      const container = await AstroContainer.create();
      const html = await container.renderToString(ProductCardComponent, {
        props: {
          title: val,
          description: val,
          image: val,
          buttons: val,
        },
      });

      expect(html).not.toContain('Test Product');
    }
  });

  it('meets accessibility requirements', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(ProductCardComponent, { props: allProps });
    expect(html).toMatch(/<h[1-6][^>]*>\s*Test Product\s*<\/h[1-6]>/);
    expect(html).toContain('data-testid="sanity-image-product-card"');
    expect(html).toContain('Buy');
  });
});
