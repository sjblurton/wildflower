import {defineField, defineType} from 'sanity'

export const whatsappLinkType = defineType({
  name: 'whatsappLink',
  title: 'WhatsApp link',
  type: 'object',
  description: 'A link that opens WhatsApp to send a message to the specified phone number.',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Descriptive name for this WhatsApp link, for example "Support WhatsApp".',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'phoneNumber',
      title: 'Phone number',
      type: 'string',
      validation: (Rule) =>
        Rule.required()
          .regex(/^\+?[1-9]\d{1,14}$/, {
            name: 'E.164 format',
            invert: false,
          })
          .error('Please enter a valid phone number in E.164 format (e.g. +1234567890)'),
    }),
    defineField({
      name: 'message',
      title: 'Pre-filled message',
      type: 'string',
      description: 'Optional message that will be pre-filled in the WhatsApp chat.',
    }),
  ],
  preview: {
    select: {
      title: 'phoneNumber',
      subtitle: 'message',
    },
    prepare({title, subtitle}) {
      return {
        title: title || 'Untitled WhatsApp link',
        subtitle: subtitle || 'No pre-filled message',
      }
    },
  },
})
