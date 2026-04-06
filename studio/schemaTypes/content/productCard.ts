import {defineField, defineType} from 'sanity'

export const productCardType = defineType({
  name: 'productCard',
  title: 'Product card',
  type: 'object',
  groups: [
    {
      name: 'content',
      title: 'Content',
      default: true,
    },
    {
      name: 'cta',
      title: 'CTA',
    },
  ],
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
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
            'Describe the logo image for accessibility. This text is not publicly visible but is important for screen readers.',
          validation: (Rule) => Rule.required(),
        }),
      ],
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
      group: 'content',
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
      description: 'Optional call to action for this product card.',
      group: 'cta',
      hidden: ({parent}) => {
        const productCard = parent as {addCta?: boolean} | undefined
        return !productCard?.addCta
      },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
      ctaLabel: 'cta.label',
      ctaType: 'cta.linkType',
      hasCta: 'addCta',
    },
    prepare({title, media, ctaLabel, hasCta, ctaType}) {
      const ctaState = hasCta ? `CTA: ${ctaLabel} (${ctaType || 'page'})` : 'No CTA'

      return {
        title: title || 'Untitled product card',
        subtitle: ctaState,
        media,
      }
    },
  },
})
