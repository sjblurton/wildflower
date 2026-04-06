export const imageProjection = /* groq */ `
  _type,
  alt,
  asset
`;

export const navLinkProjection = /* groq */ `
  _key,
  _type,
  label,
  "slug": page->slug.current
`;

export const socialLinkDereferenceProjection = /* groq */ `
  title,
  platform,
  url,
  icon{
    ${imageProjection}
  },
  label,
  handle
`;

export const contactLinkDereferenceProjection = /* groq */ `
  title,
  type,
  icon{
    ${imageProjection}
  },
  label,
  phoneNumber,
  emailAddress,
  prefillMessage
`;

export const pageSlugListQuery = /* groq */ `
  *[_type == "page" && defined(slug.current)]{
    "slug": slug.current
  }
`;

export const pageBySlugQuery = /* groq */ `
  *[_type == "page" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    seo{
      metaTitle,
      metaDescription,
      ogImage{
        _type,
        alt,
        asset
      }
    }
  }
`;
