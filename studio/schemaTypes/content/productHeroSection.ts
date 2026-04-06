import {defineArrayMember, defineField, defineType} from 'sanity'
import {colourOptions, sectionBackgroundColourOptions} from '../tokens/colourOptions'
import {
  productHeroDefaults,
  productHeroImagePositionDesktopOptions,
} from '../tokens/productHeroOptions'

export const productHeroSectionType = defineType({
  name: 'productHeroSection',
  title: 'Product hero section',
  type: 'object',
  groups: [
    {
      name: 'content',
      title: 'Content',
      default: true,
    },
    {
      name: 'media',
      title: 'Media',
    },
    {
      name: 'cta',
      title: 'CTA',
    },
    {
      name: 'styling',
      title: 'Styling',
    },
  ],
  fields: [
    defineField({
      name: 'background',
      title: 'Background colour',
      type: 'string',
      group: 'styling',
      description:
        'Optional section background style. Text contrast is handled automatically by the active theme.',
      options: {
        list: sectionBackgroundColourOptions,
        layout: 'radio',
      },
      initialValue: colourOptions.transparent.value,
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
      description: 'Main heading for the product hero section.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Text',
      type: 'array',
      group: 'content',
      description: 'Supporting text shown beside the image gallery.',
      of: [
        defineArrayMember({
          type: 'block',
        }),
      ],
    }),
    defineField({
      name: 'imagePositionDesktop',
      title: 'Desktop image position',
      type: 'string',
      group: 'content',
      description: 'Choose whether the image gallery appears on the left or right on desktop.',
      options: {
        list: productHeroImagePositionDesktopOptions,
        layout: 'radio',
      },
      initialValue: productHeroDefaults.imagePositionDesktop,
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      group: 'media',
      description: 'Image gallery for this product hero section.',
      of: [
        defineArrayMember({
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt text',
              type: 'string',
              description:
                'Describe the image for accessibility. This text is not publicly visible but is important for screen readers.',
              validation: (Rule) => Rule.required(),
            }),
          ],
        }),
      ],
      validation: (Rule) => Rule.required().min(1).max(6),
    }),
    defineField({
      name: 'addCta',
      title: 'Add CTA',
      type: 'boolean',
      initialValue: false,
      group: 'content',
    }),
    defineField({
      name: 'cta',
      title: 'CTA',
      type: 'cta',
      description: 'Optional call to action for this product hero section.',
      group: 'cta',
      hidden: ({parent}) => {
        const section = parent as {addCta?: boolean} | undefined
        return !section?.addCta
      },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      images: 'images',
      hasCta: 'addCta',
      ctaType: 'cta.linkType',
    },
    prepare({title, images, hasCta, ctaType}) {
      const imageList = Array.isArray(images)
        ? images
        : images && typeof images === 'object'
          ? Object.values(images)
          : []

      const imageCount = imageList.length
      const media = imageList[0]
      const ctaState = hasCta ? `CTA set (${ctaType || 'page'})` : 'No CTA'

      return {
        title: title || 'Product hero section',
        subtitle: `${imageCount} image${imageCount === 1 ? '' : 's'} • ${ctaState}`,
        media,
      }
    },
  },
})
