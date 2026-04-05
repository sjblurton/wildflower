import {defineArrayMember, defineField, defineType} from 'sanity'

export const socialLinksSectionType = defineType({
	name: 'socialLinksSection',
	title: 'Social links section',
	type: 'object',
	fields: [
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