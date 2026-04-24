import { describe, expect, it } from 'vitest';

import { buildFallbackFooter, normaliseInvalidFooter } from './footer.load.utils';

describe('footer.load.utils', () => {
  it('buildFallbackFooter keeps provided valid seed values', () => {
    const footer = buildFallbackFooter({
      _id: 'footerSettings-seeded',
      footerSiteName: ' Wildflower ',
      footerLogo: {
        _type: 'image',
        alt: 'Wildflower logo',
        asset: {
          _type: 'reference',
          _ref: 'image-Tb9Ew8CXIwaY6R1kjMvI0uRR-2000x3000-jpg',
        },
      },
      footerNavLinks: [{ _key: 'about', _type: 'footerNavLink', label: 'About', slug: '/about' }],
      footerContactLinks: [
        {
          _key: 'email-1',
          _type: 'contactLink',
          type: 'email',
          title: 'Email',
          email: 'hello@example.com',
        },
      ],
      footerCopyrightText: '  Copyright  ',
      title: '  Footer  ',
    });

    expect(footer._id).toBe('footerSettings-seeded');
    expect(footer.footerSiteName).toBe('Wildflower');
    expect(footer.footerLogo).toEqual({
      _type: 'image',
      alt: 'Wildflower logo',
      asset: {
        _type: 'reference',
        _ref: 'image-Tb9Ew8CXIwaY6R1kjMvI0uRR-2000x3000-jpg',
      },
    });
    expect(footer.footerNavLinks).toEqual([
      { _key: 'about', _type: 'footerNavLink', label: 'About', slug: '/about' },
    ]);
    expect(footer.footerContactLinks).toHaveLength(1);
    expect(footer.footerCopyrightText).toBe('Copyright');
    expect(footer.title).toBe('Footer');
  });

  it('buildFallbackFooter applies defaults when seed is missing or invalid', () => {
    const footer = buildFallbackFooter({
      footerSiteName: '   ',
      footerLogo: null,
      footerNavLinks: [],
      footerContactLinks: undefined,
    });

    expect(footer._id).toBe('footerSettings-fallback');
    expect(footer.footerSiteName).toBeNull();
    expect(footer.footerLogo).toBeNull();
    expect(
      footer.footerNavLinks.map((link) =>
        link._type !== 'urlLinkReference' ? link.slug : undefined,
      ),
    ).toEqual(['/', '/contact']);
    expect(footer.footerContactLinks).toEqual([]);
  });

  it('normaliseInvalidFooter returns full fallback for non-record input', () => {
    const footer = normaliseInvalidFooter(42);

    expect(footer._id).toBe('footerSettings-fallback');
    expect(
      footer.footerNavLinks.map((link) =>
        link._type !== 'urlLinkReference' ? link.slug : undefined,
      ),
    ).toEqual(['/', '/contact']);
    expect(footer.footerContactLinks).toEqual([]);
  });

  it('normaliseInvalidFooter salvages valid links and contact links from malformed input', () => {
    const footer = normaliseInvalidFooter({
      _id: 'footerSettings-raw',
      footerSiteName: '  Wildflower  ',
      footerLogo: {
        _type: 'image',
        alt: 'Logo',
      },
      footerNavLinks: [
        null,
        { _key: '', _type: 'footerNavLink', label: 'About', slug: 'about' },
        { _type: 'navLink', label: 'Contact', slug: '/contact' },
        { _key: 'bad', _type: 'navLink', label: '', slug: 'ignored' },
      ],
      footerContactLinks: [
        {
          _key: 'good-email',
          _type: 'contactLink',
          type: 'email',
          title: 'Email',
          email: 'team@example.com',
        },
        {
          _key: 'bad-email',
          _type: 'contactLink',
          type: 'email',
          title: 'Email',
        },
      ],
      footerCopyrightText: '  © Wildflower  ',
      title: '  Main footer  ',
    });

    expect(footer._id).toBe('footerSettings-raw');
    expect(footer.footerSiteName).toBe('Wildflower');
    expect(footer.footerNavLinks).toEqual([
      { _key: 'fallback-footer-link-1', _type: 'footerNavLink', label: 'About', slug: '/about' },
      { _key: 'fallback-footer-link-2', _type: 'navLink', label: 'Contact', slug: '/contact' },
    ]);
    expect(footer.footerContactLinks).toEqual([
      {
        _key: 'good-email',
        _type: 'contactLink',
        type: 'email',
        title: 'Email',
        email: 'team@example.com',
      },
    ]);
    expect(footer.footerCopyrightText).toBe('© Wildflower');
    expect(footer.title).toBe('Main footer');
  });

  it('normaliseInvalidFooter handles non-array nav and contact inputs', () => {
    const footer = normaliseInvalidFooter({
      _id: 'footer-non-array',
      footerSiteName: 'Wildflower',
      footerNavLinks: 'not-an-array',
      footerContactLinks: { invalid: true },
    });

    expect(footer._id).toBe('footer-non-array');
    expect(
      footer.footerNavLinks.map((link) =>
        link._type !== 'urlLinkReference' ? link.slug : undefined,
      ),
    ).toEqual(['/', '/contact']);
    expect(footer.footerContactLinks).toEqual([]);
  });
});
