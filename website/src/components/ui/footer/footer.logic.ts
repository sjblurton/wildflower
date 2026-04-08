import { z } from 'zod';

import { LogEvents } from '../../../lib/logging/events';
import { logger, summarisePayload, type LogPayload } from '../../../lib/logging/logger';
import { footerSettingsSchema, type FooterSettings } from './footer.schema';
import { buildFallbackFooter, normaliseInvalidFooter } from './footer.load.utils';

interface LoadFooterSettingsOptions {
  fetchFooterSettings: () => Promise<unknown>;
  queryName?: string;
  log?: {
    info: (payload: LogPayload) => void;
    warn: (payload: LogPayload) => void;
    error: (payload: LogPayload) => void;
  };
}

export const loadFooterSettings = async ({
  fetchFooterSettings,
  queryName = 'footerSettingsQuery',
  log = logger,
}: LoadFooterSettingsOptions): Promise<FooterSettings> => {
  let rawPayload: unknown;

  try {
    rawPayload = await fetchFooterSettings();
  } catch (error) {
    log.error({
      event: LogEvents.footer.fetchFailed,
      area: 'footer',
      message: 'Failed to fetch footer settings from Sanity; using fallback footer settings.',
      meta: {
        queryName,
        error:
          error instanceof Error
            ? { name: error.name, message: error.message }
            : { message: 'Unknown error' },
      },
    });

    const fallback = buildFallbackFooter();

    log.warn({
      event: LogEvents.footer.fallbackApplied,
      area: 'footer',
      message: 'Applied fallback footer settings due to fetch failure.',
      meta: { reason: 'fetch_failed', queryName },
    });

    return fallback;
  }

  const parseResult = footerSettingsSchema.safeParse(rawPayload);

  if (parseResult.success) {
    return parseResult.data;
  }

  const fallback = normaliseInvalidFooter(rawPayload);

  log.warn({
    event: LogEvents.footer.validationFailed,
    area: 'footer',
    message: 'Footer settings validation failed; using fallback-safe footer settings.',
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
    event: LogEvents.footer.fallbackApplied,
    area: 'footer',
    message: 'Applied fallback-safe footer settings after validation failure.',
    meta: { reason: 'validation_failed', queryName },
  });

  return fallback;
};
