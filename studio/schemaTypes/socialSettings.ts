import {defineField, defineType} from 'sanity'

export const socialSettingsType = defineType({
	name: 'socialSettings',
	title: 'Social settings',
	type: 'document',
	fields: [
		defineField({
			name: 'title',
			title: 'Title',
			type: 'string',
			initialValue: 'Social settings',
            hidden: true,
		}),
		defineField({
			name: 'links',
			title: 'Social links',
			type: 'array',
			of: [{type: 'socialLink'}],
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
				title: title || 'Social settings',
				subtitle: `${count} social link${count === 1 ? '' : 's'}`,
			}
		},
	},
})
