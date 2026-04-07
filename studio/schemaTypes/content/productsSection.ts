import {defineArrayMember, defineField, defineType} from 'sanity'
import {colourOptions, sectionBackgroundColourOptions} from '../tokens/colourOptions'

export const productsSectionType = defineType({
  name: 'productsSection',
  title: 'Products section',
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
      name: 'title',
      title: 'Section title',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'products',
      title: 'Products',
      type: 'array',
      group: 'content',
      of: [defineArrayMember({type: 'productCard'})],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      products: 'products',
    },
    prepare({title, products}) {
      const count = Array.isArray(products) ? products.length : 0

      return {
        title: title || 'Products section',
        subtitle: `${count} product${count === 1 ? '' : 's'}`,
      }
    },
  },
})
