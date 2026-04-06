import { z } from 'zod';

export const navLinkSchema = z.object({
  _key: z.string().min(1),
  _type: z.enum(['navLink', 'footerNavLink']),
  label: z.string().min(1),
  slug: z
    .string()
    .min(1)
    .transform((string) => (string === 'home' ? '/' : `/${string}`)),
});
