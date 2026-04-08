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
