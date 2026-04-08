export const colourOptions = {
  transparent: {title: 'None', value: 'transparent'},
  white: {title: 'White', value: 'white'},
  black: {title: 'Black', value: 'black'},
  primary: {title: 'Primary', value: 'primary'},
  secondary: {title: 'Secondary', value: 'secondary'},
  neutral: {title: 'Neutral', value: 'neutral'},
  accent: {title: 'Accent', value: 'accent'},
  info: {title: 'Info', value: 'info'},
  success: {title: 'Success', value: 'success'},
  warning: {title: 'Warning', value: 'warning'},
  error: {title: 'Error', value: 'error'},
} as const

export const daisyThemeOptions = [
  {title: 'LoFi - muted neutrals', value: 'lofi'},
  {title: 'Black - pure high-contrast dark', value: 'black'},
  {title: 'Dracula - vivid dark purple', value: 'dracula'},
  {title: 'Pastel - soft light tones', value: 'pastel'},
  {title: 'Night - deep cool dark', value: 'night'},
  {title: 'Winter - crisp cool light', value: 'winter'},
  {title: 'Valentine - warm pink/red', value: 'valentine'},
  {title: 'Garden - fresh natural green', value: 'garden'},
  {title: 'Retro - warm vintage', value: 'retro'},
  {title: 'Cupcake - playful bright pastel', value: 'cupcake'},
]

export const ctaColourOptions = [
  {title: colourOptions.primary.title, value: colourOptions.primary.value},
  {title: colourOptions.secondary.title, value: colourOptions.secondary.value},
  {title: colourOptions.neutral.title, value: colourOptions.neutral.value},
  {title: colourOptions.accent.title, value: colourOptions.accent.value},
  {title: colourOptions.info.title, value: colourOptions.info.value},
  {title: colourOptions.success.title, value: colourOptions.success.value},
  {title: colourOptions.warning.title, value: colourOptions.warning.value},
  {title: colourOptions.error.title, value: colourOptions.error.value},
]
