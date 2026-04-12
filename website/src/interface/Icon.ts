import type { SanityImage } from '../lib/schemas/shared/primitives';

export type IconProp = { _type: 'internal'; link: string | null } | SanityImage;

export type IconPosition = 'left' | 'right';
