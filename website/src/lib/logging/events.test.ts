import { describe, expect, it } from 'vitest';

import { LogEvents } from './events';

describe('LogEvents', () => {
  it('keeps nav event keys stable', () => {
    expect(LogEvents.nav).toEqual({
      fetchFailed: 'nav.fetch_failed',
      validationFailed: 'nav.validation_failed',
      fallbackApplied: 'nav.fallback_applied',
      navLoaded: 'nav.nav_loaded',
    });
  });
});
