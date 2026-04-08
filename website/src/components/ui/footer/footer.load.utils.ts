import { isRecord } from '../../../lib/primitives/guards';
import { normaliseSlug, toTrimmedString } from '../../../lib/primitives/strings';
import { contactTypeSchema } from '../../../lib/schemas/links/contactLinks';
import { sanityImageSchema } from '../../../lib/schemas/shared/primitives';
import type { FooterSettings } from './footer.schema';

export const FALLBACK_FOOTER_LINKS: FooterSettings['footerNavLinks'] = [
  {
    _key: 'fallback-home',
    _type: 'navLink',
    label: 'Home',
    slug: '/',
  },
  {
    _key: 'fallback-contact',
    _type: 'navLink',
    label: 'Contact',
    slug: '/contact',
  },
];

const normaliseFooterLinks = (value: unknown): FooterSettings['footerNavLinks'] => {
  if (!Array.isArray(value)) return [];

  return value
    .map((entry, index) => {
      if (!isRecord(entry)) return null;

      const label = toTrimmedString(entry.label);
      const slug = toTrimmedString(entry.slug);

      if (!label || !slug) return null;

      const linkType: 'navLink' | 'footerNavLink' =
        entry._type === 'footerNavLink' ? 'footerNavLink' : 'navLink';

      return {
        _key: toTrimmedString(entry._key) ?? `fallback-footer-link-${index}`,
        _type: linkType,
        label,
        slug: normaliseSlug(slug),
      };
    })
    .filter((entry): entry is NonNullable<typeof entry> => entry !== null);
};

const normaliseContactLinks = (value: unknown): FooterSettings['footerContactLinks'] => {
  if (!Array.isArray(value)) return [];

  return value
    .map((entry) => {
      const parseResult = contactTypeSchema.safeParse(entry);
      return parseResult.success ? parseResult.data : null;
    })
    .filter((entry): entry is NonNullable<typeof entry> => entry !== null);
};

interface FooterFallbackSeed {
  _id?: string;
  footerSiteName?: string | null;
  footerLogo?: unknown;
  footerNavLinks?: FooterSettings['footerNavLinks'];
  footerContactLinks?: FooterSettings['footerContactLinks'];
  footerCopyrightText?: string;
  title?: string;
}

export const buildFallbackFooter = (seed?: FooterFallbackSeed): FooterSettings => {
  const safeLogo = sanityImageSchema.safeParse(seed?.footerLogo);
  const navLinks =
    Array.isArray(seed?.footerNavLinks) && seed.footerNavLinks.length > 0
      ? seed.footerNavLinks
      : FALLBACK_FOOTER_LINKS;

  return {
    _id: seed?._id ?? 'footerSettings-fallback',
    _type: 'footerSettings',
    footerSiteName: toTrimmedString(seed?.footerSiteName) ?? null,
    footerLogo: safeLogo.success ? safeLogo.data : null,
    footerNavLinks: navLinks,
    footerContactLinks: Array.isArray(seed?.footerContactLinks) ? seed.footerContactLinks : [],
    footerCopyrightText: toTrimmedString(seed?.footerCopyrightText),
    title: toTrimmedString(seed?.title),
  };
};

export const normaliseInvalidFooter = (value: unknown): FooterSettings => {
  if (!isRecord(value)) {
    return buildFallbackFooter();
  }

  return buildFallbackFooter({
    _id: toTrimmedString(value._id),
    footerSiteName: toTrimmedString(value.footerSiteName) ?? null,
    footerLogo: value.footerLogo,
    footerNavLinks: normaliseFooterLinks(value.footerNavLinks),
    footerContactLinks: normaliseContactLinks(value.footerContactLinks),
    footerCopyrightText: toTrimmedString(value.footerCopyrightText),
    title: toTrimmedString(value.title),
  });
};
