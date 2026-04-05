import {defineArrayMember, defineField, defineType} from 'sanity'

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
            name: "Header",
            type: "string",
            title: "Header",
            group: "content",
            description: "Optional header for the top of the page.",
        }),

		defineField({
			name: 'content',
			title: 'Content',
			type: 'array',
			group: 'content',
			of: [
				defineArrayMember({type: 'imageSection'}),
				defineArrayMember({type: 'textSection'}),
				defineArrayMember({type: 'productsSection'}),
			],
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
					description: 'Optional page-specific SEO title. Leave empty to use the global default or page title.',
					validation: (Rule) => Rule.max(60).warning('Keep meta titles under 60 characters'),
				}),
				defineField({
					name: 'metaDescription',
					title: 'Meta description',
					type: 'text',
					rows: 3,
					description: 'Optional page-specific description for search engines and social previews. Leave empty to use the global default.',
					validation: (Rule) => Rule.max(160).warning('Keep meta descriptions under 160 characters'),
				}),
				defineField({
					name: 'ogImage',
					title: 'Open Graph image',
					type: 'image',
					description: 'Optional page-specific social sharing image. This is used in link previews on places like iMessage, Slack, Facebook, and Discord. Leave empty to use the global default image.',
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
				}),
			],
		}),
	],
	preview: {
		select: {
			title: 'title',
			media: 'content.0.image',
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
