import { z } from 'zod';

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

export const daisyThemeSchema = z.enum(daisyThemeValues);

const sanityAssetRefSchema = z.object({
  _ref: z.string().min(1),
  _type: z.literal('reference'),
});

export const sanityImageSchema = z
  .object({
    _type: z.literal('image'),
    alt: z.string().min(1),
    asset: sanityAssetRefSchema.nullable(),
  })
  .transform((img) => (img.asset ? img : null));

export const linkReferenceTypeSchema = z.object({
  _ref: z.string().min(1),
  _type: z.enum(['contactLinkReference', 'pageLinkReference', 'urlLinkReference']),
  _key: z.string().min(1),
});

export const textBlockSchema = z.looseObject({
  _type: z.literal('block'),
  _key: z.string().min(1),
  children: z.array(
    z.looseObject({
      _type: z.string(),
      _key: z.string().min(1),
      text: z.string().optional().nullable(),
    }),
  ),
});

export const sectionColoursSchema = z.enum(['light', 'dark']).default('light');

export type LinkReferenceType = z.infer<typeof linkReferenceTypeSchema>;
export type SanityImage = z.infer<typeof sanityImageSchema>;
export type DaisyTheme = z.infer<typeof daisyThemeSchema>;
