import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import type { AstroComponentFactory } from 'astro/runtime/server/index.js';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { footerSettingsQuery } from '../data/footer.query';
import Footer from './Footer.astro';

vi.mock('../../../../lib/cms/sanity', () => ({
  sanityClient: {
    fetch: vi.fn(),
  },
}));

import { sanityClient } from '../../../../lib/cms/sanity';

const footerComponent = Footer as unknown as AstroComponentFactory;
const fetchMock = vi.mocked(sanityClient.fetch) as unknown as {
  (...args: unknown[]): Promise<unknown>;
  mockReset: () => void;
  mockResolvedValue: (value: unknown) => void;
  mockRejectedValue: (value: unknown) => void;
};

describe('Footer', () => {
  beforeEach(() => {
    fetchMock.mockReset();
  });

  it('renders footer content from fetched settings', async () => {
    fetchMock.mockResolvedValue({
      _id: 'footerSettings',
      _type: 'footerSettings',
      footerSiteName: 'Wildflower Co',
      footerLogo: null,
      footerCopyrightText: 'All rights reserved',
      footerNavLinks: [
        {
          _key: 'about',
          _type: 'navLink',
          label: 'About',
          slug: 'about',
        },
      ],
      footerContactLinks: [
        {
          _key: 'email-1',
          _type: 'contactLink',
          type: 'email',
          title: 'Email',
          emailAddress: 'hello@example.com',
        },
      ],
    });

    const container = await AstroContainer.create();
    const html = await container.renderToString(footerComponent);

    expect(fetchMock).toHaveBeenCalledWith(footerSettingsQuery);
    expect(html).toContain('Wildflower Co');
    expect(html).toContain('href="/about"');
    expect(html).toContain('Connect');
    expect(html).toContain('mailto:hello@example.com');
  });

  it('renders fallback links and hides Connect section when fetch fails', async () => {
    fetchMock.mockRejectedValue(new Error('Sanity unavailable'));

    const container = await AstroContainer.create();
    const html = await container.renderToString(footerComponent);

    expect(fetchMock).toHaveBeenCalledWith(footerSettingsQuery);
    expect(html).toContain('href="/"');
    expect(html).toContain('href="/contact"');
    expect(html).toContain('>Home<');
    expect(html).toContain('>Contact<');
    expect(html).not.toContain('Connect');
  });
});
