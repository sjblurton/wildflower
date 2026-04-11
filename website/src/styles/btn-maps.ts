import type { Colours } from '../constants/colours';
import type { Widths, Sizes, Variants } from '../constants/shape';

const BTN_CLASS_MAPS = {
  COLOURS: {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    neutral: 'btn-neutral',
    accent: 'btn-accent',
    info: 'btn-info',
    success: 'btn-success',
    warning: 'btn-warning',
    error: 'btn-error',
  },
  SIZE: {
    xsmall: 'btn btn-xs',
    small: 'btn btn-sm',
    medium: 'btn',
    large: 'btn btn-lg',
    xlarge: 'btn btn-xl',
  },
  WIDTHS: {
    full: 'btn-block',
    wide: 'btn-wide',
    default: '',
  },
  VARIANTS: {
    outline: 'btn-outline',
    contained: '',
    link: 'btn-link',
  },
} as const;

export const getBtnClassNames = ({
  colour,
  size,
  width,
  style,
}: {
  colour: Colours;
  size: Sizes;
  width: Widths;
  style: Variants;
}) => {
  return [
    BTN_CLASS_MAPS.COLOURS[colour],
    BTN_CLASS_MAPS.SIZE[size],
    BTN_CLASS_MAPS.WIDTHS[width],
    BTN_CLASS_MAPS.VARIANTS[style],
  ]
    .filter(Boolean)
    .join(' ')
    .trim();
};
