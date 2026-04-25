import z from 'zod';

export const urlLinkSchema = z.object({
  url: z.url(),
  title: z.string(),
  _type: z.enum(['urlLinkReference', 'urlLink']),
});

export type UrlLink = z.infer<typeof urlLinkSchema>;
