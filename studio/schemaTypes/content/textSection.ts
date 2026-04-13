import {defineArrayMember, defineField, defineType} from 'sanity'
import {colourOptions} from '../tokens/colourOptions'

export const textSectionType = defineType({
  name: 'textSection',
  title: 'Text section',
  type: 'object',

  fields: [
    defineField({
      name: 'header',
      title: 'Header',
      type: 'string',
      description: 'Optional header for the text section',
    }),
    defineField({
      name: 'items',
      title: 'Text items',
      type: 'array',
      description: 'Add as many text items as needed. Each item can contain up to 250 characters.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'textItem',
          title: 'Text item',
          fields: [
            defineField({
              name: 'body',
              title: 'Body',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'block',
                }),
              ],
              validation: (Rule) =>
                Rule.required().custom((value) => {
                  const blocks = Array.isArray(value)
                    ? (value as Array<{children?: Array<{_type?: string; text?: string}>}>)
                    : []

                  const totalCharacters = blocks.reduce((blockCount, block) => {
                    const children = Array.isArray(block.children) ? block.children : []

                    const textInBlock = children.reduce((childCount, child) => {
                      if (child?._type !== 'span') {
                        return childCount
                      }

                      return childCount + (child.text || '').length
                    }, 0)

                    return blockCount + textInBlock
                  }, 0)

                  if (totalCharacters <= 250) {
                    return true
                  }

                  return 'Each text item can contain a maximum of 250 characters'
                }),
            }),
          ],
        }),
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'ctaButtons',
      title: 'CTA',
      type: 'array',
      description: 'Optional call to action for this text section.',
      of: [
        defineArrayMember({
          type: 'cta',
        }),
      ],
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
      header: 'header',
      items: 'items',
      ctaButtons: 'ctaButtons',
    },
    prepare({header, items, ctaButtons}) {
      const count = items?.length ?? 0
      const ctaCount = ctaButtons?.length ?? 0

      return {
        title: header || 'Text section',
        subtitle: `${count} text item${count === 1 ? '' : 's'} • ${ctaCount} CTA${ctaCount === 1 ? '' : 's'}`,
      }
    },
  },
})
