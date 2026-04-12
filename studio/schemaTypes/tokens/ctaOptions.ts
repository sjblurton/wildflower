import {colourOptions} from './colourOptions'
import {directionOptions, leftRightOptions} from './directionOptions'

const ctaOptions = {
  linkType: {
    page: {title: 'Page', value: 'page'},
    social: {title: 'Social link', value: 'social'},
    contact: {title: 'Contact link', value: 'contact'},
  },
  style: {
    outline: {title: 'Outline', value: 'outline'},
    contained: {title: 'Contained', value: 'contained'},
    link: {title: 'Link', value: 'link'},
  },
  size: {
    xsmall: {title: 'XSmall', value: 'xsmall'},
    small: {title: 'Small', value: 'small'},
    medium: {title: 'Medium', value: 'medium'},
    large: {title: 'Large', value: 'large'},
    xlarge: {title: 'XLarge', value: 'xlarge'},
  },
  width: {
    full: {title: 'Full width', value: 'full'},
    wide: {title: 'Wide', value: 'wide'},
    default: {title: 'Default', value: 'default'},
  },
  iconPosition: directionOptions,
} as const

export const ctaStyleOptions = Object.values(ctaOptions.style)
export const ctaSizeOptions = Object.values(ctaOptions.size)
export const ctaWidthOptions = Object.values(ctaOptions.width)
export const ctaIconPositionOptions = leftRightOptions

export const ctaDefaults = {
  linkType: ctaOptions.linkType.page.value,
  style: ctaOptions.style.contained.value,
  colour: colourOptions.primary.value,
  size: ctaOptions.size.medium.value,
  width: ctaOptions.width.default.value,
  hasIcon: false,
  iconPosition: directionOptions.left.value,
} as const
