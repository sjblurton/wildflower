import {defineArrayMember, defineField, defineType} from 'sanity'

export const siteSettingsType = defineType({
	name: 'siteSettings',
	title: 'Site settings',
	type: 'document',
	fields: [
		defineField({
			name: 'siteTitle',
			title: 'Site title',
			type: 'string',
			description: 'The default site name used across SEO and sharing when a page does not provide its own value.',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'siteUrl',
			title: 'Site URL',
			type: 'url',
			description: 'The main website URL, for example https://example.com. This is used for canonical URLs and sharing metadata.',
			validation: (Rule) => Rule.required().uri({scheme: ['http', 'https']}),
		}),
		defineField({
			name: 'defaultMetaTitle',
			title: 'Default meta title',
			type: 'string',
			description: 'Fallback browser and search result title when a page-specific SEO title is not set.',
			validation: (Rule) => Rule.max(60).warning('Keep meta titles under 60 characters'),
		}),
		defineField({
			name: 'defaultMetaDescription',
			title: 'Default meta description',
			type: 'text',
			rows: 3,
			description: 'Fallback description used by search engines and social previews when a page-specific description is not set.',
			validation: (Rule) =>
				Rule.max(160).warning('Keep meta descriptions under 160 characters'),
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
					validation: (Rule) => Rule.required(),
				}),
			],
		}),
		defineField({
			name: 'socialLinks',
			title: 'Social links',
			type: 'array',
			description: 'Global social links, typically used in the footer. Add one or many as needed.',
			of: [{type: 'socialLink'}],
		}),
		defineField({
			name: 'defaultTextColor',
			title: 'Default text colour',
			type: 'string',
			description: 'Site-wide default text colour. Applied when a section does not specify its own.',
			options: {
				list: [
					{title: 'Black', value: 'black'},
					{title: 'White', value: 'white'},
					{title: 'Primary', value: 'primary'},
					{title: 'Secondary', value: 'secondary'},
				],
				layout: 'radio',
			},
			initialValue: 'black',
		}),
		defineField({
			name: 'defaultBackgroundColor',
			title: 'Default background colour',
			type: 'string',
			description: 'Site-wide default background colour. Applied when a section does not specify its own.',
			options: {
				list: [
					{title: 'White', value: 'white'},
					{title: 'Black', value: 'black'},
					{title: 'Primary', value: 'primary'},
					{title: 'Secondary', value: 'secondary'},
				],
				layout: 'radio',
			},
			initialValue: 'white',
		}),
		defineField({
			name: 'primaryColor',
			title: 'Primary colour',
			type: 'colorToken',
			description: 'Optional main brand colour. If not set, primary falls back to black.',
		}),
		defineField({
			name: 'secondaryColor',
			title: 'Secondary colour',
			type: 'colorToken',
			description: 'Optional accent brand colour. If not set, secondary falls back to white.',
		}),
		defineField({
			name: 'navBackgroundColor',
			title: 'Nav background colour',
			type: 'string',
			description: 'Background colour of the navigation bar.',
			options: {
				list: [
					{title: 'White', value: 'white'},
					{title: 'Black', value: 'black'},
					{title: 'Primary', value: 'primary'},
					{title: 'Secondary', value: 'secondary'},
				],
				layout: 'radio',
			},
			initialValue: 'white',
		}),
		defineField({
			name: 'navTextColor',
			title: 'Nav text colour',
			type: 'string',
			description: 'Colour of the navigation links and text.',
			options: {
				list: [
					{title: 'White', value: 'white'},
					{title: 'Black', value: 'black'},
					{title: 'Primary', value: 'primary'},
					{title: 'Secondary', value: 'secondary'},
				],
				layout: 'radio',
			},
			initialValue: 'black',
		}),
		defineField({
			name: 'navLinks',
			title: 'Nav links',
			type: 'array',
			description: 'Links shown in the navigation bar.',
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
								subtitle: pageTitle ? `→ ${pageTitle}${slug ? ` (/${slug})` : ''}` : 'No page selected',
							}
						},
					},
				}),
			],
		}),
		defineField({
			name: 'noIndexByDefault',
			title: 'Noindex by default',
			type: 'boolean',
			description: 'Enable this if pages should default to not being indexed by search engines unless you explicitly override that behavior later.',
			initialValue: false,
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