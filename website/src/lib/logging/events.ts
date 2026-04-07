export const LogEvents = {
  nav: {
    fetchFailed: 'nav.fetch_failed',
    validationFailed: 'nav.validation_failed',
    fallbackApplied: 'nav.fallback_applied',
  },
} as const;

export type LogEvent =
  (typeof LogEvents)[keyof typeof LogEvents][keyof (typeof LogEvents)[keyof typeof LogEvents]];
