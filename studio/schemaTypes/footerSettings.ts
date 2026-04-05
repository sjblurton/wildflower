import {defineArrayMember, defineField, defineType} from 'sanity'
import {backgroundColourOptions, colourOptions, textColourOptions} from './colourOptions'

export const footerSettingsType = defineType({
	name: 'footerSettings',
	title: 'Footer settings',
	type: 'document',
	fields: [
		defineField({
			name: 'title',
			title: 'Title',
			type: 'string',
			hidden: true,
			initialValue: 'Footer settings',
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
					description: 'Describe the logo image for accessibility. This text is not publicly visible but is important for screen readers.',
					validation: (Rule) => Rule.required(),
				}),
			],
		}),
		defineField({
			name: 'footerSiteName',
			title: 'Footer site name',
			type: 'string',
			description: 'Optional footer brand name text.',
		}),
		defineField({
			name: 'footerCopyrightText',
			title: 'Footer copyright text',
			type: 'string',
			description: 'Optional short copyright text, e.g. © Wildflower 2026.',
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
								subtitle: pageTitle ? `→ ${pageTitle}${slug ? ` (/${slug})` : ''}` : 'No page selected',
							}
						},
					},
				}),
			],
		}),
		defineField({
			name: 'footerSocialSettings',
			title: 'Footer social settings',
			type: 'reference',
			to: [{type: 'socialSettings'}],
			description: 'Select which social settings set should be rendered in the footer.',
		}),
		defineField({
			name: 'footerContactSettings',
			title: 'Footer contact settings',
			type: 'reference',
			to: [{type: 'contactSettings'}],
			description: 'Select which contact settings set should be rendered in the footer.',
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
