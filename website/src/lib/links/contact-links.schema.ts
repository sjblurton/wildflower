import { z } from 'zod';

export const whatsappLinkSchema = z.object({
  _key: z.string().min(1),
  _type: z.literal('whatsappLink'),
  title: z.string().min(1),
  phoneNumber: z.string().min(1),
  prefillMessage: z.string().nullish().optional(),
});

export const emailLinkSchema = z.object({
  _key: z.string().min(1),
  _type: z.literal('emailLink'),
  title: z.string().min(1),
  emailAddress: z.email(),
  subject: z.string().nullish().optional(),
  body: z.string().nullish().optional(),
});

export const ticTocLinkSchema = z.object({
  _key: z.string().min(1),
  _type: z.literal('ticTocLink'),
  title: z.string().min(1),
  url: z.string().min(1),
});

export const instagramLinkSchema = z.object({
  _key: z.string().min(1),
  _type: z.literal('instagramLink'),
  title: z.string().min(1),
  url: z.string().min(1),
});

export const phoneLinkSchema = z.object({
  _key: z.string().min(1),
  _type: z.literal('phoneLink'),
  title: z.string().min(1),
  phoneNumber: z.string().min(1),
});

const contactsTypesTypeSchema = z.discriminatedUnion('_type', [
  whatsappLinkSchema,
  emailLinkSchema,
  ticTocLinkSchema,
  instagramLinkSchema,
  phoneLinkSchema,
]);

export const contactLinkSchema = z.object({
  _type: z.literal('contactLink'),
  _id: z.string().min(1),
  contactType: contactsTypesTypeSchema.array().default([]),
});

export type ContactLinkReference = z.infer<typeof contactLinkSchema>;

export type ContactLinkUnionType = z.infer<typeof contactsTypesTypeSchema>;
