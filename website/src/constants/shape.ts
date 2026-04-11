export const SIZES = {
  XSMALL: 'xsmall',
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
  XLARGE: 'xlarge',
} as const;

export const WIDTHS = {
  FULL: 'full',
  WIDE: 'wide',
  DEFAULT: 'default',
} as const;

export const VARIANTS = {
  OUTLINE: 'outline',
  CONTAINED: 'contained',
  LINK: 'link',
} as const;

export type Sizes = (typeof SIZES)[keyof typeof SIZES];
export type Widths = (typeof WIDTHS)[keyof typeof WIDTHS];
export type Variants = (typeof VARIANTS)[keyof typeof VARIANTS];
