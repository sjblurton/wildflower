import { contactLinkProjection, navLinkProjection } from '../../../../lib/cms/projections/links';
import { imageProjection } from '../../../../lib/cms/projections/primatives';

export const footerSettingsQuery = /* groq */ `
  *[_type == "footerSettings" && _id == "footerSettings"][0]{
    _id,
    _type,
    backgroundColour,
    footerSiteName,
    footerLogo{
      ${imageProjection}
    },
    footerCopyrightText,
    footerNavLinks[]{
      ${navLinkProjection}
    },
    footerContactLinks[]{
      ${contactLinkProjection}
    }
  }
`;
