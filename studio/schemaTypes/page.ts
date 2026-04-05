import {defineField, defineType} from 'sanity'

export const pageType = defineType({
	name: 'page',
	title: 'Page',
	type: 'document',
	groups: [
		{name: 'content', title: 'Content', default: true},
		{name: 'seo', title: 'SEO'},
	],
	fields: [
		defineField({
			name: 'title',
			title: 'Title',
			type: 'string',
			group: 'content',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'slug',
			title: 'Slug',
			type: 'slug',
			group: 'content',
			options: {
				source: 'title',
				maxLength: 96,
			},
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'heroImage',
			title: 'Hero image',
			type: 'image',
			group: 'content',
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
			name: 'seo',
			title: 'SEO',
			type: 'object',
			group: 'seo',
			options: {
				collapsible: true,
				collapsed: false,
			},
			fields: [
				defineField({
					name: 'metaTitle',
					title: 'Meta title',
					type: 'string',
					description: 'Overrides the page title in the browser and search results.',
					validation: (Rule) => Rule.max(60).warning('Keep meta titles under 60 characters'),
				}),
				defineField({
					name: 'metaDescription',
					title: 'Meta description',
					type: 'text',
					rows: 3,
					validation: (Rule) =>
						Rule.max(160).warning('Keep meta descriptions under 160 characters'),
				}),
				defineField({
					name: 'ogImage',
					title: 'Open Graph image',
					type: 'image',
					options: {
						hotspot: true,
					},
					fields: [
						defineField({
							name: 'alt',
							title: 'Alt text',
							type: 'string',
						}),
					],
				}),
			],
		}),
	],
	preview: {
		select: {
			title: 'title',
			media: 'heroImage',
			slug: 'slug.current',
		},
		prepare({title, media, slug}) {
			return {
				title,
				subtitle: slug ? `/${slug}` : 'No slug set',
				media,
			}
		},
	},
})
