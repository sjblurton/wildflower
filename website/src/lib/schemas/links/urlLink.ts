import z from 'zod';

export const urlLinkSchema = z.object({
  url: z.url(),
  title: z.string(),
  _type: z.literal('urlLinkReference'),
});

export type UrlLink = z.infer<typeof urlLinkSchema>;
