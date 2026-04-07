import { z } from 'zod';

const whatsappLinkSchema = z.object({
  _key: z.string().min(1),
  _type: z.literal('contactLink'),
  type: z.literal('whatsapp'),
  title: z.string().min(1),
  phoneNumber: z.string().min(1),
  prefillMessage: z.string().nullish().optional(),
});

const emailLinkSchema = z.object({
  _key: z.string().min(1),
  _type: z.literal('contactLink'),
  type: z.literal('email'),
  title: z.string().min(1),
  emailAddress: z.email(),
  subject: z.string().nullish().optional(),
  body: z.string().nullish().optional(),
});

const ticTocLinkSchema = z.object({
  _key: z.string().min(1),
  _type: z.literal('contactLink'),
  type: z.literal('tiktok'),
  title: z.string().min(1),
  url: z.string().min(1),
});

const instagramLinkSchema = z.object({
  _key: z.string().min(1),
  _type: z.literal('contactLink'),
  type: z.literal('instagram'),
  title: z.string().min(1),
  url: z.string().min(1),
});

const phoneLinkSchema = z.object({
  _key: z.string().min(1),
  _type: z.literal('contactLink'),
  type: z.literal('phone'),
  title: z.string().min(1),
  phoneNumber: z.string().min(1),
});

export const contactTypeSchema = z.discriminatedUnion('type', [
  whatsappLinkSchema,
  emailLinkSchema,
  ticTocLinkSchema,
  instagramLinkSchema,
  phoneLinkSchema,
]);

export type ContactLink = z.infer<typeof contactTypeSchema>;
