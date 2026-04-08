import {defineArrayMember, defineField, defineType} from 'sanity'

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
      name: 'logo',
      title: 'Logo',
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
      name: 'footerLogo',
      title: 'Custom Footer logo',
      type: 'image',
      description: 'Optional logo to override the fixed logo shown in the footer.',
      group: 'logo',
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
      validation: (Rule) =>
        Rule.unique().error('Each page can only be linked once in the footer navigation'),
    }),
    defineField({
      name: 'footerContactLinks',
      title: 'Footer contact links',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'contactLink'}]}],
      description: 'Contact links to display in the footer.',
      group: 'content',
      validation: (Rule) =>
        Rule.unique().error('Each contact link can only be used once in the footer'),
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
