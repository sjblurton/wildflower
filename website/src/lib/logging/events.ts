export const LogEvents = {
  nav: {
    fetchFailed: 'nav.fetch_failed',
    validationFailed: 'nav.validation_failed',
    fallbackApplied: 'nav.fallback_applied',
  },
  footer: {
    fetchFailed: 'footer.fetch_failed',
    validationFailed: 'footer.validation_failed',
    fallbackApplied: 'footer.fallback_applied',
  },
  section: {
    fetchFailed: 'section.fetch_failed',
    validationFailed: 'section.validation_failed',
    fallbackApplied: 'section.removed_due_to_validation_failure',
  },
  page: {
    validationFailed: 'page.validation_failed',
    fetchFailed: 'page.fetch_failed',
    fallbackApplied: 'page.fallback_applied',
  },
  seo: {
    siteSettingsFetchFailed: 'seo.site_settings_fetch_failed',
    pageDocumentFetchFailed: 'seo.page_document_fetch_failed',
    siteSettingsParseFailed: 'seo.site_settings_parse_failed',
    pageDocumentParseFailed: 'seo.page_document_parse_failed',
    fallbackApplied: 'seo.fallback_applied',
  },
} as const;

export type LogEvent =
  | (typeof LogEvents.nav)[keyof typeof LogEvents.nav]
  | (typeof LogEvents.footer)[keyof typeof LogEvents.footer]
  | (typeof LogEvents.section)[keyof typeof LogEvents.section]
  | (typeof LogEvents.page)[keyof typeof LogEvents.page]
  | (typeof LogEvents.seo)[keyof typeof LogEvents.seo];
