export const siteSeoQuery = /* groq */ `
  *[_type == "siteSettings" && _id == "siteSettings"][0]{
    siteTitle,
    siteUrl,
    defaultMetaTitle,
    defaultMetaDescription,
    globalWebIndex,
    defaultOgImage{
      _type,
      alt,
      asset
    }
  }
`;

export const pageSeoBySlugQuery = /* groq */ `
  *[_type == "page" && slug.current == $slug][0]{
    title,
    "slug": slug.current,
    seo{
      metaTitle,
      metaDescription,
      webIndex,
      ogImage{
        _type,
        alt,
        asset
      }
    }
  }
`;
