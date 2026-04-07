import {ctaType} from './content/cta'
import {imageSectionType} from './content/imageSection'
import {pageType} from './content/page'
import {productCardType} from './content/productCard'
import {productHeroSectionType} from './content/productHeroSection'
import {productsSectionType} from './content/productsSection'
import {communicationLinksSectionType} from './content/communicationLinksSection'
import {textSectionType} from './content/textSection'
import {contactLinkType} from './links/contactLink'
import {instagramLinkType} from './links/instagramLink'
import {phoneLinkType} from './links/phoneLink'
import {ticTocLinkType} from './links/ticTocLink'
import {emailLinkType} from './links/emailLink'
import {whatsappLinkType} from './links/watsappLink'

import {footerSettingsType} from './settings/footerSettings'
import {navSettingsType} from './settings/navSettings'
import {siteSettingsType} from './settings/siteSettings'

export const schemaTypes = [
  contactLinkType,
  ctaType,
  footerSettingsType,
  imageSectionType,
  navSettingsType,
  pageType,
  productCardType,
  productHeroSectionType,
  productsSectionType,
  communicationLinksSectionType,
  siteSettingsType,
  textSectionType,
  instagramLinkType,
  phoneLinkType,
  ticTocLinkType,
  emailLinkType,
  whatsappLinkType,
]
