import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  handlePageLink,
  handleContactLink,
  mapContactLinksToContactLinks,
  handleUrlLink,
} from './mapLinkReferences.utils';
import { logger } from '../../../../lib/logging/logger';
import type { LinkReferenceType } from '../../../../lib/schemas/shared/primitives';
import type { FetchLinkReference } from '../../../../lib/links/fetchLinkReference';
import type { NavLinkSlug } from '../../../../lib/schemas/links/navLink';
import type {
  ContactLinkReference,
  ContactLinkUnionType,
} from '../../../../lib/links/contact-links.schema';
import type { UrlLink } from '../../../../lib/schemas/links/urlLink';

vi.mock('../../../../lib/logging/logger', () => ({ logger: { error: vi.fn() } }));

const fakePageData = {
  _id: '1',
  _type: 'page',
  slug: { _type: 'slug', current: '/test-page' },
} satisfies NavLinkSlug;

const fakeContactData = (contactType: ContactLinkUnionType[] = []): ContactLinkReference => ({
  _id: '1',
  _type: 'contactLink',
  contactType,
});

const fakeUrlData = {
  _type: 'urlLinkReference',
  url: 'https://example.com',
  title: 'Example',
} satisfies UrlLink;

const fetchLinkReference = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  page: vi.fn(async (_ref: string) => ({ success: true as const, data: fakePageData })),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  contact: vi.fn(async (_ref: string) => ({ success: true as const, data: fakeContactData([]) })),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  url: vi.fn(async (_ref: string) => ({
    success: true as const,
    data: fakeUrlData,
  })),
} satisfies FetchLinkReference;

describe('handlePageLink', () => {
  it('returns mapped page link', async () => {
    const link: LinkReferenceType = { _type: 'pageLinkReference', _key: '1', _ref: 'page1' };
    const result = await handlePageLink(link, null, fetchLinkReference);
    expect(result).toEqual([{ url: '/test-page', icon: null }]);
  });
  it('logs error and returns [null] if fetch fails', async () => {
    fetchLinkReference.page.mockResolvedValueOnce({
      // @ts-expect-error - testing failure case
      success: false as const,
      //   @ts-expect-error - testing failure case
      data: 'fail',
    });
    const link: LinkReferenceType = { _type: 'pageLinkReference', _key: '1', _ref: 'fail' };
    const result = await handlePageLink(link, null, fetchLinkReference);
    expect(result).toEqual([null]);
    expect(logger.error).toHaveBeenCalled();
  });
});

describe('handleUrlLink', () => {
  it('returns mapped URL link', async () => {
    const link: LinkReferenceType = { _type: 'urlLinkReference', _key: '1', _ref: 'url1' };
    const result = await handleUrlLink(link, null, fetchLinkReference);
    expect(result).toEqual([{ url: 'https://example.com', icon: null }]);
  });
  it('logs error and returns [null] if fetch fails', async () => {
    fetchLinkReference.url.mockResolvedValueOnce({
      // @ts-expect-error - testing failure case
      success: false as const,
      //   @ts-expect-error - testing failure case
      data: 'fail',
    });
    const link: LinkReferenceType = { _type: 'urlLinkReference', _key: '1', _ref: 'fail' };
    const result = await handleUrlLink(link, null, fetchLinkReference);
    expect(result).toEqual([null]);
    expect(logger.error).toHaveBeenCalled();
  });
});

describe('handleContactLink', () => {
  beforeEach(() => vi.clearAllMocks());
  it('returns mapped contact link for emailLink', async () => {
    fetchLinkReference.contact.mockResolvedValueOnce({
      success: true as const,
      data: fakeContactData([
        {
          _type: 'emailLink',
          _key: '1',
          email: 'a@b.com',
          title: 'Email',
          subject: 'Hi',
          body: 'Body',
        },
      ]),
    });
    const link: LinkReferenceType = { _type: 'contactLinkReference', _key: '1', _ref: 'contact1' };
    const result = await handleContactLink(link, null, fetchLinkReference);
    expect(result[0]?.url).toContain('mailto:');
  });
  it('returns mapped contact link for phoneLink', async () => {
    fetchLinkReference.contact.mockResolvedValueOnce({
      success: true as const,
      data: fakeContactData([
        { _type: 'phoneLink', _key: '2', phoneNumber: '123', title: 'Phone' },
      ]),
    });
    const link: LinkReferenceType = { _type: 'contactLinkReference', _key: '2', _ref: 'contact2' };
    const result = await handleContactLink(link, null, fetchLinkReference);
    expect(result[0]?.url).toContain('tel:');
  });
  it('returns mapped contact link for whatsappLink', async () => {
    fetchLinkReference.contact.mockResolvedValueOnce({
      success: true as const,
      data: fakeContactData([
        {
          _type: 'whatsappLink',
          _key: '3',
          phoneNumber: '123',
          title: 'WhatsApp',
          prefillMessage: 'Hi',
        },
      ]),
    });
    const link: LinkReferenceType = { _type: 'contactLinkReference', _key: '3', _ref: 'contact3' };
    const result = await handleContactLink(link, null, fetchLinkReference);
    expect(result[0]?.url).toContain('wa.me');
  });
  it('returns mapped contact link for ticTocLink', async () => {
    fetchLinkReference.contact.mockResolvedValueOnce({
      success: true as const,
      data: fakeContactData([
        { _type: 'ticTocLink', _key: '4', url: 'https://tiktok.com', title: 'TikTok' },
      ]),
    });
    const link: LinkReferenceType = { _type: 'contactLinkReference', _key: '4', _ref: 'contact4' };
    const result = await handleContactLink(link, null, fetchLinkReference);
    expect(result[0]?.url).toContain('tiktok');
  });
  it('returns mapped contact link for instagramLink', async () => {
    fetchLinkReference.contact.mockResolvedValueOnce({
      success: true as const,
      data: fakeContactData([
        { _type: 'instagramLink', _key: '5', url: 'https://instagram.com', title: 'Instagram' },
      ]),
    });
    const link: LinkReferenceType = { _type: 'contactLinkReference', _key: '5', _ref: 'contact5' };
    const result = await handleContactLink(link, null, fetchLinkReference);
    expect(result[0]?.url).toContain('instagram');
  });
  it('logs error and returns [null] if fetch fails', async () => {
    fetchLinkReference.contact.mockResolvedValueOnce({
      // @ts-expect-error - testing failure case
      success: false as const,
      //   @ts-expect-error - testing failure case
      data: 'fail',
    });
    const link: LinkReferenceType = { _type: 'contactLinkReference', _key: '6', _ref: 'fail' };
    const result = await handleContactLink(link, null, fetchLinkReference);
    expect(result).toEqual([null]);
    expect(logger.error).toHaveBeenCalled();
  });
  it('logs error and returns [null] if contactType missing', async () => {
    // @ts-expect-error - testing missing contactType case
    fetchLinkReference.contact.mockResolvedValueOnce({ success: true as const, data: {} });
    const link: LinkReferenceType = { _type: 'contactLinkReference', _key: '7', _ref: 'fail' };
    const result = await handleContactLink(link, null, fetchLinkReference);
    expect(result).toEqual([null]);
    expect(logger.error).toHaveBeenCalled();
  });
  it('logs error and returns null for unsupported contact type', async () => {
    fetchLinkReference.contact.mockResolvedValueOnce({
      success: true as const,
      //   @ts-expect-error - testing unsupported contact type case
      data: fakeContactData([{ _type: 'unsupported', _key: '6' }]),
    });
    const link: LinkReferenceType = { _type: 'contactLinkReference', _key: '6', _ref: 'contact6' };
    const result = await handleContactLink(link, null, fetchLinkReference);
    expect(result).toEqual([null]);
    expect(logger.error).toHaveBeenCalled();
  });
});

describe('mapContactLinksToContactLinks', () => {
  it('maps emailLink', () => {
    const result = mapContactLinksToContactLinks({
      _type: 'emailLink',
      _key: '1',
      email: 'a@b.com',
      title: 'Email',
      subject: 'Hi',
      body: 'Body',
    });
    expect(result.type).toBe('email');
  });
  it('maps phoneLink', () => {
    const result = mapContactLinksToContactLinks({
      _type: 'phoneLink',
      _key: '2',
      phoneNumber: '123',
      title: 'Phone',
    });
    expect(result.type).toBe('phone');
  });
  it('maps whatsappLink', () => {
    const result = mapContactLinksToContactLinks({
      _type: 'whatsappLink',
      _key: '3',
      phoneNumber: '123',
      title: 'WhatsApp',
      prefillMessage: 'Hi',
    });
    expect(result.type).toBe('whatsapp');
  });
  it('maps ticTocLink', () => {
    const result = mapContactLinksToContactLinks({
      _type: 'ticTocLink',
      _key: '4',
      url: 'https://tiktok.com',
      title: 'TikTok',
    });
    expect(result.type).toBe('tiktok');
  });
  it('maps instagramLink', () => {
    const result = mapContactLinksToContactLinks({
      _type: 'instagramLink',
      _key: '5',
      url: 'https://instagram.com',
      title: 'Instagram',
    });
    expect(result.type).toBe('instagram');
  });
  it('throws for unsupported type', () => {
    // @ts-expect-error - testing unsupported contact type case
    expect(() => mapContactLinksToContactLinks({ _type: 'unsupported', _key: '6' })).toThrow(
      'Unsupported contact link type',
    );
  });
});
