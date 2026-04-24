import type { IconProp } from '../../../../interface/Icon';
import { getContactHref, getIconForContactLink } from '../../../../lib/links/contact-links';
import type { ContactLink } from '../../../../lib/links/contact-links.interface';
import type { ContactLinkUnionType } from '../../../../lib/links/contact-links.schema';
import type { FetchLinkReference } from '../../../../lib/links/fetchLinkReference';
import { LOG_EVENTS } from '../../../../lib/logging/events';
import { logger } from '../../../../lib/logging/logger';
import type { LinkReferenceType } from '../../../../lib/schemas/shared/primitives';
import type { MappedLinkReference } from '../types/CTAButton.interfaces';

export const handleUrlLink = async (
  link: LinkReferenceType,
  iconProp: IconProp | null | undefined,
  fetchLinkReference: FetchLinkReference,
): Promise<(MappedLinkReference | null)[]> => {
  const { success, data } = await fetchLinkReference.url(link._ref);
  if (!success) {
    logger.error({
      event: LOG_EVENTS.cta.linkValidationFailed,
      area: 'mapLinkReferences',
      message: `Failed to parse URL link reference for CTA with _ref: ${link._ref}`,
      meta: { linkRef: link._ref, linkType: 'url', error: data },
    });
    return [null];
  }
  return [{ url: data.url, icon: iconProp ?? null }];
};

export const handlePageLink = async (
  link: LinkReferenceType,
  iconProp: IconProp | null | undefined,
  fetchLinkReference: FetchLinkReference,
): Promise<(MappedLinkReference | null)[]> => {
  const { success, data } = await fetchLinkReference.page(link._ref);
  if (!success) {
    logger.error({
      event: LOG_EVENTS.cta.linkValidationFailed,
      area: 'mapLinkReferences',
      message: `Failed to parse page link reference for CTA with _ref: ${link._ref}`,
      meta: { linkRef: link._ref, linkType: 'page', error: data },
    });
    return [null];
  }
  return [{ url: data.slug.current, icon: iconProp ?? null }];
};

export const handleContactLink = async (
  link: LinkReferenceType,
  iconProp: IconProp | null | undefined,
  fetchLinkReference: FetchLinkReference,
): Promise<(MappedLinkReference | null)[]> => {
  const { success, data } = await fetchLinkReference.contact(link._ref);
  if (!success) {
    logger.error({
      event: LOG_EVENTS.cta.linkValidationFailed,
      area: 'mapLinkReferences',
      message: `Failed to parse contact link reference for CTA with _ref: ${link._ref}`,
      meta: { linkRef: link._ref, linkType: 'contact', error: data },
    });
    return [null];
  }
  if (!Array.isArray(data.contactType) || data.contactType.length === 0) {
    logger.error({
      event: LOG_EVENTS.cta.linkValidationFailed,
      area: 'mapLinkReferences',
      message: `contactType array missing or empty for contactLinkReference`,
      meta: { data },
    });
    return [null];
  }
  return data.contactType.map((ct: ContactLinkUnionType) => {
    try {
      const contactLink = mapContactLinksToContactLinks(ct);
      const icon = iconProp ?? {
        _type: 'internal' as const,
        link: getIconForContactLink(contactLink),
      };
      return {
        url: getContactHref(contactLink),
        icon,
      };
    } catch (e) {
      logger.error({
        event: LOG_EVENTS.cta.linkValidationFailed,
        area: 'mapLinkReferences',
        message: `Unsupported contact link type in contactType array`,
        meta: { error: e instanceof Error ? e.message : String(e), contactType: ct },
      });
      return null;
    }
  });
};

export const mapContactLinksToContactLinks = (links: ContactLinkUnionType): ContactLink => {
  switch (links._type) {
    case 'emailLink':
      return {
        _key: links._key,
        type: 'email',
        value: links.email,
        title: links.title,
        subject: links.subject,
        body: links.body,
      };
    case 'phoneLink':
      return {
        _key: links._key,
        type: 'phone',
        value: links.phoneNumber,
        title: links.title,
      };
    case 'whatsappLink':
      return {
        _key: links._key,
        type: 'whatsapp',
        value: links.phoneNumber,
        title: links.title,
        prefillMessage: links.prefillMessage,
      };
    case 'ticTocLink':
      return {
        _key: links._key,
        type: 'tiktok',
        value: links.url,
        title: links.title,
      };
    case 'instagramLink':
      return {
        _key: links._key,
        type: 'instagram',
        value: links.url,
        title: links.title,
      };
    default:
      throw new Error(`Unsupported contact link type`);
  }
};
