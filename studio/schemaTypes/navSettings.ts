import {defineArrayMember, defineField, defineType} from 'sanity'
import {backgroundColourOptions, colourOptions, textColourOptions} from './colourOptions'

export const navSettingsType = defineType({
	name: 'navSettings',
	title: 'Navigation settings',
	type: 'document',
	fields: [
		defineField({
			name: 'title',
			title: 'Title',
			type: 'string',
			hidden: true,
			initialValue: 'Navigation settings',
		}),
		defineField({
			name: 'navBackgroundColor',
			title: 'Nav background colour',
			type: 'string',
			description: 'Background colour of the navigation bar.',
			options: {
				list: backgroundColourOptions,
				layout: 'radio',
			},
			initialValue: colourOptions.white.value,
		}),
		defineField({
			name: 'navTextColor',
			title: 'Nav text colour',
			type: 'string',
			description: 'Colour of the navigation links and text.',
			options: {
				list: textColourOptions,
				layout: 'radio',
			},
			initialValue: colourOptions.black.value,
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
					description: 'Describe the logo image for accessibility. This text is not publicly visible but is important for screen readers.',
				}),
			],
		}),
		defineField({
			name: 'navSiteName',
			title: 'Nav site name',
			type: 'string',
			description: 'Optional text shown alongside or instead of the nav logo.',
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
