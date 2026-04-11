export const DIRECTIONS = {
  LEFT: 'left',
  RIGHT: 'right',
  CENTER: 'center',
} as const;

export type Directions = (typeof DIRECTIONS)[keyof typeof DIRECTIONS];
