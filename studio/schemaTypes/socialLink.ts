import {defineField, defineType} from 'sanity'

export const socialLinkType = defineType({
	name: 'socialLink',
	title: 'Social link',
	type: 'object',
	fields: [
		defineField({
			name: 'platform',
			title: 'Platform',
			type: 'string',
			description: 'Select the social network. The website can use this value to show the correct logo automatically.',
			options: {
				list: [
					{title: 'Instagram', value: 'instagram'},
					{title: 'TikTok', value: 'tiktok'},
					{title: 'Twitter/X', value: 'x'},
					{title: 'Facebook', value: 'facebook'},
					{title: 'LinkedIn', value: 'linkedin'},
					{title: 'YouTube', value: 'youtube'},
				],
			},
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'url',
			title: 'Profile URL',
			type: 'url',
			description: 'Full URL for this social profile, for example https://instagram.com/yourname.',
			validation: (Rule) => Rule.required().uri({scheme: ['http', 'https']}),
		}),
		defineField({
			name: 'label',
			title: 'Label',
			type: 'string',
			description: 'Optional accessible label or custom link text.',
		}),
        defineField({
            name: "handle",
            title: "Handle",
            type: "string",
            description: "Optional social media handle, for example @yourname. This can be used by the website to display the handle next to the link.",
        }),
        defineField({
            name: 'icon',
            title: 'Icon',
            type: 'image',
            description: 'Optional custom icon for this social link. If not set, the website can use the platform value to show a default logo.',
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
        }),
	],
	preview: {
		select: {
			platform: 'platform',
			url: 'url',
			media: 'icon',
		},
		prepare({platform, url, media}) {
			return {
				title: platform ? `Social: ${platform}` : 'Social link',
				subtitle: url || 'No URL set',
				media,
			}
		},
	},
})