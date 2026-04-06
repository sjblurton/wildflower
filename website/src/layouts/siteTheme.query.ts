export const siteThemeQuery = /* groq */ `
  *[_type == "siteSettings" && _id == "siteSettings"][0]{
    _id,
    _type,
    theme
  }
`;
