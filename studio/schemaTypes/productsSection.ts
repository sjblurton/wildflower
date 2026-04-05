import {defineArrayMember, defineField, defineType} from 'sanity'
import {colourOptions, sectionBackgroundColourOptions} from './colourOptions'

export const productsSectionType = defineType({
	name: 'productsSection',
	title: 'Products section',
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
			name: 'title',
			title: 'Section title',
			type: 'string',
		}),
		defineField({
			name: 'products',
			title: 'Products',
			type: 'array',
			of: [defineArrayMember({type: 'productCard'})],
			validation: (Rule) => Rule.required().min(1),
		}),
	],
	preview: {
		select: {
			title: 'title',
			products: 'products',
		},
		prepare({title, products}) {
			const count = Array.isArray(products) ? products.length : 0

			return {
				title: title || 'Products section',
				subtitle: `${count} product${count === 1 ? '' : 's'}`,
			}
		},
	},
})