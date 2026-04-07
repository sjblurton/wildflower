import {defineField, defineType} from 'sanity'

export const phoneLinkType = defineType({
  name: 'phoneLink',
  title: 'Phone link',
  type: 'object',
  description: 'A link that initiates a phone call to the specified number when clicked.',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Descriptive name for this phone link, for example "Support Phone".',
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
          .error('Please enter a valid phone number in E.164 format (e.g., +1234567890)'),
    }),
  ],
  preview: {
    select: {
      title: 'phoneNumber',
    },
    prepare({title}) {
      return {
        title: title || 'Untitled Phone link',
      }
    },
  },
})
