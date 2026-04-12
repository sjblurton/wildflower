import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getCtaProps } from './CTAButton.logic';
import type { CtaButton } from '../../../../lib/schemas/buttons/ctaButtonSchema';
import type { FetchLinkReference } from '../../../../lib/links/fetchLinkReference';
import type { MappedLinkReference } from '../types/CTAButton.interfaces';

vi.mock('./mapLinkReferences', () => ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  mapLinkReferences: vi.fn(async (_link, customIcon, _fetchLinkReference) => [
    { url: '/mock-url', icon: customIcon ?? null } satisfies MappedLinkReference,
  ]),
}));

const fetchLinkReference = {} as FetchLinkReference;

const baseCta: CtaButton = {
  _key: '1',
  _type: 'cta',
  label: 'Test CTA',
  colour: 'primary',
  hasIcon: true,
  iconPosition: 'left',
  size: 'medium',
  style: 'contained',
  width: 'default',
  links: [{ _type: 'pageLinkReference', _key: '1', _ref: 'page1' }],
  customIcon: null,
};

describe('getCtaProps', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns null if cta is null', async () => {
    const result = await getCtaProps(null, fetchLinkReference);
    expect(result).toBeNull();
  });

  it('returns CTAButtonViewProps for each mapped link', async () => {
    const result = await getCtaProps([baseCta], fetchLinkReference);
    expect(result).toEqual([
      expect.objectContaining({
        _key: '1',
        label: 'Test CTA',
        url: '/mock-url',
        class: expect.any(String),
        icon: null,
        iconPosition: 'left',
      }),
    ]);
  });

  it('sets iconPosition to null if hasIcon is false', async () => {
    const cta = { ...baseCta, hasIcon: false };
    const result = await getCtaProps([cta], fetchLinkReference);
    expect(result?.[0].iconPosition).toBeNull();
  });

  it('handles multiple CTAs and links', async () => {
    const cta1 = { ...baseCta, _key: '1' };
    const cta2 = {
      ...baseCta,
      _key: '2',
      links: [
        { _type: 'pageLinkReference', _key: '2-1', _ref: 'page2' },
        { _type: 'pageLinkReference', _key: '2-2', _ref: 'page3' },
      ],
    } satisfies CtaButton;
    const result = await getCtaProps([cta1, cta2], fetchLinkReference);
    expect(result?.length).toBe(3);
  });
});
