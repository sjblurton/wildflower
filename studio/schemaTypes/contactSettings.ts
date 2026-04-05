import {defineField, defineType} from 'sanity'

export const contactSettingsType = defineType({
	name: 'contactSettings',
	title: 'Contact settings',
	type: 'document',
	fields: [
		defineField({
			name: 'title',
			title: 'Title',
			type: 'string',
			hidden: true,
            initialValue: 'Contact settings',
		}),
		defineField({
			name: 'links',
			title: 'Contact links',
			type: 'array',
			of: [{type: 'contactLink'}],
			validation: (Rule) => Rule.required().min(1),
		}),
	],
	preview: {
		select: {
			title: 'title',
			links: 'links',
		},
		prepare({title, links}) {
			const count = Array.isArray(links) ? links.length : 0
			return {
				title: title || 'Contact settings',
				subtitle: `${count} contact link${count === 1 ? '' : 's'}`,
			}
		},
	},
})
