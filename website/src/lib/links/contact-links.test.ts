import { describe, expect, it } from 'vitest';

import { getContactHref, getIconForContactLink, getLabelForContactLink } from './contact-links';
import type { ContactLink } from './contact-links.interface';

const emailLink: ContactLink = {
  _key: 'email-1',
  type: 'email',
  title: 'Email',
  value: 'hello@example.com',
};

const phoneLink: ContactLink = {
  _key: 'phone-1',
  type: 'phone',
  title: 'Phone',
  value: '+44 20 1234 5678',
};

const whatsappLink: ContactLink = {
  _key: 'whatsapp-1',
  type: 'whatsapp',
  title: 'WhatsApp',
  value: '+44 (0) 20-1234-5678',
  prefillMessage: 'Hello from footer',
};

const whatsappNoMessage: ContactLink = {
  _key: 'whatsapp-2',
  type: 'whatsapp',
  title: 'WhatsApp',
  value: '+44 (0) 20-1234-5678',
};

const instagramLink: ContactLink = {
  _key: 'instagram-1',
  type: 'instagram',
  title: 'Instagram',
  value: 'https://instagram.com/wildflower',
};

const tiktokLink: ContactLink = {
  _key: 'tiktok-1',
  type: 'tiktok',
  title: 'TikTok',
  value: 'https://www.tiktok.com/@wildflower',
};

describe('footer.contact-links', () => {
  it('returns hrefs for all supported contact link types', () => {
    expect(getContactHref(emailLink)).toBe('mailto:hello@example.com');
    expect(getContactHref(phoneLink)).toBe('tel:+44 20 1234 5678');
    expect(getContactHref(instagramLink)).toBe('https://instagram.com/wildflower');
    expect(getContactHref(tiktokLink)).toBe('https://www.tiktok.com/@wildflower');
  });

  it('normalises WhatsApp href and appends encoded prefill message when provided', () => {
    expect(getContactHref(whatsappLink)).toBe(
      'https://wa.me/4402012345678?text=Hello%20from%20footer',
    );
  });

  it('normalises WhatsApp href without query text when prefill message is missing', () => {
    expect(getContactHref(whatsappNoMessage)).toBe('https://wa.me/4402012345678');
  });

  it('returns labels for all supported contact link types', () => {
    expect(getLabelForContactLink(emailLink)).toBe('Email');
    expect(getLabelForContactLink(phoneLink)).toBe('Phone');
    expect(getLabelForContactLink(whatsappLink)).toBe('WhatsApp');
    expect(getLabelForContactLink(instagramLink)).toBe('Instagram');
    expect(getLabelForContactLink(tiktokLink)).toBe('TikTok');
  });

  it('returns icon markup for all supported contact link types', () => {
    expect(getIconForContactLink(emailLink)).toContain('<svg');
    expect(getIconForContactLink(phoneLink)).toContain('<svg');
    expect(getIconForContactLink(whatsappLink)).toContain('<svg');
    expect(getIconForContactLink(instagramLink)).toContain('<svg');
    expect(getIconForContactLink(tiktokLink)).toContain('<svg');
  });

  it('returns # for unknown contact type in defensive fallback branch', () => {
    const unknownLink = { type: 'unknown' } as unknown as ContactLink;
    expect(getContactHref(unknownLink)).toBe('#');
  });
});
