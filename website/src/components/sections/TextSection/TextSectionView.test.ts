import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import type { AstroComponentFactory } from 'astro/runtime/server/render/astro/index.js';
import TextSectionView from './TextSectionView.astro';
import type { TextSection } from '../../../lib/schemas/sections/textSection';
import { describe, it, expect } from 'vitest';

const minimalProps: Omit<TextSection, 'ctaButtons'> = {
  _key: 'section1',
  _type: 'textSection',
  header: 'Sample Header',
  backgroundColour: 'light',
  items: [
    {
      _key: 'item1',
      _type: 'textItem',
      body: [
        {
          _type: 'block',
          _key: 'block1',
          children: [{ _type: 'span', _key: 'span1', text: 'Hello world' }],
        },
      ],
    },
  ],
};

const TextSectionViewComponent = TextSectionView as unknown as AstroComponentFactory;

describe('TextSectionView', () => {
  it('renders header and items', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(TextSectionViewComponent, {
      props: minimalProps,
      slots: {
        cta: '<button>CTA</button>',
      },
    });
    expect(html).toContain('Sample Header');
    expect(html).toContain('Hello world');
    expect(html).toContain('CTA');
  });

  it('does not render header if not provided', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(TextSectionViewComponent, {
      props: { ...minimalProps, header: null },
      slots: {
        cta: '<button>CTA</button>',
      },
    });
    expect(html).not.toContain('Sample Header');
    expect(html).toContain('Hello world');
  });

  it('renders multiple items', async () => {
    const items = [
      ...minimalProps.items,
      {
        _key: 'item2',
        _type: 'textItem',
        body: [
          {
            _type: 'block',
            _key: 'block2',
            children: [{ _type: 'span', _key: 'span2', text: 'Second item' }],
          },
        ],
      },
    ];
    const container = await AstroContainer.create();
    const html = await container.renderToString(TextSectionViewComponent, {
      props: {
        ...minimalProps,
        items,
      },
      slots: {
        cta: '<button>CTA</button>',
      },
    });
    expect(html).toContain('Hello world');
    expect(html).toContain('Second item');
  });
});
