export const COLOURS = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  NEUTRAL: 'neutral',
  ACCENT: 'accent',
  INFO: 'info',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
  LIGHT: 'light',
  DARK: 'dark',
} as const;

export type Colours = (typeof COLOURS)[keyof typeof COLOURS];
