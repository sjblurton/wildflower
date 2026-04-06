import {directionOptions, leftRightOptions} from './directionOptions'

export const productHeroImagePositionDesktopOptions = leftRightOptions

export const productHeroDefaults = {
  imagePositionDesktop: directionOptions.right.value,
} as const
