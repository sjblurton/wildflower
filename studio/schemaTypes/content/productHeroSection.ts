import {defineArrayMember, defineField, defineType} from 'sanity'
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
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
      description:
        'Optional main heading for the product hero section. This will be above the image block. Or create a custom heading within the body field using the block editor.',
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
      validation: (Rule) => Rule.required().min(1),
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
      validation: (Rule) => Rule.required(),
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
      name: 'ctaButtons',
      title: 'CTA',
      type: 'array',
      description: 'Optional call to action for this product hero section.',
      group: 'content',
      of: [
        defineArrayMember({
          type: 'cta',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      images: 'images',
      ctaButtons: 'ctaButtons',
    },
    prepare({title, images, ctaButtons}) {
      const imageList = Array.isArray(images)
        ? images
        : images && typeof images === 'object'
          ? Object.values(images)
          : []

      const imageCount = imageList.length
      const media = imageList[0]
      const ctaCount = ctaButtons?.length ?? 0
      const ctaState =
        ctaCount > 0 ? `CTA set (${ctaCount} button${ctaCount === 1 ? '' : 's'})` : 'No CTA'

      return {
        title: title || 'Product hero section',
        subtitle: `${imageCount} image${imageCount === 1 ? '' : 's'} • ${ctaState}`,
        media,
      }
    },
  },
})
