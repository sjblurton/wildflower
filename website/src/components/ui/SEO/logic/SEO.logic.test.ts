import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { loadSeoMetadata } from './SEO.logic';
import { logger } from '../../../../lib/logging/logger';
import type { PageSeoDocument, SiteSeoSettings } from '../data/seo.schema';

const imageRef = 'image-Tb9Ew8CXIwaY6R1kjMvI0uRR-2000x3000-jpg';

describe('loadSeoMetadata', () => {
  const validSiteSettings = {
    siteTitle: 'Wildflower',
    siteUrl: 'https://example.com',
    defaultMetaTitle: 'Default Title',
    defaultMetaDescription: 'Default Desc',
    defaultOgImage: {
      _type: 'image',
      asset: { _ref: imageRef, _type: 'reference' },
      alt: 'alt',
    },
    noIndexByDefault: false,
  } satisfies SiteSeoSettings;
  const validPageDocument = {
    title: 'Page Title',
    slug: 'page',
    seo: {
      metaTitle: 'Page Meta',
      metaDescription: 'Page Desc',
      ogImage: {
        _type: 'image',
        asset: { _ref: imageRef, _type: 'reference' },
        alt: 'alt',
      },
    },
  } satisfies PageSeoDocument;

  let loggerError: ReturnType<typeof vi.fn>;
  let loggerInfo: ReturnType<typeof vi.fn>;
  let loggerWarn: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    loggerError = vi.fn();
    loggerInfo = vi.fn();
    loggerWarn = vi.fn();
    vi.spyOn(logger, 'error').mockImplementation(loggerError);
    vi.spyOn(logger, 'info').mockImplementation(loggerInfo);
    vi.spyOn(logger, 'warn').mockImplementation(loggerWarn);
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns correct metadata for valid data', async () => {
    const fetchSeoSettings = vi.fn().mockResolvedValue(validSiteSettings);
    const fetchPageSeoDocument = vi.fn().mockResolvedValue(validPageDocument);
    const result = await loadSeoMetadata({
      pageSlug: 'page',
      pathname: '/foo',
      fetchSeoSettings,
      fetchPageSeoDocument,
    });
    expect(result.title).toBe('Page Meta');
    expect(result.description).toBe('Page Desc');
    expect(result.canonicalUrl).toContain('/foo');
    expect(result.robotsContent).toBe('index, follow');
    expect(result.twitterCard).toBe('summary_large_image');
    expect(loggerInfo).toHaveBeenCalled();
  });

  it('falls back to site settings if page document is invalid', async () => {
    const fetchSeoSettings = vi.fn().mockResolvedValue(validSiteSettings);
    const fetchPageSeoDocument = vi.fn().mockResolvedValue({ bad: 'data' });
    const result = await loadSeoMetadata({
      pageSlug: 'bad',
      pathname: '/bar',
      fetchSeoSettings,
      fetchPageSeoDocument,
    });
    console.log({ result });
    expect(result.title).toBe(validSiteSettings.defaultMetaTitle);
    expect(loggerError).toHaveBeenCalled();
    expect(loggerInfo).toHaveBeenCalled();
  });

  it('falls back to default site settings if site settings are invalid', async () => {
    const fetchSeoSettings = vi.fn().mockResolvedValue({ bad: 'data' });
    const fetchPageSeoDocument = vi.fn().mockResolvedValue(validPageDocument);
    const result = await loadSeoMetadata({
      pageSlug: 'page',
      pathname: '/baz',
      fetchSeoSettings,
      fetchPageSeoDocument,
    });
    expect(result.title).toBe('Page Meta'); // fallback site settings, but page is valid
    expect(loggerError).toHaveBeenCalled();
    expect(loggerInfo).toHaveBeenCalled();
  });

  it('returns correct fallback values if both site and page are invalid', async () => {
    const fetchSeoSettings = vi.fn().mockResolvedValue({ bad: 'data' });
    const fetchPageSeoDocument = vi.fn().mockResolvedValue({ bad: 'data' });
    const result = await loadSeoMetadata({
      pageSlug: 'bad',
      pathname: '/fail',
      fetchSeoSettings,
      fetchPageSeoDocument,
    });
    expect(result.title).toBe('Wildflower');
    expect(result.robotsContent).toBe('index, follow');
    expect(loggerError).toHaveBeenCalled();
    expect(loggerInfo).toHaveBeenCalled();
  });

  it('handles missing pageSlug gracefully', async () => {
    const fetchSeoSettings = vi.fn().mockResolvedValue(validSiteSettings);
    const fetchPageSeoDocument = vi.fn().mockResolvedValue(validPageDocument);
    const result = await loadSeoMetadata({
      pathname: '/no-slug',
      fetchSeoSettings,
      fetchPageSeoDocument,
    });
    expect(result.title).toBe('Page Meta');
  });

  it('handles missing ogImage and meta fields gracefully', async () => {
    const fetchSeoSettings = vi
      .fn()
      .mockResolvedValue({ ...validSiteSettings, defaultOgImage: null });
    const fetchPageSeoDocument = vi.fn().mockResolvedValue({
      ...validPageDocument,
      seo: { ...validPageDocument.seo, ogImage: null, metaTitle: null, metaDescription: null },
    });
    const result = await loadSeoMetadata({
      pageSlug: 'page',
      pathname: '/og',
      fetchSeoSettings,
      fetchPageSeoDocument,
    });
    expect(result.ogImageUrl).toBeUndefined();
    expect(result.title).toBe('Default Title');
    expect(result.description).toBe('Default Desc');
  });

  it('returns undefined canonicalUrl if buildCanonicalUrl throws', async () => {
    const fetchSeoSettings = vi.fn().mockResolvedValue({
      ...validSiteSettings,
      siteUrl: 'not a valid url',
    });
    const fetchPageSeoDocument = vi.fn().mockResolvedValue(validPageDocument);
    const result = await loadSeoMetadata({
      pageSlug: 'page',
      pathname: '::bad',
      fetchSeoSettings,
      fetchPageSeoDocument,
    });
    expect(result.canonicalUrl).toBeUndefined();
  });

  it('returns "Wildflower" as title if all title fields are missing', async () => {
    const fetchSeoSettings = vi.fn().mockResolvedValue({
      siteTitle: null,
      siteUrl: 'https://example.com',
      defaultMetaTitle: null,
      defaultMetaDescription: null,
      defaultOgImage: null,
      noIndexByDefault: false,
    });
    const fetchPageSeoDocument = vi.fn().mockResolvedValue({
      title: null,
      slug: 'page',
      seo: {
        metaTitle: null,
        metaDescription: null,
        ogImage: null,
      },
    });
    const result = await loadSeoMetadata({
      pageSlug: 'page',
      pathname: '/foo',
      fetchSeoSettings,
      fetchPageSeoDocument,
    });
    expect(result.title).toBe('Wildflower');
  });
});
