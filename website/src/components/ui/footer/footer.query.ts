import {
  contactLinkDereferenceProjection,
  imageProjection,
  navLinkProjection,
  socialLinkDereferenceProjection,
} from '../../../lib/queries';

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
    footerSocialLinks[]{
      _key,
      "_type": @->_type,
      ...@->{
        ${socialLinkDereferenceProjection}
      }
    },
    footerContactLinks[]{
      _key,
      "_type": @->_type,
      ...@->{
        ${contactLinkDereferenceProjection}
      }
    }
  }
`;
