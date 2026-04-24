import {defineField, defineType} from 'sanity'

export const urlLinkType = defineType({
  name: 'urlLink',
  title: 'URL link',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Descriptive name for this URL link, for example "Company website".',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'url',
    },
    prepare({title, subtitle}) {
      return {
        title: title || 'Untitled URL link',
        subtitle: subtitle || 'No URL provided',
      }
    },
  },
})
