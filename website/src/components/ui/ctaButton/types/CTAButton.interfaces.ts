import type { IconPosition, IconProp } from '../../../../interface/Icon';

export interface CTAButtonViewProps {
  _key: string;
  label: string;
  url: string;
  class: string;
  icon: IconProp | null;
  iconPosition: IconPosition | null;
}

export type MappedLinkReference = {
  url: string;
  icon: IconProp | null;
};
