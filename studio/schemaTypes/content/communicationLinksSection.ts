import {defineArrayMember, defineField, defineType} from 'sanity'
import {colourOptions, sectionBackgroundColourOptions} from '../tokens/colourOptions'

export const communicationLinksSectionType = defineType({
  name: 'communicationLinksSection',
  title: 'Communication links section',
  type: 'object',
  groups: [
    {
      name: 'content',
      title: 'Content',
      default: true,
    },
    {
      name: 'style',
      title: 'Style',
    },
  ],
  fields: [
    defineField({
      name: 'background',
      title: 'Background colour',
      type: 'string',
      description:
        'Optional section background style. Text contrast is handled automatically by the active theme.',
      options: {
        list: sectionBackgroundColourOptions,
        layout: 'radio',
      },
      initialValue: colourOptions.transparent.value,
      group: 'style',
    }),
    defineField({
      name: 'header',
      title: 'Header',
      type: 'string',
      description: 'Optional heading shown above social links.',
      group: 'content',
    }),
    defineField({
      name: 'links',
      title: 'Links',
      type: 'array',
      description: 'Social and contact links to display in this section.',
      group: 'content',
      of: [
        defineArrayMember({
          name: 'contactLinkReference',
          type: 'reference',
          to: [{type: 'contactLink'}],
        }),
        defineArrayMember({
          name: 'pageLinkReference',
          type: 'reference',
          to: [{type: 'page'}],
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
