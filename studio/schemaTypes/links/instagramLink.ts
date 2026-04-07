import {defineField, defineType} from 'sanity'

export const instagramLinkType = defineType({
  name: 'instagramLink',
  title: 'Instagram link',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Descriptive name for this social link, for example "Main Instagram Account".',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'Profile URL',
      type: 'url',
      description: 'Full URL for this social profile, for example https://instagram.com/yourname.',
      validation: (Rule) => Rule.required().uri({scheme: ['http', 'https']}),
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'image',
      description:
        'Optional custom icon for this social link. If not set, the website can use the platform value to show a default logo.',
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
    }),
  ],
  preview: {
    select: {
      title: 'title',
      url: 'url',
    },
    prepare({title, url}) {
      return {
        title: title || 'Untitled Instagram link',
        subtitle: `${url || 'No URL set'}`,
      }
    },
  },
})
