import z from 'zod';
import { sanityImageSchema } from '../shared/primitives';

const socialPlatforms = ['facebook', 'x', 'instagram', 'linkedin', 'youtube', 'tiktok'] as const;

export const socialLinksSchema = z.object({
  _key: z.string().min(1),
  _type: z.literal('socialLink'),
  title: z.string().min(1),
  platform: z.enum(socialPlatforms),
  url: z.string().min(1),
  icon: sanityImageSchema.nullish(),
  label: z.string().nullish(),
  handle: z.string().nullish(),
});
