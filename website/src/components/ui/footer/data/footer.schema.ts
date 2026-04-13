import z from 'zod';
import { footerContactTypeSchema } from '../logic/footerContactLinks.schema';
import { navLinkSchema } from '../../../../lib/schemas/links/navLink';
import { sanityImageSchema, sectionColoursSchema } from '../../../../lib/schemas/shared/primitives';

export const footerSettingsSchema = z.object({
  _id: z.string(),
  _type: z.literal('footerSettings'),
  footerContactLinks: footerContactTypeSchema.array(),
  footerCopyrightText: z.string().optional(),
  footerLogo: sanityImageSchema.nullable().optional(),
  footerNavLinks: navLinkSchema.array(),
  footerSiteName: z.string().nullable().optional(),
  title: z.string().optional(),
  backgroundColour: sectionColoursSchema,
});

export type FooterSettings = z.infer<typeof footerSettingsSchema>;
