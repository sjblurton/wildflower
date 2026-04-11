import { z } from 'zod';
import {
  emailLinkSchema,
  instagramLinkSchema,
  phoneLinkSchema,
  ticTocLinkSchema,
  whatsappLinkSchema,
} from '../../../../lib/links/contact-links.schema';

const contactLinkType = 'contactLink' as const;

const footerWhatsappLinkSchema = whatsappLinkSchema.extend({
  _type: z.literal(contactLinkType),
  type: z.literal('whatsapp'),
});

const footerEmailLinkSchema = emailLinkSchema.extend({
  _type: z.literal(contactLinkType),
  type: z.literal('email'),
});

const footerTicTocLinkSchema = ticTocLinkSchema.extend({
  _key: z.string().min(1),
  _type: z.literal(contactLinkType),
  type: z.literal('tiktok'),
});

const footerInstagramLinkSchema = instagramLinkSchema.extend({
  _key: z.string().min(1),
  _type: z.literal(contactLinkType),
  type: z.literal('instagram'),
});

const footerPhoneLinkSchema = phoneLinkSchema.extend({
  _key: z.string().min(1),
  _type: z.literal(contactLinkType),
  type: z.literal('phone'),
});

export const footerContactTypeSchema = z.discriminatedUnion('type', [
  footerWhatsappLinkSchema,
  footerEmailLinkSchema,
  footerTicTocLinkSchema,
  footerInstagramLinkSchema,
  footerPhoneLinkSchema,
]);

export type FooterContactLink = z.infer<typeof footerContactTypeSchema>;
