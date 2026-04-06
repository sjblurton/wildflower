import z from 'zod';
import { contactLinkSchema } from '../../../lib/schemas/links/contactLinks';
import { navLinkSchema } from '../../../lib/schemas/links/navLink';
import { socialLinksSchema } from '../../../lib/schemas/links/socialLinks';
import { backgroundColourSchema, sanityImageSchema } from '../../../lib/schemas/shared/primitives';

export const footerSettingsSchema = z.object({
  _id: z.string(),
  _type: z.literal('footerSettings'),
  footerBackground: backgroundColourSchema,
  footerContactLinks: contactLinkSchema.array(),
  footerCopyrightText: z.string().optional(),
  footerLogo: sanityImageSchema.nullable().optional(),
  footerNavLinks: navLinkSchema.array(),
  footerSiteName: z.string().nullable().optional(),
  footerSocialLinks: socialLinksSchema.array(),
  title: z.string().optional(),
});

export type FooterSettings = z.infer<typeof footerSettingsSchema>;
