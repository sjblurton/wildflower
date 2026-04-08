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
} as const;

export type LogEvent =
  (typeof LogEvents)[keyof typeof LogEvents][keyof (typeof LogEvents)[keyof typeof LogEvents]];
