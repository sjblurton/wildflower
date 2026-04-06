export const pageSlugsQuery = `
  *[_type == "page" && defined(slug.current)]{
    "slug": slug.current
  }
`;

export const pageBySlugQuery = `
  *[_type == "page" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    sections[]{
      ...,
      targetPage->{_id, title, slug},
      targetSocialLink->{_id, title, platform, url, label, handle},
      targetContactLink->{_id, title, type, label, phoneNumber, emailAddress, prefillMessage},
      products[]{
        ...,
        cta{
          ...,
          targetPage->{_id, title, slug},
          targetSocialLink->{_id, title, platform, url, label, handle},
          targetContactLink->{_id, title, type, label, phoneNumber, emailAddress, prefillMessage}
        }
      },
      cta{
        ...,
        targetPage->{_id, title, slug},
        targetSocialLink->{_id, title, platform, url, label, handle},
        targetContactLink->{_id, title, type, label, phoneNumber, emailAddress, prefillMessage}
      },
      links[]->{_id, title, platform, url, label, handle}
    }
  }
`;

export const navSettingsQuery = `
  *[_type == "navSettings" && _id == "navSettings"][0]{
    navSiteName,
    navLogo,
    navBackgroundColor,
    navTextColor,
    navLinks[]->{_id, title, slug}
  }
`;

export const footerSettingsQuery = `
  *[_type == "footerSettings" && _id == "footerSettings"][0]{
    footerSiteName,
    footerLogo,
    footerCopyrightText,
    footerBackgroundColor,
    footerTextColor,
    footerNavLinks[]->{_id, title, slug},
    footerSocialLinks[]->{_id, title, platform, url, label, handle},
    footerContactLinks[]->{_id, title, type, label, phoneNumber, emailAddress, prefillMessage}
  }
`;
