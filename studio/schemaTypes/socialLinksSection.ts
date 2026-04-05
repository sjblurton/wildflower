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
			description: 'Social links to display in this section.',
			of: [defineArrayMember({type: 'reference', to: [{type: 'socialLink'}]})],
			validation: (Rule) => Rule.required().min(1),
		}),
	],
	preview: {
		select: {
			header: 'header',
			socialSettingsTitle: 'socialSettings.title',
			links: 'links',
		},
		prepare({header, socialSettingsTitle, links}) {
			const count = Array.isArray(links) ? links.length : 0
			const source = socialSettingsTitle
				? `Set: ${socialSettingsTitle}`
				: `${count} link${count === 1 ? '' : 's'}`
			return {
				title: header || 'Social links section',
				subtitle: source,
			}
		},
	},
})