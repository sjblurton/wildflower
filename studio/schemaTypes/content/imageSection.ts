import {defineField, defineType} from 'sanity'

export const imageSectionType = defineType({
  name: 'imageSection',
  title: 'Image section',
  type: 'object',
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
    }),
    defineField({
      name: 'overlayTitle',
      title: 'Overlay title',
      type: 'string',
      description: 'Optional title displayed over the image.',
    }),
    defineField({
      name: 'overlayOpacity',
      title: 'Overlay opacity',
      type: 'number',
      description: 'Overlay strength from 0 (none) to 8 (strongest).',
      initialValue: 3,
      validation: (Rule) => Rule.min(0).integer().max(8),
    }),
  ],
  preview: {
    select: {
      title: 'overlayTitle',
      media: 'image',
      opacity: 'overlayOpacity',
    },
    prepare({title, media, opacity}) {
      return {
        title: title || 'Image section',
        subtitle: `Opacity: ${opacity || 3}`,
        media,
      }
    },
  },
})
