import { navLinkSlugSchema } from '../schemas/links/navLink';
import { referenceIdQuery, referenceIdToNavLinkQuery } from '../cms/queries';
import { sanityClient } from '../cms/sanity';
import { contactLinkSchema } from './contact-links.schema';
import { urlLinkSchema } from '../schemas/links/urlLink';

export type FetchLinkReference = {
  contact: (id: string) => ReturnType<typeof fetchContactLinkReference>;
  page: (id: string) => ReturnType<typeof fetchPageLinkReference>;
  url: (id: string) => ReturnType<typeof fetchUrlLinkReference>;
};

const fetchContactLinkReference = async (id: string) => {
  const result = await sanityClient.fetch(referenceIdQuery, { id });
  return contactLinkSchema.safeParseAsync(result);
};

const fetchPageLinkReference = async (id: string) => {
  const result = await sanityClient.fetch(referenceIdToNavLinkQuery, { id });
  return navLinkSlugSchema.safeParseAsync(result);
};

const fetchUrlLinkReference = async (id: string) => {
  const result = await sanityClient.fetch(referenceIdQuery, { id });
  return urlLinkSchema.safeParseAsync(result);
};

export const fetchLinkReference: FetchLinkReference = {
  contact: fetchContactLinkReference,
  page: fetchPageLinkReference,
  url: fetchUrlLinkReference,
};
