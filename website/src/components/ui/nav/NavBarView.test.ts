import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import type { AstroComponentFactory } from 'astro/runtime/server/index.js';
import { describe, expect, it } from 'vitest';

import NavBarView from './NavBarView.astro';

const navBarViewComponent = NavBarView as unknown as AstroComponentFactory;

describe('NavBarView', () => {
  it('renders site name when provided', async () => {
    const container = await AstroContainer.create();

    const html = await container.renderToString(navBarViewComponent, {
      props: {
        nav: {
          _id: 'navSettings',
          _type: 'navSettings',
          navSiteName: 'Wildflower Co',
          navLogo: null,
          navBackground: 'primary',
          navLinks: [{ _key: 'home', _type: 'navLink', label: 'Home', slug: '/' }],
        },
      },
    });

    expect(html).toContain('Wildflower Co');
    expect(html).not.toContain('>Wildflower<');
    expect(html).toContain('href="/"');
  });

  it('renders literal Wildflower fallback when both logo and siteName are missing', async () => {
    const container = await AstroContainer.create();

    const html = await container.renderToString(navBarViewComponent, {
      props: {
        nav: {
          _id: 'navSettings',
          _type: 'navSettings',
          navSiteName: null,
          navLogo: null,
          navBackground: 'secondary',
          navLinks: [{ _key: 'contact', _type: 'navLink', label: 'Contact', slug: '/contact' }],
        },
      },
    });

    expect(html).toContain('>Wildflower<');
    expect(html).toContain('href="/contact"');
  });

  it('filters invalid links before render', async () => {
    const container = await AstroContainer.create();

    const html = await container.renderToString(navBarViewComponent, {
      props: {
        nav: {
          _id: 'navSettings',
          _type: 'navSettings',
          navSiteName: 'Wildflower',
          navLogo: null,
          navBackground: 'neutral',
          navLinks: [
            { _key: 'good', _type: 'navLink', label: 'About', slug: '/about' },
            { _key: 'bad-1', _type: 'navLink', label: '', slug: '/ignored' },
            { _key: 'bad-2', _type: 'navLink', label: 'Broken', slug: '' },
          ],
        },
      },
    });

    expect(html).toContain('href="/about"');
    expect(html).toContain('>About<');
    expect(html).not.toContain('/ignored');
    expect(html).not.toContain('>Broken<');
  });
});
