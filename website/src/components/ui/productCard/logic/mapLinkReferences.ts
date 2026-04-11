import type { LinkReferenceType } from '../../../../lib/schemas/shared/primitives';
import type { SanityImage } from '../../../../lib/schemas/shared/primitives';
import type {
  ContactLinkUnionType,
  ContactLinkReference,
} from '../../../../lib/links/contact-links.schema';
import type { NavLinkSlug } from '../../../../lib/schemas/links/navLink';
import { LOG_EVENTS } from '../../../../lib/logging/events';
import { getContactHref, getIconForContactLink } from '../../../../lib/links/contact-links';
import { logger } from '../../../../lib/logging/logger';

type MappedIcon =
  | {
      _type: 'internal';
      link: string | null;
    }
  | SanityImage;

type MappedLinkReference = {
  url: string;
  icon: MappedIcon | null;
};

type FetchLinkReference = {
  page: (id: string) => Promise<{ success: boolean; data: NavLinkSlug }>;
  contact: (id: string) => Promise<{ success: boolean; data: ContactLinkReference }>;
};

export const mapLinkReferences = async (
  link: LinkReferenceType,
  customIcon: MappedIcon | null | undefined,
  fetchLinkReference: FetchLinkReference,
): Promise<(MappedLinkReference | null)[]> => {
  if (link._type === 'pageLinkReference') {
    const { success, data } = await fetchLinkReference.page(link._ref);
    if (!success) {
      logger.error({
        event: LOG_EVENTS.cta.linkValidationFailed,
        area: 'mapLinkReferences',
        message: `Failed to fetch page link reference for CTA with _ref: ${link._ref}`,
        meta: { linkRef: link._ref, linkType: 'page', error: data },
      });
      return [null];
    }
    const icon = customIcon ? customIcon : null;
    return [{ url: data.slug.current, icon }];
  } else if (link._type === 'contactLinkReference') {
    const { success, data } = await fetchLinkReference.contact(link._ref);
    if (!success) {
      logger.error({
        event: LOG_EVENTS.cta.linkValidationFailed,
        area: 'mapLinkReferences',
        message: `Failed to fetch contact link reference for CTA with _ref: ${link._ref}`,
        meta: { linkRef: link._ref, linkType: 'contact', error: data },
      });
      return [null];
    }
    if (Array.isArray(data.contactType) && data.contactType.length > 0) {
      return data.contactType.map((ct: ContactLinkUnionType) => {
        try {
          const contactLink = mapContactLinksToContactLinks(ct);
          const icon = customIcon
            ? customIcon
            : { _type: 'internal' as const, link: getIconForContactLink(contactLink) };
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
    } else {
      logger.error({
        event: LOG_EVENTS.cta.linkValidationFailed,
        area: 'mapLinkReferences',
        message: `contactType array missing or empty for contactLinkReference`,
        meta: { data },
      });
      return [null];
    }
  }
  return [null];
};

import type { ContactLink } from '../../../../lib/links/contact-links.interface';
const mapContactLinksToContactLinks = (links: ContactLinkUnionType): ContactLink => {
  switch (links._type) {
    case 'emailLink':
      return {
        _key: links._key,
        type: 'email',
        value: links.emailAddress,
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
