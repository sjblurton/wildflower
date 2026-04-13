export const LOG_EVENTS = {
  nav: {
    navLoaded: 'nav.nav_loaded',
    fetchFailed: 'nav.fetch_failed',
    validationFailed: 'nav.validation_failed',
    fallbackApplied: 'nav.fallback_applied',
  },
  footer: {
    footerLoaded: 'footer.footer_loaded',
    fetchFailed: 'footer.fetch_failed',
    validationFailed: 'footer.validation_failed',
    fallbackApplied: 'footer.fallback_applied',
  },
  section: {
    sectionLoaded: 'section.section_loaded',
    fetchFailed: 'section.fetch_failed',
    validationFailed: 'section.validation_failed',
    fallbackApplied: 'section.removed_due_to_validation_failure',
    unknownSectionType: 'section.unknown_section_type',
  },
  page: {
    pageLoaded: 'page.page_loaded',
    validationFailed: 'page.validation_failed',
    fetchFailed: 'page.fetch_failed',
    fallbackApplied: 'page.fallback_applied',
  },
  seo: {
    pageDocumentLoaded: 'seo.page_document_loaded',
    siteDocumentLoaded: 'seo.site_document_loaded',
    siteSettingsFetchFailed: 'seo.site_settings_fetch_failed',
    pageDocumentFetchFailed: 'seo.page_document_fetch_failed',
    siteSettingsParseFailed: 'seo.site_settings_parse_failed',
    pageDocumentParseFailed: 'seo.page_document_parse_failed',
    fallbackApplied: 'seo.fallback_applied',
  },
  cta: {
    linkValidationFailed: 'cta.link_validation_failed',
    linkFetchFailed: 'cta.link_fetch_failed',
  },
  dev: {
    testEvent: 'DEV_TEST_EVENT',
  },
} as const;

export type LogEvent =
  | (typeof LOG_EVENTS.nav)[keyof typeof LOG_EVENTS.nav]
  | (typeof LOG_EVENTS.footer)[keyof typeof LOG_EVENTS.footer]
  | (typeof LOG_EVENTS.section)[keyof typeof LOG_EVENTS.section]
  | (typeof LOG_EVENTS.page)[keyof typeof LOG_EVENTS.page]
  | (typeof LOG_EVENTS.seo)[keyof typeof LOG_EVENTS.seo]
  | (typeof LOG_EVENTS.cta)[keyof typeof LOG_EVENTS.cta]
  | (typeof LOG_EVENTS.dev)[keyof typeof LOG_EVENTS.dev];
