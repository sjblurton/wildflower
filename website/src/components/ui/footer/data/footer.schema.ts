import z from 'zod';
import { contactTypeSchema } from '../../../../lib/schemas/links/contactLinks';
import { navLinkSchema } from '../../../../lib/schemas/links/navLink';
import { sanityImageSchema } from '../../../../lib/schemas/shared/primitives';

export const footerSettingsSchema = z.object({
  _id: z.string(),
  _type: z.literal('footerSettings'),
  footerContactLinks: contactTypeSchema.array(),
  footerCopyrightText: z.string().optional(),
  footerLogo: sanityImageSchema.nullable().optional(),
  footerNavLinks: navLinkSchema.array(),
  footerSiteName: z.string().nullable().optional(),
  title: z.string().optional(),
});

export type FooterSettings = z.infer<typeof footerSettingsSchema>;
