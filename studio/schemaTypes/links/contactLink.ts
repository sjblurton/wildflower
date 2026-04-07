import {defineField, defineType} from 'sanity'

export const contactLinkType = defineType({
  name: 'contactLink',
  title: 'Contact link',
  type: 'document',
  fields: [
    defineField({
      name: 'contactType',
      title: 'Contact type',
      type: 'array',
      description:
        'Select the type of contact information. This can be used by the website to show the correct icon automatically.',
      of: [
        {type: 'emailLink'},
        {type: 'phoneLink'},
        {type: 'instagramLink'},
        {type: 'ticTocLink'},
        {type: 'whatsappLink'},
      ],
      validation: (Rule) => Rule.required().min(1).max(1),
    }),
  ],
  preview: {
    select: {
      contactType: 'contactType.0._type',
      title: 'contactType.0.title',
    },
    prepare({contactType, title}) {
      let type = 'Untitled contact link'
      if (contactType) {
        switch (contactType) {
          case 'emailLink':
            type = 'Email'
            break
          case 'phoneLink':
            type = 'Phone'
            break
          case 'instagramLink':
            type = 'Instagram'
            break
          case 'ticTocLink':
            type = 'TikTok'
            break
          case 'whatsappLink':
            type = 'WhatsApp'
            break
          default:
            type = contactType.charAt(0).toUpperCase() + contactType.slice(1)
        }
      }
      return {
        title: `${type} contact link${title ? ` - ${title}` : ''}`,
      }
    },
  },
})
