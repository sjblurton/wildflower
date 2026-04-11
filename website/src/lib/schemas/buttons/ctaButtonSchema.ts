import z from 'zod';
import { COLOURS } from '../../../constants/colours';
import { DIRECTIONS } from '../../../constants/directions';
import { SIZES, VARIANTS, WIDTHS } from '../../../constants/shape';
import { linkReferenceTypeSchema, sanityImageSchema } from '../shared/primitives';

export const ctaButtonSchema = z.object({
  _key: z.string().min(1),
  _type: z.literal('cta'),
  label: z.string().min(1),
  colour: z
    .enum([
      COLOURS.PRIMARY,
      COLOURS.SECONDARY,
      COLOURS.NEUTRAL,
      COLOURS.ACCENT,
      COLOURS.INFO,
      COLOURS.SUCCESS,
      COLOURS.WARNING,
      COLOURS.ERROR,
    ])
    .default(COLOURS.PRIMARY),
  hasIcon: z.boolean().default(false),
  iconPosition: z.enum([DIRECTIONS.LEFT, DIRECTIONS.RIGHT]).default(DIRECTIONS.LEFT),
  size: z
    .enum([SIZES.XSMALL, SIZES.SMALL, SIZES.MEDIUM, SIZES.LARGE, SIZES.XLARGE])
    .default(SIZES.MEDIUM),
  customIcon: sanityImageSchema.nullish().optional(),
  style: z.enum([VARIANTS.CONTAINED, VARIANTS.OUTLINE, VARIANTS.LINK]).default(VARIANTS.CONTAINED),
  width: z.enum([WIDTHS.FULL, WIDTHS.WIDE, WIDTHS.DEFAULT]).default(WIDTHS.DEFAULT),
  links: linkReferenceTypeSchema.array().default([]),
});

export type CtaButton = z.infer<typeof ctaButtonSchema>;
