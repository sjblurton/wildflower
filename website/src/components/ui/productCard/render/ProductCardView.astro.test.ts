import { describe, it, expect } from 'vitest';
import { render, screen } from '@astrojs/test-utils';
import ProductCardView from './ProductCardView.astro';

// Mocks
vi.mock('../../../../lib/primitives/SanityImage.astro', () => ({
  default: () => '<div data-testid="sanity-image-mock"></div>',
}));
vi.mock('../../../../lib/primitives/Icon.astro', () => ({
  default: ({ name }: { name: string }) => `<div data-testid="icon-mock">${name}</div>`,
}));

const minimalProps = {
  title: 'Test Product',
  description: 'A product description',
  image: { asset: { _ref: 'image-ref' } },
  buttons: [],
};

const allProps = {
  ...minimalProps,
  icon: { type: 'internal', name: 'star' },
  iconPosition: 'left',
  buttons: [
    { label: 'Buy', href: '/buy', style: 'primary' },
    { label: 'Info', href: '/info', style: 'secondary' },
  ],
};

const iconTypes = [{ type: 'image', name: 'img' }, { type: 'internal', name: 'star' }, undefined];
const iconPositions = ['left', 'right', undefined];

const nullish = [null, undefined, ''];

// Parameterised tests for icon types and positions
for (const icon of iconTypes) {
  for (const iconPosition of iconPositions) {
    it(`renders with icon type=${icon?.type ?? 'undefined'} and position=${iconPosition ?? 'undefined'}`, async () => {
      await render(ProductCardView, {
        props: {
          ...minimalProps,
          icon,
          iconPosition,
        },
      });
      if (icon) {
        expect(screen.getByTestId('icon-mock')).toBeTruthy();
      } else {
        expect(screen.queryByTestId('icon-mock')).toBeNull();
      }
    });
  }
}

describe('ProductCardView', () => {
  it('renders with minimal props', async () => {
    await render(ProductCardView, { props: minimalProps });
    expect(screen.getByText('Test Product')).toBeTruthy();
    expect(screen.getByText('A product description')).toBeTruthy();
    expect(screen.getByTestId('sanity-image-mock')).toBeTruthy();
  });

  it('renders with all props', async () => {
    await render(ProductCardView, { props: allProps });
    expect(screen.getByTestId('icon-mock')).toBeTruthy();
    expect(screen.getByText('Buy')).toBeTruthy();
    expect(screen.getByText('Info')).toBeTruthy();
  });

  it('renders with no buttons', async () => {
    await render(ProductCardView, { props: { ...minimalProps, buttons: [] } });
    expect(screen.queryByRole('button')).toBeNull();
  });

  it('renders with one button', async () => {
    await render(ProductCardView, {
      props: { ...minimalProps, buttons: [{ label: 'Buy', href: '/buy', style: 'primary' }] },
    });
    expect(screen.getByText('Buy')).toBeTruthy();
  });

  it('renders with multiple buttons', async () => {
    await render(ProductCardView, {
      props: {
        ...minimalProps,
        buttons: [
          { label: 'Buy', href: '/buy', style: 'primary' },
          { label: 'Info', href: '/info', style: 'secondary' },
        ],
      },
    });
    expect(screen.getByText('Buy')).toBeTruthy();
    expect(screen.getByText('Info')).toBeTruthy();
  });

  it('handles null/empty/invalid props gracefully', async () => {
    for (const val of nullish) {
      await render(ProductCardView, {
        props: {
          title: val,
          description: val,
          image: val,
          buttons: val,
        },
      });
      // Should not throw and should render fallback UI
      expect(screen.queryByText('Test Product')).toBeNull();
    }
  });

  it('meets accessibility requirements', async () => {
    await render(ProductCardView, { props: allProps });
    // Headings
    expect(screen.getByRole('heading', { name: 'Test Product' })).toBeTruthy();
    // Image alt text
    expect(screen.getByTestId('sanity-image-mock')).toBeTruthy();
    // Buttons have accessible names
    expect(screen.getByRole('link', { name: 'Buy' })).toBeTruthy();
    expect(screen.getByRole('link', { name: 'Info' })).toBeTruthy();
  });
});
