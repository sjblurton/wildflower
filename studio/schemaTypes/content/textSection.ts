import {defineArrayMember, defineField, defineType} from 'sanity'
import {colourOptions, sectionBackgroundColourOptions} from '../tokens/colourOptions'

export const textSectionType = defineType({
  name: 'textSection',
  title: 'Text section',
  type: 'object',
  groups: [
    {
      name: 'content',
      title: 'Content',
      default: true,
    },
    {
      name: 'styling',
      title: 'Styling',
    },
  ],
  fields: [
    defineField({
      name: 'background',
      title: 'Background colour',
      type: 'string',
      group: 'styling',
      description:
        'Optional section background style. Text contrast is handled automatically by the active theme.',
      options: {
        list: sectionBackgroundColourOptions,
        layout: 'radio',
      },
      initialValue: colourOptions.transparent.value,
    }),
    defineField({
      name: 'header',
      title: 'Header',
      type: 'string',
      group: 'content',
      description: 'Optional header for the text section',
    }),
    defineField({
      name: 'items',
      title: 'Text items',
      type: 'array',
      group: 'content',
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
      group: 'content',
      of: [
        defineArrayMember({
          type: 'cta',
        }),
      ],
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
