import { urlFor } from '../../../../lib/cms/sanity';
import { toTrimmedString } from '../../../../lib/primitives/strings';
import {
  pageSeoDocumentSchema,
  siteSeoSchema,
  type PageSeoDocument,
  type SiteSeoSettings,
} from '../data/seo.schema';
import { logger, summarisePayload } from '../../../../lib/logging/logger';
import { LOG_EVENTS } from '../../../../lib/logging/events';
import z from 'zod';

interface LoadSeoInput {
  pageSlug?: string;
  pathname: string;
  fetchSeoSettings: () => Promise<unknown>;
  fetchPageSeoDocument: (slug: string) => Promise<unknown>;
}

export interface SeoMetadata {
  title: string;
  description?: string;
  canonicalUrl?: string;
  ogImageUrl?: string;
  ogImageAlt?: string;
  robotsContent: string;
  twitterCard: 'summary' | 'summary_large_image';
}

const buildCanonicalUrl = (siteUrl: string | null, path: string) => {
  const baseUrl = toTrimmedString(siteUrl);

  if (!baseUrl) {
    return undefined;
  }

  try {
    return new URL(path, baseUrl).toString();
  } catch {
    return undefined;
  }
};

const buildFallbackSeoSiteSettings = async (
  fetch: () => Promise<unknown>,
): Promise<SiteSeoSettings> => {
  const siteSettings = await siteSeoSchema.safeParseAsync(await fetch());

  if (!siteSettings.success) {
    logger.error({
      event: LOG_EVENTS.seo.siteSettingsParseFailed,
      area: 'seo',
      message: 'Applying fallback SEO site settings due to validation failure.',
      meta: {
        reason: 'validation_failed',
        error: z.prettifyError(siteSettings.error),
        rawDataSummary: summarisePayload(siteSettings.data),
      },
    });
    const fallbackData = {
      siteTitle: 'Wildflower',
      siteUrl: '',
      defaultMetaTitle: null,
      defaultMetaDescription: null,
      defaultOgImage: null,
      globalWebIndex: false,
    };

    logger.info({
      event: LOG_EVENTS.seo.fallbackApplied,
      area: 'seo',
      message: 'Fallback SEO site settings applied.',
      meta: {
        fallbackData,
      },
    });

    return fallbackData;
  }
  logger.info({
    event: LOG_EVENTS.seo.siteDocumentLoaded,
    area: 'seo',
    message: 'SEO site settings document loaded.',
  });
  return siteSettings.data;
};

const buildFallbackSeoPageDocument = async (
  fetch: (slug: string) => Promise<unknown>,
  slug: string,
): Promise<PageSeoDocument> => {
  const pageDocument = await pageSeoDocumentSchema.safeParseAsync(await fetch(slug));

  if (!pageDocument.success) {
    logger.error({
      event: LOG_EVENTS.seo.pageDocumentParseFailed,
      area: 'seo',
      message: `Applying fallback SEO page document for slug "${slug}" due to validation failure.`,
      meta: {
        reason: 'validation_failed',
        error: z.prettifyError(pageDocument.error),
        rawDataSummary: summarisePayload(pageDocument.data),
      },
    });

    const fallbackData = {
      title: 'Wildflower',
      slug: slug,
      seo: {
        metaTitle: null,
        metaDescription: null,
        ogImage: null,
      },
    };

    logger.info({
      event: LOG_EVENTS.seo.fallbackApplied,
      area: 'seo',
      message: `Fallback SEO page document applied for slug "${slug}".`,
      meta: {
        fallbackData,
      },
    });

    return fallbackData;
  }

  logger.info({
    event: LOG_EVENTS.seo.pageDocumentLoaded,
    area: 'seo',
    message: `SEO page document loaded for slug "${slug}".`,
  });
  return pageDocument.data;
};

export const loadSeoMetadata = async ({
  pageSlug,
  pathname,
  fetchSeoSettings,
  fetchPageSeoDocument,
}: LoadSeoInput): Promise<SeoMetadata> => {
  const siteSettings = await buildFallbackSeoSiteSettings(fetchSeoSettings);
  const pageDocument = await buildFallbackSeoPageDocument(fetchPageSeoDocument, pageSlug ?? '');

  const ogImage = pageDocument?.seo?.ogImage ?? siteSettings.defaultOgImage;
  const ogImageUrl = ogImage?.asset?._ref
    ? urlFor(ogImage).width(1200).height(630).fit('crop').auto('format').url()
    : undefined;
  const title =
    toTrimmedString(pageDocument?.seo?.metaTitle) ??
    toTrimmedString(siteSettings.defaultMetaTitle) ??
    toTrimmedString(pageDocument?.title) ??
    toTrimmedString(siteSettings.siteTitle) ??
    'Wildflower';
  const description =
    toTrimmedString(pageDocument?.seo?.metaDescription) ??
    toTrimmedString(siteSettings.defaultMetaDescription);
  const canonicalUrl = buildCanonicalUrl(siteSettings.siteUrl, pathname);
  const ogImageAlt = toTrimmedString(ogImage?.alt);
  const pageWebIndex = pageDocument?.seo?.webIndex;
  const noIndex =
    pageWebIndex !== null && pageWebIndex !== undefined
      ? !pageWebIndex
      : !siteSettings.globalWebIndex;

  return {
    title,
    description,
    canonicalUrl,
    ogImageUrl,
    ogImageAlt,
    robotsContent: noIndex ? 'noindex, nofollow' : 'index, follow',
    twitterCard: ogImageUrl ? 'summary_large_image' : 'summary',
  };
};
