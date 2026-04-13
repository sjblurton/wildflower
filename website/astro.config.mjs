// @ts-check
import { defineConfig } from 'astro/config';
import sanity from '@sanity/astro';
import tailwindcss from '@tailwindcss/vite';

const projectId = process.env.PUBLIC_SANITY_PROJECT_ID ?? 'rocap12l';
const dataset = process.env.PUBLIC_SANITY_DATASET ?? 'production';

// https://astro.build/config
export default defineConfig({
  integrations: [
    sanity({
      projectId,
      dataset,
      useCdn: false,
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
