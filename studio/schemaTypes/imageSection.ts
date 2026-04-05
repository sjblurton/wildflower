import {defineField, defineType} from 'sanity'

export const imageSectionType = defineType({
	name: 'imageSection',
	title: 'Image section',
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
					validation: (Rule) => Rule.required(),
				}),
			],
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'overlayTitle',
			title: 'Overlay title',
			type: 'string',
			description: 'Optional title displayed over the image.',
		}),
		defineField({
			name: 'textColor',
			title: 'Text color',
			type: 'string',
			options: {
				list: [
					{title: 'White', value: 'white'},
					{title: 'Black', value: 'black'},
				],
				layout: 'radio',
			},
			initialValue: 'white',
		}),
		defineField({
			name: 'overlayStyle',
			title: 'Overlay style',
			type: 'string',
			options: {
				list: [
					{title: 'None', value: 'none'},
					{title: 'Darken', value: 'darken'},
					{title: 'Lighten', value: 'lighten'},
				],
				layout: 'radio',
			},
			initialValue: 'darken',
		}),
		defineField({
			name: 'overlayOpacity',
			title: 'Overlay opacity',
			type: 'number',
			description: 'Overlay strength from 0 to 80.',
			initialValue: 35,
			validation: (Rule) => Rule.min(0).max(80),
		}),
	],
	preview: {
		select: {
			title: 'overlayTitle',
			media: 'image',
			textColor: 'textColor',
		},
		prepare({title, media, textColor}) {
			return {
				title: title || 'Image section',
				subtitle: `Text: ${textColor || 'white'}`,
				media,
			}
		},
	},
})