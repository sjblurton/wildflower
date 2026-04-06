import { z } from 'zod';
import { daisyThemeSchema } from '../lib/schemas/shared/primitives';

export const siteThemeSchema = z.object({
  _id: z.string(),
  _type: z.literal('siteSettings'),
  theme: daisyThemeSchema.default('lofi'),
});
