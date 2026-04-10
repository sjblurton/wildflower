import { z } from 'zod';

import { LogEvents } from '../../../../lib/logging/events';
import { logger, summarisePayload, type LogPayload } from '../../../../lib/logging/logger';
import { sanityImageSchema } from '../../../../lib/schemas/shared/primitives';
import { isRecord } from '../../../../lib/primitives/guards';
import { normaliseSlug, toTrimmedString } from '../../../../lib/primitives/strings';
import { NavSettingsSchema, type NavSettings } from '../data/nav.schema';

const FALLBACK_LINKS: NavSettings['navLinks'] = [
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

const normaliseLinks = (value: unknown): NavSettings['navLinks'] => {
  if (!Array.isArray(value)) return [];

  const links = value
    .map((entry, index) => {
      if (!isRecord(entry)) return null;

      const label = toTrimmedString(entry.label);
      const slug = toTrimmedString(entry.slug);

      if (!label || !slug) return null;

      return {
        _key: toTrimmedString(entry._key) ?? `fallback-link-${index}`,
        _type: 'navLink' as const,
        label,
        slug: normaliseSlug(slug),
      };
    })
    .filter((entry): entry is NonNullable<typeof entry> => entry !== null);

  return links;
};

interface FallbackSeed {
  _id?: string;
  navSiteName?: string | null;
  navLogo?: unknown;
  navBackground?: unknown;
  navLinks?: NavSettings['navLinks'];
}

const buildFallbackNav = (seed?: FallbackSeed): NavSettings => {
  const safeLogo = sanityImageSchema.safeParse(seed?.navLogo);
  const siteName = toTrimmedString(seed?.navSiteName) ?? null;
  const links =
    Array.isArray(seed?.navLinks) && seed.navLinks.length > 0 ? seed.navLinks : FALLBACK_LINKS;

  return {
    _id: seed?._id ?? 'navSettings-fallback',
    _type: 'navSettings',
    navSiteName: siteName,
    navLogo: safeLogo.success ? safeLogo.data : null,
    navLinks: links,
  };
};

const normaliseInvalidNav = (value: unknown) => {
  if (!isRecord(value)) {
    return buildFallbackNav();
  }

  return buildFallbackNav({
    _id: toTrimmedString(value._id),
    navSiteName: toTrimmedString(value.navSiteName) ?? null,
    navLogo: value.navLogo,
    navLinks: normaliseLinks(value.navLinks),
  });
};

interface LoadNavSettingsOptions {
  fetchNavSettings: () => Promise<unknown>;
  queryName?: string;
  log?: {
    info: (payload: LogPayload) => void;
    warn: (payload: LogPayload) => void;
    error: (payload: LogPayload) => void;
  };
}

export const loadNavSettings = async ({
  fetchNavSettings,
  queryName = 'navSettingsQuery',
  log = logger,
}: LoadNavSettingsOptions): Promise<NavSettings> => {
  let rawPayload: unknown;

  try {
    rawPayload = await fetchNavSettings();
  } catch (error) {
    log.error({
      event: LogEvents.nav.fetchFailed,
      area: 'navigation',
      message: 'Failed to fetch nav settings from Sanity; using fallback navigation.',
      meta: {
        queryName,
        error:
          error instanceof Error
            ? { name: error.name, message: error.message }
            : { message: 'Unknown error' },
      },
    });

    const fallback = buildFallbackNav();
    log.warn({
      event: LogEvents.nav.fallbackApplied,
      area: 'navigation',
      message: 'Applied fallback nav settings due to fetch failure.',
      meta: { reason: 'fetch_failed', queryName },
    });

    return fallback;
  }

  const parseResult = NavSettingsSchema.safeParse(rawPayload);

  if (parseResult.success) {
    logger.info({
      event: LogEvents.nav.navLoaded,
      area: 'navigation',
      message: 'Nav settings loaded and validated successfully.',
    });
    return buildFallbackNav(parseResult.data);
  }

  const fallback = normaliseInvalidNav(rawPayload);

  log.warn({
    event: LogEvents.nav.validationFailed,
    area: 'navigation',
    message: 'Nav settings validation failed; using fallback-safe nav settings.',
    meta: {
      queryName,
      zodError: z.prettifyError(parseResult.error),
      issues: parseResult.error.issues.map((issue) => ({
        path: issue.path.join('.'),
        code: issue.code,
        message: issue.message,
      })),
      payloadSummary: summarisePayload(rawPayload),
    },
  });

  log.warn({
    event: LogEvents.nav.fallbackApplied,
    area: 'navigation',
    message: 'Applied fallback-safe nav settings after validation failure.',
    meta: { reason: 'validation_failed', queryName },
  });

  return fallback;
};
