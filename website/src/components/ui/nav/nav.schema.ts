import { z } from 'zod';
import { navLinkSchema } from '../../../lib/schemas/links/navLink';
import { sanityImageSchema } from '../../../lib/schemas/shared/primitives';

export const NavSettingsSchema = z.object({
  _id: z.string(),
  _type: z.literal('navSettings'),
  navSiteName: z.string().min(1).nullable().optional(),
  navLogo: sanityImageSchema.nullable().optional(),
  navLinks: z.array(navLinkSchema).default([]),
});

export type NavSettings = z.infer<typeof NavSettingsSchema>;
