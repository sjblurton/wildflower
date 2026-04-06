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
