import { z } from 'zod';
import { sanityImageSchema } from '../shared/primitives';

const contactLinkTypes = ['email', 'phone', 'whatsapp'] as const;

export const contactLinkSchema = z.object({
  _key: z.string().min(1),
  _type: z.literal('contactLink'),
  title: z.string().min(1),
  type: z.enum(contactLinkTypes),
  icon: sanityImageSchema.nullish(),
  label: z.string().nullish(),
  phoneNumber: z.string().nullish(),
  emailAddress: z.string().nullish(),
  prefillMessage: z.string().nullish(),
});
