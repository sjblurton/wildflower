import { contactLinkProjection } from './projections/links';
import { imageProjection } from './projections/primatives';

export const referenceIdToNavLinkQuery = /* groq */ `
  *[_type == "referenceId" && _id == $id][0]{
    _id,
    _type,
    slug
  }
`;

export const referenceIdToContactLinkQuery = /* groq */ `
  *[_type == "referenceId" && _id == $id][0]{
    ${contactLinkProjection}
  }
`;

export const pageSlugListQuery = /* groq */ `
  *[_type == "page" && defined(slug.current)]{
    "slug": slug.current
  }
`;

export const pageBySlugQuery = /* groq */ `
  *[_type == "page" && slug.current == $slug][0]{
    _id,
    _type,
    title,
    "slug": slug.current,
    seo{
      metaTitle,
      metaDescription,
      ogImage{
        ${imageProjection}
      },
    },
    content,
  }
`;
