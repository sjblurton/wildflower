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
			name: 'socialSettings',
			title: 'Social settings set',
			type: 'reference',
			to: [{type: 'socialSettings'}],
			description: 'Select a saved social settings set to render here.',
		}),
		defineField({
			name: 'links',
			title: 'Social links',
			type: 'array',
			description: 'Optional inline links. Leave empty when using a social settings set.',
			of: [defineArrayMember({type: 'socialLink'})],
			validation: (Rule) => Rule.min(1),
		}),
	],
	validation: (Rule) =>
		Rule.custom((value) => {
			const section = value as
				| {
					socialSettings?: {_ref?: string}
					links?: unknown[]
				  }
				| undefined

			if (!section) {
				return true
			}

			const hasSettings = Boolean(section.socialSettings?._ref)
			const hasLinks = Array.isArray(section.links) && section.links.length > 0

			if (!hasSettings && !hasLinks) {
				return 'Choose a social settings set or add at least one inline social link'
			}

			if (hasSettings && hasLinks) {
				return 'Use either a social settings set or inline social links, not both'
			}

			return true
		}),
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