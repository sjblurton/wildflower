import {defineArrayMember, defineField, defineType} from 'sanity'
import {directionOptions} from '../tokens/directionOptions'
import {colourOptions} from '../tokens/colourOptions'

export const productsSectionType = defineType({
  name: 'productsSection',
  title: 'Products section',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Section title',
      type: 'string',
    }),
    defineField({
      name: 'alignTitle',
      title: 'Align title',
      type: 'string',
      options: {
        list: [directionOptions.left, directionOptions.right, directionOptions.center],
      },
      initialValue: directionOptions.center.value,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'products',
      title: 'Products',
      type: 'array',
      of: [defineArrayMember({type: 'productCard'})],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'backgroundColour',
      title: 'Background colour',
      type: 'string',
      description:
        'Background colour for this section. The background colour comes from the theme and can be either light or dark. This can be a good way to visually separate this section from others on the page.',
      options: {
        list: [colourOptions.light, colourOptions.dark],
      },
      initialValue: colourOptions.light.value,
      validation: (Rule) => Rule.required(),
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
