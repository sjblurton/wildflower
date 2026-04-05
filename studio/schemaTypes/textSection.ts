import {defineArrayMember, defineField, defineType} from 'sanity'

export const textSectionType = defineType({
	name: 'textSection',
	title: 'Text section',
	type: 'object',
	fields: [
		defineField({
			name: 'header',
			title: 'Header',
			type: 'string',
            description: 'Optional header for the text section',
		}),
		defineField({
			name: 'items',
			title: 'Text items',
			type: 'array',
			of: [
				defineArrayMember({
					type: 'block',
				}),
			],
			validation: (Rule) => Rule.required().min(1).max(2),
		}),
		defineField({
			name: 'cta',
			title: 'CTA',
			type: 'object',
			fields: [
				defineField({
					name: 'label',
					title: 'Button label',
					type: 'string',
                    description: 'Label for the CTA button',
				}),
				defineField({
					name: 'targetPage',
					title: 'Target page',
					type: 'reference',
					to: [{type: 'page'}],
                    description: 'Page to navigate to when the CTA button is clicked',
				}),
			],
			validation: (Rule) =>
				Rule.custom((value) => {
					if (!value) {
						return true
					}

					const hasLabel = Boolean(value.label)
					const hasTarget = Boolean(value.targetPage?._ref)

					if (hasLabel === hasTarget) {
						return true
					}

					return 'CTA must include both a button label and a target page'
				}),
		}),
	],
	preview: {
		select: {
			header: 'header',
			items: 'items',
			ctaLabel: 'cta.label',
			ctaTarget: 'cta.targetPage._ref',
		},
		prepare({header, items, ctaLabel, ctaTarget}) {
			const count = Array.isArray(items) ? items.length : 0
			const ctaState = ctaLabel && ctaTarget ? 'CTA set' : 'No CTA'

			return {
				title: header || 'Text section',
				subtitle: `${count} text item${count === 1 ? '' : 's'} • ${ctaState}`,
			}
		},
	},
})