import {ctaType} from './content/cta'
import {imageSectionType} from './content/imageSection'
import {pageType} from './content/page'
import {productCardType} from './content/productCard'
import {productsSectionType} from './content/productsSection'
import {communicationLinksSectionType} from './content/communicationLinksSection'
import {textSectionType} from './content/textSection'
import {contactLinkType} from './links/contactLink'
import {socialLinkType} from './links/socialLink'
import {footerSettingsType} from './settings/footerSettings'
import {navSettingsType} from './settings/navSettings'
import {siteSettingsType} from './settings/siteSettings'
import {colourTokenType} from './tokens/colourToken'

export const schemaTypes = [
  colourTokenType,
  contactLinkType,
  ctaType,
  footerSettingsType,
  imageSectionType,
  navSettingsType,
  pageType,
  productCardType,
  productsSectionType,
  socialLinkType,
  communicationLinksSectionType,
  siteSettingsType,
  textSectionType,
]
