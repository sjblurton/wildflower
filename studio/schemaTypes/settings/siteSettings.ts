import {defineField, defineType} from 'sanity'
import {daisyThemeOptions} from '../tokens/colourOptions'

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  groups: [
    {
      name: 'seo',
      title: 'SEO',
    },
    {
      name: 'styling',
      title: 'Styling',
    },
  ],
  fields: [
    defineField({
      name: 'siteTitle',
      title: 'Site title',
      type: 'string',
      description:
        'The default site name used across SEO and sharing when a page does not provide its own value.',
      validation: (Rule) => Rule.required(),
      group: 'seo',
    }),
    defineField({
      name: 'siteUrl',
      title: 'Site URL',
      type: 'url',
      description:
        'The main website URL, for example https://example.com. This is used for canonical URLs and sharing metadata.',
      validation: (Rule) => Rule.required().uri({scheme: ['http', 'https']}),
      group: 'seo',
    }),
    defineField({
      name: 'defaultMetaTitle',
      title: 'Default meta title',
      type: 'string',
      description:
        'Fallback browser and search result title when a page-specific SEO title is not set.',
      validation: (Rule) => Rule.max(60).warning('Keep meta titles under 60 characters'),
      group: 'seo',
    }),
    defineField({
      name: 'defaultMetaDescription',
      title: 'Default meta description',
      type: 'text',
      rows: 3,
      description:
        'Fallback description used by search engines and social previews when a page-specific description is not set.',
      validation: (Rule) => Rule.max(160).warning('Keep meta descriptions under 160 characters'),
      group: 'seo',
    }),
    defineField({
      name: 'defaultOgImage',
      title: 'Default Open Graph image',
      type: 'image',
      description:
        'Fallback social sharing image used when a page does not provide its own. This appears in link previews on places like iMessage, Slack, Facebook, and Discord. Recommended size is 1200x630 pixels.',
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
      group: 'seo',
    }),
    defineField({
      name: 'globalWebIndex',
      title: 'Index this page',
      type: 'boolean',
      description:
        'Global default for whether search engines should index pages. Individual pages can override this setting.',
      group: 'seo',
    }),
    defineField({
      name: 'theme',
      title: 'Theme',
      type: 'string',
      description:
        'Choose the global DaisyUI theme for the website. Text and surface contrast are handled automatically by the selected theme.',
      options: {
        list: daisyThemeOptions,
        layout: 'radio',
      },
      initialValue: 'lofi',
      validation: (Rule) => Rule.required(),
      group: 'styling',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Site settings',
        subtitle: 'Global SEO defaults',
      }
    },
  },
})
