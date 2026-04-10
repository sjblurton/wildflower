export const LogEvents = {
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
} as const;

export type LogEvent =
  | (typeof LogEvents.nav)[keyof typeof LogEvents.nav]
  | (typeof LogEvents.footer)[keyof typeof LogEvents.footer]
  | (typeof LogEvents.section)[keyof typeof LogEvents.section]
  | (typeof LogEvents.page)[keyof typeof LogEvents.page]
  | (typeof LogEvents.seo)[keyof typeof LogEvents.seo];
