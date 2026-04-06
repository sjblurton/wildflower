import { z } from 'zod';

const backgroundColourValues = ['primary', 'secondary', 'neutral', 'accent'] as const;
const daisyThemeValues = [
  'lofi',
  'black',
  'dracula',
  'pastel',
  'night',
  'winter',
  'valentine',
  'garden',
  'retro',
  'cupcake',
] as const;

export const backgroundColourSchema = z.enum(backgroundColourValues);
export const daisyThemeSchema = z.enum(daisyThemeValues);

const sanityAssetRefSchema = z.object({
  _ref: z.string().min(1),
  _type: z.literal('reference'),
});

export const sanityImageSchema = z.object({
  _type: z.literal('image'),
  alt: z.string().min(1),
  asset: sanityAssetRefSchema.optional(),
});

export type SanityImage = z.infer<typeof sanityImageSchema>;
export type DaisyTheme = z.infer<typeof daisyThemeSchema>;
