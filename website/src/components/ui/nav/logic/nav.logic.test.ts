import { describe, expect, it, vi } from 'vitest';

import type { LogPayload } from '../../../../lib/logging/logger';
import { loadNavSettings } from './nav.logic';

const createLoggerSpy = () => {
  return {
    info: vi.fn<(payload: LogPayload) => void>(),
    warn: vi.fn<(payload: LogPayload) => void>(),
    error: vi.fn<(payload: LogPayload) => void>(),
  };
};

describe('loadNavSettings', () => {
  it('returns parsed nav data when payload is valid', async () => {
    const log = createLoggerSpy();

    const nav = await loadNavSettings({
      fetchNavSettings: async () => ({
        _id: 'navSettings',
        _type: 'navSettings',
        navSiteName: 'Wildflower Co',
        navLogo: null,
        navLinks: [
          {
            _key: 'home',
            _type: 'navLink',
            label: 'Home',
            slug: 'home',
          },
        ],
      }),
      log,
    });

    expect(nav.navSiteName).toBe('Wildflower Co');
    expect(nav.navLinks).toEqual([
      {
        _key: 'home',
        _type: 'navLink',
        label: 'Home',
        slug: '/',
      },
    ]);
    expect(log.warn).not.toHaveBeenCalled();
    expect(log.error).not.toHaveBeenCalled();
  });

  it('logs and falls back when fetch fails', async () => {
    const log = createLoggerSpy();

    const nav = await loadNavSettings({
      fetchNavSettings: async () => {
        throw new Error('Network down');
      },
      log,
    });

    expect(nav.navLinks.map((link) => link.slug)).toEqual(['/', '/contact']);
    expect(log.error).toHaveBeenCalledWith(
      expect.objectContaining({
        event: 'nav.fetch_failed',
      }),
    );
    expect(log.warn).toHaveBeenCalledWith(
      expect.objectContaining({
        event: 'nav.fallback_applied',
      }),
    );
  });

  it('logs prettified zod error and salvages safe values on schema failure', async () => {
    const log = createLoggerSpy();

    const nav = await loadNavSettings({
      fetchNavSettings: async () => ({
        _id: 'navSettings',
        _type: 'navSettings',
        navSiteName: 'Wildflower',
        navBackground: 'primary',
        navLinks: [
          {
            _key: 'bad-link',
            _type: 'navLink',
            label: '',
            slug: '',
          },
        ],
      }),
      log,
    });

    expect(nav.navSiteName).toBe('Wildflower');
    expect(nav.navLinks.map((link) => link.slug)).toEqual(['/', '/contact']);

    expect(log.warn).toHaveBeenCalledWith(
      expect.objectContaining({
        event: 'nav.validation_failed',
        meta: expect.objectContaining({
          zodError: expect.any(String),
          payloadSummary: expect.objectContaining({
            valueType: 'object',
          }),
        }),
      }),
    );

    expect(log.warn).toHaveBeenCalledWith(
      expect.objectContaining({
        event: 'nav.fallback_applied',
      }),
    );
  });

  it('handles unknown thrown values from fetch and still falls back safely', async () => {
    const log = createLoggerSpy();

    const nav = await loadNavSettings({
      fetchNavSettings: async () => {
        throw 'boom';
      },
      log,
    });

    expect(nav.navLinks.map((link) => link.slug)).toEqual(['/', '/contact']);
    expect(log.error).toHaveBeenCalledWith(
      expect.objectContaining({
        event: 'nav.fetch_failed',
        meta: expect.objectContaining({
          error: { message: 'Unknown error' },
        }),
      }),
    );
  });

  it('normalises non-object payload summaries when validation fails', async () => {
    const log = createLoggerSpy();

    const nav = await loadNavSettings({
      fetchNavSettings: async () => 42,
      log,
    });

    expect(nav.navSiteName).toBeNull();
    expect(nav.navLinks.map((link) => link.slug)).toEqual(['/', '/contact']);

    expect(log.warn).toHaveBeenCalledWith(
      expect.objectContaining({
        event: 'nav.validation_failed',
        meta: expect.objectContaining({
          payloadSummary: { valueType: 'number' },
        }),
      }),
    );
  });

  it('normalises slug "home" to "/" when schema fails (line 33) and preserves valid navLogo (line 93)', async () => {
    const log = createLoggerSpy();

    const nav = await loadNavSettings({
      fetchNavSettings: async () => ({
        _id: 'navSettings',
        _type: 'navSettings',
        navLogo: {
          _type: 'image',
          alt: 'Logo',
          asset: { _ref: 'image-abc123', _type: 'reference' },
        },
        navLinks: [{ _key: 'home-key', label: 'Home', slug: 'home' }],
      }),
      log,
    });

    expect(nav.navLinks).toEqual([
      { _key: 'home-key', _type: 'navLink', label: 'Home', slug: '/' },
    ]);
    expect(nav.navLogo).toEqual({
      _type: 'image',
      alt: 'Logo',
      asset: { _ref: 'image-abc123', _type: 'reference' },
    });
  });

  it('returns fallback links when navLinks is not an array', async () => {
    const log = createLoggerSpy();

    const nav = await loadNavSettings({
      fetchNavSettings: async () => ({
        _id: 'navSettings',
        _type: 'navSettings',
        navLinks: 'not-an-array',
      }),
      log,
    });

    expect(nav.navLinks.map((link) => link.slug)).toEqual(['/', '/contact']);
  });

  it('salvages valid links from malformed payload and normalises slugs', async () => {
    const log = createLoggerSpy();

    const nav = await loadNavSettings({
      fetchNavSettings: async () => ({
        _id: 'bad-nav',
        _type: 'navSettings',
        navSiteName: '  ',
        navLinks: [
          null,
          {
            _key: '',
            label: 'About',
            slug: 'about',
          },
          {
            label: 'Team',
            slug: '/team',
          },
          {
            _key: 'bad-label',
            label: '',
            slug: 'ignored',
          },
        ],
      }),
      log,
    });

    expect(nav.navSiteName).toBeNull();
    expect(nav.navLinks).toEqual([
      {
        _key: 'fallback-link-1',
        _type: 'navLink',
        label: 'About',
        slug: '/about',
      },
      {
        _key: 'fallback-link-2',
        _type: 'navLink',
        label: 'Team',
        slug: '/team',
      },
    ]);
  });
});
