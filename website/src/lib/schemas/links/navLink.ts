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

export const navLinkSlugSchema = z.object({
  _id: z.string().min(1),
  _type: z.literal('page'),
  slug: z.object({
    _type: z.literal('slug'),
    current: z.string().min(1),
  }),
});

export type NavLinkSlug = z.infer<typeof navLinkSlugSchema>;
