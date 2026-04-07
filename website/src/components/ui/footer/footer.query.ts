import { contactLinkFragment, imageProjection, navLinkProjection } from '../../../lib/cms/queries';

export const footerSettingsQuery = /* groq */ `
  *[_type == "footerSettings" && _id == "footerSettings"][0]{
    _id,
    _type,
    footerSiteName,
    footerLogo{
      ${imageProjection}
    },
    footerCopyrightText,
    footerBackground,
    footerNavLinks[]{
      ${navLinkProjection}
    },
    footerContactLinks[]{
      ${contactLinkFragment}
    }
  }
`;
