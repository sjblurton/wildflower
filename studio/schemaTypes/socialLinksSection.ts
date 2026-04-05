import {defineArrayMember, defineField, defineType} from 'sanity'
import {colourOptions, sectionBackgroundColourOptions} from './colourOptions'

export const socialLinksSectionType = defineType({
	name: 'socialLinksSection',
	title: 'Social links section',
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
			description: 'Optional heading shown above social links.',
		}),
		defineField({
			name: 'links',
			title: 'Social links',
			type: 'array',
			of: [defineArrayMember({type: 'socialLink'})],
			validation: (Rule) => Rule.required().min(1),
		}),
	],
	preview: {
		select: {
			header: 'header',
			links: 'links',
		},
		prepare({header, links}) {
			const count = Array.isArray(links) ? links.length : 0
			return {
				title: header || 'Social links section',
				subtitle: `${count} link${count === 1 ? '' : 's'}`,
			}
		},
	},
})