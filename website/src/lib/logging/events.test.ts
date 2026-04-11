import { describe, expect, it } from 'vitest';

import { LOG_EVENTS } from './events';

describe('LogEvents', () => {
  it('keeps nav event keys stable', () => {
    expect(LOG_EVENTS.nav).toEqual({
      fetchFailed: 'nav.fetch_failed',
      validationFailed: 'nav.validation_failed',
      fallbackApplied: 'nav.fallback_applied',
      navLoaded: 'nav.nav_loaded',
    });
  });
});
