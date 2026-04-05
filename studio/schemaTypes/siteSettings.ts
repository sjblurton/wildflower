import { defineField, defineType} from 'sanity'
import {backgroundColourOptions, colourOptions, textColourOptions} from './colourOptions'

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
			description: 'The default site name used across SEO and sharing when a page does not provide its own value.',
			validation: (Rule) => Rule.required(),
			group: 'seo',
		}),
		defineField({
			name: 'siteUrl',
			title: 'Site URL',
			type: 'url',
			description: 'The main website URL, for example https://example.com. This is used for canonical URLs and sharing metadata.',
			validation: (Rule) => Rule.required().uri({scheme: ['http', 'https']}),
			group: 'seo',
		}),
		defineField({
			name: 'defaultMetaTitle',
			title: 'Default meta title',
			type: 'string',
			description: 'Fallback browser and search result title when a page-specific SEO title is not set.',
			validation: (Rule) => Rule.max(60).warning('Keep meta titles under 60 characters'),
			group: 'seo',
		}),
		defineField({
			name: 'defaultMetaDescription',
			title: 'Default meta description',
			type: 'text',
			rows: 3,
			description: 'Fallback description used by search engines and social previews when a page-specific description is not set.',
			validation: (Rule) =>
				Rule.max(160).warning('Keep meta descriptions under 160 characters'),
			group: 'seo',
		}),
		defineField({
			name: 'defaultOgImage',
			title: 'Default Open Graph image',
			type: 'image',
			description: 'Fallback social sharing image used when a page does not provide its own. This appears in link previews on places like iMessage, Slack, Facebook, and Discord. Recommended size is 1200x630 pixels.',
			options: {
				hotspot: true,
			},
			fields: [
				defineField({
					name: 'alt',
					title: 'Alt text',
					type: 'string',
					description: 'Describe the logo image for accessibility. This text is not publicly visible but is important for screen readers.',
					validation: (Rule) => Rule.required(),
				}),
			],
			group: 'seo',
		}),
		defineField({
			name: 'noIndexByDefault',
			title: 'Noindex by default',
			type: 'boolean',
			description: 'Enable this if pages should default to not being indexed by search engines unless you explicitly override that behavior later.',
			initialValue: false,
			group: 'seo',
		}),
		defineField({
			name: 'defaultTextColor',
			title: 'Default text colour',
			type: 'string',
			description: 'Site-wide default text colour. Applied when a section does not specify its own.',
			options: {
				list: textColourOptions,
				layout: 'radio',
			},
			initialValue: colourOptions.black.value,
			group: 'styling',
		}),
		defineField({
			name: 'defaultBackgroundColor',
			title: 'Default background colour',
			type: 'string',
			description: 'Site-wide default background colour. Applied when a section does not specify its own.',
			options: {
				list: backgroundColourOptions,
				layout: 'radio',
			},
			initialValue: colourOptions.white.value,
			group: 'styling',
		}),
		defineField({
			name: 'primaryColor',
			title: 'Primary colour',
			type: 'colorToken',
			description: 'Optional main brand colour. If not set, primary falls back to black.',
			group: 'styling',
		}),
		defineField({
			name: 'secondaryColor',
			title: 'Secondary colour',
			type: 'colorToken',
			description: 'Optional accent brand colour. If not set, secondary falls back to white.',
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
