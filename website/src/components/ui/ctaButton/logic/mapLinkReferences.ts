import type { IconProp } from '../../../../interface/Icon';
import type { LinkReferenceType } from '../../../../lib/schemas/shared/primitives';
import type { FetchLinkReference } from '../../../../lib/links/fetchLinkReference';
import type { MappedLinkReference } from '../types/CTAButton.interfaces';
import { handlePageLink, handleContactLink, handleUrlLink } from './mapLinkReferences.utils';

export const mapLinkReferences = async (
  link: LinkReferenceType,
  iconProp: IconProp | null | undefined,
  fetchLinkReference: FetchLinkReference,
): Promise<(MappedLinkReference | null)[]> => {
  if (link._type === 'pageLinkReference') {
    return handlePageLink(link, iconProp, fetchLinkReference);
  }
  if (link._type === 'contactLinkReference') {
    return handleContactLink(link, iconProp, fetchLinkReference);
  }
  if (link._type === 'urlLinkReference') {
    return handleUrlLink(link, fetchLinkReference);
  }
  return [null];
};
