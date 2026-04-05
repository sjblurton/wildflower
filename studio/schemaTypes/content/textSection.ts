import {defineArrayMember, defineField, defineType} from 'sanity'
import {colourOptions, sectionBackgroundColourOptions} from '../tokens/colourOptions'

export const textSectionType = defineType({
  name: 'textSection',
  title: 'Text section',
  type: 'object',
  fields: [
    defineField({
      name: 'backgroundColor',
      title: 'Background colour',
      type: 'string',
      description: 'Optional background for this section.',
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
      name: 'cta',
      title: 'CTA',
      type: 'cta',
    }),
  ],
  preview: {
    select: {
      header: 'header',
      items: 'items',
      ctaLabel: 'cta.label',
      ctaType: 'cta.linkType',
    },
    prepare({header, items, ctaLabel, ctaType}) {
      const count = Array.isArray(items) ? items.length : 0
      const hasCta = Boolean(ctaLabel)
      const ctaState = hasCta ? 'CTA set' : 'No CTA'
      const ctaTypeLabel = hasCta ? ` (${ctaType || 'page'})` : ''

      return {
        title: header || 'Text section',
        subtitle: `${count} text item${count === 1 ? '' : 's'} • ${ctaState}${ctaTypeLabel}`,
      }
    },
  },
})
