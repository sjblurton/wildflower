import type { Directions } from '../constants/directions';

const TEXT_CLASS_MAPS = {
  ALIGN: {
    left: 'text-left',
    right: 'text-right',
    center: 'text-center',
  },
};

export const getTextClassNames = ({ align }: { align: Directions }) => TEXT_CLASS_MAPS.ALIGN[align];
