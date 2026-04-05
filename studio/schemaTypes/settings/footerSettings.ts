import {defineArrayMember, defineField, defineType} from 'sanity'
import {backgroundColourOptions, colourOptions, textColourOptions} from '../tokens/colourOptions'

export const footerSettingsType = defineType({
  name: 'footerSettings',
  title: 'Footer settings',
  type: 'document',
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
      name: 'title',
      title: 'Title',
      type: 'string',
      hidden: true,
      initialValue: 'Footer settings',
      group: 'content',
    }),
    defineField({
      name: 'footerBackgroundColor',
      title: 'Footer background colour',
      type: 'string',
      description: 'Background colour of the global footer.',
      options: {
        list: backgroundColourOptions,
        layout: 'radio',
      },
      initialValue: colourOptions.black.value,
      group: 'styling',
    }),
    defineField({
      name: 'footerTextColor',
      title: 'Footer text colour',
      type: 'string',
      description: 'Text and link colour used in the global footer.',
      options: {
        list: textColourOptions,
        layout: 'radio',
      },
      initialValue: colourOptions.white.value,
      group: 'styling',
    }),
    defineField({
      name: 'footerLogo',
      title: 'Footer logo',
      type: 'image',
      description: 'Optional logo shown in the footer.',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
          description:
            'Describe the logo image for accessibility. This text is not publicly visible but is important for screen readers.',
          validation: (Rule) => Rule.required(),
        }),
      ],
      group: 'content',
    }),
    defineField({
      name: 'footerSiteName',
      title: 'Footer site name',
      type: 'string',
      description: 'Optional footer brand name text.',
      group: 'content',
    }),
    defineField({
      name: 'footerCopyrightText',
      title: 'Footer copyright text',
      type: 'string',
      description: 'Optional short copyright text, e.g. © Wildflower 2026.',
      group: 'content',
    }),
    defineField({
      name: 'footerNavLinks',
      title: 'Footer nav links',
      type: 'array',
      description: 'Links shown in the footer navigation area.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'footerNavLink',
          title: 'Footer nav link',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'page',
              title: 'Page',
              type: 'reference',
              to: [{type: 'page'}],
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              label: 'label',
              pageTitle: 'page.title',
              slug: 'page.slug.current',
            },
            prepare({label, pageTitle, slug}) {
              return {
                title: label || 'Untitled link',
                subtitle: pageTitle
                  ? `→ ${pageTitle}${slug ? ` (/${slug})` : ''}`
                  : 'No page selected',
              }
            },
          },
        }),
      ],
      group: 'content',
    }),
    defineField({
      name: 'footerSocialLinks',
      title: 'Footer social links',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'socialLink'}]}],
      description: 'Social links to display in the footer.',
      group: 'content',
    }),
    defineField({
      name: 'footerContactLinks',
      title: 'Footer contact links',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'contactLink'}]}],
      description: 'Contact links to display in the footer.',
      group: 'content',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      links: 'footerNavLinks',
    },
    prepare({title, links}) {
      const count = Array.isArray(links) ? links.length : 0
      return {
        title: title || 'Footer settings',
        subtitle: `${count} footer link${count === 1 ? '' : 's'}`,
      }
    },
  },
})
