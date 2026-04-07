import { createImageUrlBuilder } from '@sanity/image-url';
import { createClient } from '@sanity/client';

const sanityClient = createClient({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET,
  apiVersion: '2023-01-01',
  useCdn: true,
  perspective: 'published',
});

const imageBuilder = createImageUrlBuilder(sanityClient);

export { sanityClient };

export const urlFor = (source: Parameters<typeof imageBuilder.image>[0]) =>
  imageBuilder.image(source);
