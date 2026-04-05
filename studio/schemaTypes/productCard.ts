import {defineField, defineType} from 'sanity'

export const productCardType = defineType({
	name: 'productCard',
	title: 'Product card',
	type: 'object',
	fields: [
		defineField({
			name: 'image',
			title: 'Image',
			type: 'image',
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
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'title',
			title: 'Title',
			type: 'string',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'description',
			title: 'Description',
			type: 'text',
			rows: 4,
			validation: (Rule) => Rule.required(),
		}),
	],
	preview: {
		select: {
			title: 'title',
			media: 'image',
		},
		prepare({title, media}) {
			return {
				title: title || 'Untitled product card',
				subtitle: 'Product card',
				media,
			}
		},
	},
})