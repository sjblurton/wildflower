import type { SanityImage } from '../../../lib/schemas/shared/primitives';

export interface CTAButtonViewProps {
  _key: string;
  label: string;
  url: string;
  class: string;
  icon: { _type: 'internal'; link: string | null } | SanityImage | null;
  iconPosition: 'left' | 'right' | null;
}
