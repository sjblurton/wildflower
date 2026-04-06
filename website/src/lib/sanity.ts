import imageUrlBuilder from "@sanity/image-url";
import { sanityClient } from "sanity:client";

const imageBuilder = imageUrlBuilder(sanityClient);

export { sanityClient };

export const urlFor = (source: Parameters<typeof imageBuilder.image>[0]) =>
  imageBuilder.image(source);
