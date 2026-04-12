import {defineArrayMember, defineField, defineType} from 'sanity'

export const communicationLinksSectionType = defineType({
  name: 'communicationLinksSection',
  title: 'Communication links section',
  type: 'object',
  fields: [
    defineField({
      name: 'header',
      title: 'Header',
      type: 'string',
      description: 'Optional heading shown above social links.',
    }),
    defineField({
      name: 'links',
      title: 'Links',
      type: 'array',
      description: 'Social and contact links to display in this section.',
      of: [
        defineArrayMember({
          name: 'contactLinkReference',
          type: 'reference',
          to: [{type: 'contactLink'}],
        }),
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      header: 'header',
      links: 'links',
    },
    prepare({header, links}) {
      const count = Array.isArray(links) ? links.length : 0

      return {
        title: header || 'Communication links section',
        subtitle: `${count} link${count === 1 ? '' : 's'}`,
      }
    },
  },
})
