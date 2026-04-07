import { sanityClient, urlFor } from '../../../lib/cms/sanity';
import { toTrimmedString } from '../../../lib/primitives/strings';
import { pageSeoBySlugQuery, siteSeoQuery } from './seo.query';
import { pageSeoDocumentSchema, siteSeoSchema } from './seo.schema';

interface LoadSeoInput {
  pageSlug?: string;
  pathname: string;
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

export const loadSeoMetadata = async ({
  pageSlug,
  pathname,
}: LoadSeoInput): Promise<SeoMetadata> => {
  const siteSettings = await siteSeoSchema.parseAsync(await sanityClient.fetch(siteSeoQuery));
  const pageDocument = pageSlug
    ? await pageSeoDocumentSchema.parseAsync(
        await sanityClient.fetch(pageSeoBySlugQuery, { slug: pageSlug }),
      )
    : null;

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
  const noIndex = siteSettings.noIndexByDefault;

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
