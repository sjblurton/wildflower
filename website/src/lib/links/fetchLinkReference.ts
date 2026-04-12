import { navLinkSlugSchema } from '../schemas/links/navLink';
import { referenceIdToContactLinkQuery, referenceIdToNavLinkQuery } from '../cms/queries';
import { sanityClient } from '../cms/sanity';
import { contactLinkSchema } from './contact-links.schema';

export type FetchLinkReference = {
  contact: (id: string) => ReturnType<typeof fetchContactLinkReference>;
  page: (id: string) => ReturnType<typeof fetchPageLinkReference>;
};

const fetchContactLinkReference = async (id: string) => {
  const result = await sanityClient.fetch(referenceIdToContactLinkQuery, { id });
  return contactLinkSchema.safeParseAsync(result);
};

const fetchPageLinkReference = async (id: string) => {
  const result = await sanityClient.fetch(referenceIdToNavLinkQuery, { id });
  return navLinkSlugSchema.safeParseAsync(result);
};

export const fetchLinkReference: FetchLinkReference = {
  contact: fetchContactLinkReference,
  page: fetchPageLinkReference,
};
