import { imageProjection } from '../../../lib/cms/projections/primatives';
import { navLinkProjection } from '../../../lib/cms/projections/links';

export const navSettingsQuery = /* groq */ `
  *[_type == "navSettings" && _id == "navSettings"][0]{
    _id,
    _type,
    navSiteName,
    navLogo{
      ${imageProjection}
    },
    navLinks[]{
      ${navLinkProjection}
    }
  }
`;
