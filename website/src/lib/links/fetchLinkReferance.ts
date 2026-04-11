import { navLinkSlugSchema } from '../schemas/links/navLink';
import { referenceIdToContactLinkQuery, referenceIdToNavLinkQuery } from '../cms/queries';
import { sanityClient } from '../cms/sanity';
import { contactLinkSchema } from './contact-links.schema';

const fetchContactLinkReference = async (id: string) => {
  const result = await sanityClient.fetch(referenceIdToContactLinkQuery, { id });
  return contactLinkSchema.safeParseAsync(result);
};

const fetchPageLinkReference = async (id: string) => {
  const result = await sanityClient.fetch(referenceIdToNavLinkQuery, { id });
  return navLinkSlugSchema.safeParseAsync(result);
};

export const fetchLinkReference = {
  contact: fetchContactLinkReference,
  page: fetchPageLinkReference,
};
