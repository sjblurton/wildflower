import { describe, expect, it, vi } from 'vitest';

import type { LogPayload } from '../../../../lib/logging/logger';
import { loadFooterSettings } from './footer.logic';

const createLoggerSpy = () => {
  return {
    info: vi.fn<(payload: LogPayload) => void>(),
    warn: vi.fn<(payload: LogPayload) => void>(),
    error: vi.fn<(payload: LogPayload) => void>(),
  };
};

describe('loadFooterSettings', () => {
  it('returns parsed footer data when payload is valid', async () => {
    const log = createLoggerSpy();

    const footer = await loadFooterSettings({
      fetchFooterSettings: async () => ({
        _id: 'footerSettings',
        _type: 'footerSettings',
        footerSiteName: 'Wildflower Co',
        footerLogo: null,
        footerCopyrightText: 'All rights reserved',
        footerNavLinks: [
          {
            _key: 'home',
            _type: 'navLink',
            label: 'Home',
            slug: 'home',
          },
        ],
        footerContactLinks: [
          {
            _key: 'email-1',
            _type: 'contactLink',
            type: 'email',
            title: 'Email',
            emailAddress: 'hello@example.com',
          },
        ],
      }),
      log,
    });

    expect(footer.footerSiteName).toBe('Wildflower Co');
    expect(footer.footerNavLinks).toEqual([
      {
        _key: 'home',
        _type: 'navLink',
        label: 'Home',
        slug: '/',
      },
    ]);
    expect(footer.footerContactLinks).toHaveLength(1);
    expect(log.warn).not.toHaveBeenCalled();
    expect(log.error).not.toHaveBeenCalled();
  });

  it('logs and falls back when fetch fails', async () => {
    const log = createLoggerSpy();

    const footer = await loadFooterSettings({
      fetchFooterSettings: async () => {
        throw new Error('Network down');
      },
      log,
    });

    expect(footer.footerNavLinks.map((link) => link.slug)).toEqual(['/', '/contact']);
    expect(footer.footerContactLinks).toEqual([]);
    expect(log.error).toHaveBeenCalledWith(
      expect.objectContaining({
        event: 'footer.fetch_failed',
      }),
    );
    expect(log.warn).toHaveBeenCalledWith(
      expect.objectContaining({
        event: 'footer.fallback_applied',
      }),
    );
  });

  it('logs prettified zod error and salvages safe values on schema failure', async () => {
    const log = createLoggerSpy();

    const footer = await loadFooterSettings({
      fetchFooterSettings: async () => ({
        _id: 'footerSettings',
        _type: 'footerSettings',
        footerSiteName: 'Wildflower',
        footerNavLinks: [
          {
            _key: 'about',
            _type: 'navLink',
            label: 'About',
            slug: 'about',
          },
          {
            _key: 'bad',
            _type: 'navLink',
            label: '',
            slug: '',
          },
        ],
        footerContactLinks: [
          {
            _key: 'bad-contact',
            _type: 'contactLink',
            type: 'email',
            title: 'Email',
          },
        ],
      }),
      log,
    });

    expect(footer.footerSiteName).toBe('Wildflower');
    expect(footer.footerNavLinks).toEqual([
      {
        _key: 'about',
        _type: 'navLink',
        label: 'About',
        slug: '/about',
      },
    ]);
    expect(footer.footerContactLinks).toEqual([]);

    expect(log.warn).toHaveBeenCalledWith(
      expect.objectContaining({
        event: 'footer.validation_failed',
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
        event: 'footer.fallback_applied',
      }),
    );
  });

  it('handles unknown thrown values from fetch and still falls back safely', async () => {
    const log = createLoggerSpy();

    const footer = await loadFooterSettings({
      fetchFooterSettings: async () => {
        throw 'boom';
      },
      log,
    });

    expect(footer.footerNavLinks.map((link) => link.slug)).toEqual(['/', '/contact']);
    expect(footer.footerContactLinks).toEqual([]);
    expect(log.error).toHaveBeenCalledWith(
      expect.objectContaining({
        event: 'footer.fetch_failed',
        meta: expect.objectContaining({
          error: { message: 'Unknown error' },
        }),
      }),
    );
  });

  it('normalises non-object payload summaries when validation fails', async () => {
    const log = createLoggerSpy();

    const footer = await loadFooterSettings({
      fetchFooterSettings: async () => 42,
      log,
    });

    expect(footer.footerSiteName).toBeNull();
    expect(footer.footerNavLinks.map((link) => link.slug)).toEqual(['/', '/contact']);
    expect(footer.footerContactLinks).toEqual([]);

    expect(log.warn).toHaveBeenCalledWith(
      expect.objectContaining({
        event: 'footer.validation_failed',
        meta: expect.objectContaining({
          payloadSummary: { valueType: 'number' },
        }),
      }),
    );
  });

  it('uses Home and Contact fallback links when no valid nav links survive normalisation', async () => {
    const log = createLoggerSpy();

    const footer = await loadFooterSettings({
      fetchFooterSettings: async () => ({
        _id: 'footerSettings',
        _type: 'footerSettings',
        footerNavLinks: [
          {
            _key: 'bad-1',
            _type: 'navLink',
            label: '',
            slug: 'ignored',
          },
        ],
        footerContactLinks: [],
      }),
      log,
    });

    expect(footer.footerNavLinks.map((link) => link.slug)).toEqual(['/', '/contact']);
    expect(footer.footerNavLinks.map((link) => link.label)).toEqual(['Home', 'Contact']);
  });
});
