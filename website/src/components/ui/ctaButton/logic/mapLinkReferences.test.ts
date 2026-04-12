import { describe, it, expect, vi } from 'vitest';
import { logger } from '../../../../lib/logging/logger';
import { mapLinkReferences } from './mapLinkReferences';
import type { LinkReferenceType } from '../../../../lib/schemas/shared/primitives';
import type { NavLinkSlug } from '../../../../lib/schemas/links/navLink';
import type { ContactLinkReference } from '../../../../lib/links/contact-links.schema';
import type { FetchLinkReference } from '../../../../lib/links/fetchLinkReference';

vi.mock('../../../../lib/logging/logger', () => {
  return { logger: { error: vi.fn() } };
});

const fakePageData = {
  _type: 'page',
  _id: '1',
  slug: { _type: 'slug', current: '/test-page' },
} satisfies NavLinkSlug;

const fakeContactData = {
  _id: '1',
  _type: 'contactLink',
  contactType: [
    {
      _type: 'emailLink',
      _key: '1',
      emailAddress: 'a@b.com',
      title: 'Email',
      subject: 'Hi',
      body: 'Body',
    },
  ],
} satisfies ContactLinkReference;

const fetchLinkReference = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  page: vi.fn(async (_ref: string) => ({ success: true as const, data: fakePageData })),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  contact: vi.fn(async (_ref: string) => ({ success: true as const, data: fakeContactData })),
} satisfies FetchLinkReference;

describe('mapLinkReferences', () => {
  it('returns mapped page link', async () => {
    const link: LinkReferenceType = { _type: 'pageLinkReference', _ref: 'page1', _key: 'x' };
    const result = await mapLinkReferences(link, null, fetchLinkReference);
    expect(result).toEqual([{ url: '/test-page', icon: null }]);
  });

  it('returns mapped contact link', async () => {
    const link: LinkReferenceType = { _type: 'contactLinkReference', _ref: 'contact1', _key: 'x' };
    const result = await mapLinkReferences(link, null, fetchLinkReference);
    expect(result[0]?.url).toContain('mailto:');
    expect(result[0]?.icon).not.toBeUndefined();
  });

  it('returns [null] for unknown type', async () => {
    // @ts-expect-error - testing unknown type
    const link: LinkReferenceType = { _type: 'unknown', _ref: 'x', _key: 'x' };
    const result = await mapLinkReferences(link, null, fetchLinkReference);
    expect(result).toEqual([null]);
  });

  it('logs error and returns [null] if page fetch fails', async () => {
    // @ts-expect-error - testing failure case
    fetchLinkReference.page.mockResolvedValueOnce({ success: false, data: 'fail' });
    const link: LinkReferenceType = { _type: 'pageLinkReference', _ref: 'fail', _key: 'x' };
    const result = await mapLinkReferences(link, null, fetchLinkReference);
    expect(result).toEqual([null]);
    expect(logger.error).toHaveBeenCalled();
  });

  it('logs error and returns [null] if contact fetch fails', async () => {
    // @ts-expect-error - testing failure case
    fetchLinkReference.contact.mockResolvedValueOnce({ success: false, data: 'fail' });
    const link: LinkReferenceType = { _type: 'contactLinkReference', _ref: 'fail', _key: 'x' };
    const result = await mapLinkReferences(link, null, fetchLinkReference);
    expect(result).toEqual([null]);
    expect(logger.error).toHaveBeenCalled();
  });

  it('logs error and returns [null] if contactType missing', async () => {
    // @ts-expect-error - testing failure case
    fetchLinkReference.contact.mockResolvedValueOnce({ success: true, data: {} });
    const link: LinkReferenceType = { _type: 'contactLinkReference', _ref: 'fail', _key: 'x' };
    const result = await mapLinkReferences(link, null, fetchLinkReference);
    expect(result).toEqual([null]);
    expect(logger.error).toHaveBeenCalled();
  });
});
