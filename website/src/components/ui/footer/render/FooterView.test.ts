import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import type { AstroComponentFactory } from 'astro/runtime/server/index.js';
import { describe, expect, it } from 'vitest';

import type { FooterSettings } from '../data/footer.schema';
import FooterView from './FooterView.astro';

const footerViewComponent = FooterView as unknown as AstroComponentFactory;

const createFooter = (overrides: Partial<FooterSettings> = {}): FooterSettings => ({
  _id: 'footerSettings',
  _type: 'footerSettings',
  footerSiteName: 'Wildflower',
  footerLogo: null,
  footerCopyrightText: 'All rights reserved',
  footerNavLinks: [{ _key: 'home', _type: 'navLink', label: 'Home', slug: '/' }],
  backgroundColour: 'light',
  footerContactLinks: [
    {
      _key: 'email-1',
      _type: 'contactLink',
      type: 'email',
      title: 'Email',
      email: 'hello@example.com',
    },
  ],
  ...overrides,
});

describe('FooterView', () => {
  it('renders LogoLink fallback when no logo asset ref exists', async () => {
    const container = await AstroContainer.create();

    const html = await container.renderToString(footerViewComponent, {
      props: {
        footer: createFooter({ footerLogo: null }),
      },
    });

    expect(html).toContain('global-icon');
    expect(html).toContain('href="/"');
    expect(html).not.toContain('<img');
  });

  it('renders Sanity image branch when logo asset ref exists', async () => {
    const container = await AstroContainer.create();

    const html = await container.renderToString(footerViewComponent, {
      props: {
        footer: createFooter({
          footerLogo: {
            _type: 'image',
            alt: 'Wildflower logo',
            asset: {
              _type: 'reference',
              _ref: 'image-Tb9Ew8CXIwaY6R1kjMvI0uRR-2000x3000-jpg',
            },
          },
        }),
      },
    });

    expect(html).toContain('<img');
    expect(html).toContain('alt="Wildflower logo"');
    expect(html).not.toContain('global-icon');
  });

  it('hides Pages section when footerNavLinks is empty', async () => {
    const container = await AstroContainer.create();

    const html = await container.renderToString(footerViewComponent, {
      props: {
        footer: createFooter({ footerNavLinks: [] }),
      },
    });

    expect(html).not.toContain('Pages');
    expect(html).not.toContain('>Home<');
  });

  it('hides Connect section when footerContactLinks is empty', async () => {
    const container = await AstroContainer.create();

    const html = await container.renderToString(footerViewComponent, {
      props: {
        footer: createFooter({ footerContactLinks: [] }),
      },
    });

    expect(html).not.toContain('Connect');
    expect(html).not.toContain('mailto:');
  });

  it('shows Connect section with href, label, and icon when contact links exist', async () => {
    const container = await AstroContainer.create();

    const html = await container.renderToString(footerViewComponent, {
      props: {
        footer: createFooter(),
      },
    });

    expect(html).toContain('Connect');
    expect(html).toContain('href="mailto:hello@example.com"');
    expect(html).toContain('aria-label="Email"');
    expect(html).toContain('footer-icon');
  });
});
