import { imageProjection, navLinkProjection } from '../../../lib/cms/queries';

export const navSettingsQuery = /* groq */ `
  *[_type == "navSettings" && _id == "navSettings"][0]{
    _id,
    _type,
    navSiteName,
    navLogo{
      ${imageProjection}
    },
    navBackground,
    navLinks[]{
      ${navLinkProjection}
    }
  }
`;
