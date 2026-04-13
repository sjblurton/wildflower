import z from 'zod';

export const sectionColoursSchema = z.enum(['light', 'dark']).default('light');
