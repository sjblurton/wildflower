import {defineArrayMember, defineField, defineType} from 'sanity'

export const navSettingsType = defineType({
  name: 'navSettings',
  title: 'Navigation settings',
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
      initialValue: 'Navigation settings',
      group: 'content',
    }),
    defineField({
      name: 'navLogo',
      title: 'Nav logo',
      type: 'image',
      description: 'Optional logo shown in the navigation area.',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
          validation: (Rule) => Rule.required(),
          description:
            'Describe the logo image for accessibility. This text is not publicly visible but is important for screen readers.',
        }),
      ],
      group: 'logo',
    }),
    defineField({
      name: 'navSiteName',
      title: 'Nav site name',
      type: 'string',
      description: 'Optional text shown alongside or instead of the nav logo.',
      group: 'content',
    }),
    defineField({
      name: 'navLinks',
      title: 'Nav links',
      type: 'array',
      description: 'Links shown in the navigation bar.',
      validation: (Rule) => [
        Rule.required(),
        Rule.min(1).error('Please add at least one navigation link.'),
      ],
      of: [
        defineArrayMember({
          type: 'object',
          name: 'navLink',
          title: 'Nav link',
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
  ],
  preview: {
    select: {
      title: 'title',
      links: 'navLinks',
    },
    prepare({title, links}) {
      const count = Array.isArray(links) ? links.length : 0
      return {
        title: title || 'Navigation settings',
        subtitle: `${count} nav link${count === 1 ? '' : 's'}`,
      }
    },
  },
})
