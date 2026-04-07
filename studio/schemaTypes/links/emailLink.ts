import {defineField, defineType} from 'sanity'

export const emailLinkType = defineType({
  name: 'emailLink',
  title: 'Email link',
  type: 'object',
  description:
    "A link that opens the user's email client to send an email to the specified address.",
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Descriptive name for this email link, for example "Support Email".',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email address',
      type: 'string',
      validation: (Rule) => Rule.required().email().error('Email address is required'),
    }),
    defineField({
      name: 'subject',
      title: 'Email subject',
      type: 'string',
      description: 'Optional subject line for the email.',
    }),
    defineField({
      name: 'body',
      title: 'Email body',
      type: 'text',
      description: 'Optional body content for the email.',
    }),
  ],
  preview: {
    select: {
      title: 'email',
      subtitle: 'subject',
    },
    prepare({title, subtitle}) {
      return {
        title: title || 'Untitled Email link',
        subtitle: subtitle || 'No subject set',
      }
    },
  },
})
