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
} as const;

export type LogEvent =
  (typeof LogEvents)[keyof typeof LogEvents][keyof (typeof LogEvents)[keyof typeof LogEvents]];
