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

export const contactLinkFragment = /* groq */ `
  _key,
  ...@->{
    "contactLinkType": contactType[0]._type,
    _type,
    "type": select(
      contactType[0]._type == "emailLink" => "email",
      contactType[0]._type == "phoneLink" => "phone",
      contactType[0]._type == "whatsappLink" => "whatsapp",
      contactType[0]._type == "instagramLink" => "instagram",
      contactType[0]._type == "ticTocLink" => "tiktok",
      null
    ),
    "title": contactType[0].title,
    "url": contactType[0].url,
    "phoneNumber": contactType[0].phoneNumber,
    "emailAddress": contactType[0].email,
    "prefillMessage": contactType[0].message,
    "subject": contactType[0].subject,
    "body": contactType[0].body
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
