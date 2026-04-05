import {defineArrayMember, defineField, defineType} from 'sanity'
import {colourOptions, sectionBackgroundColourOptions} from './colourOptions'

export const textSectionType = defineType({
	name: 'textSection',
	title: 'Text section',
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
            description: 'Optional header for the text section',
		}),
		defineField({
			name: 'items',
			title: 'Text items',
			type: 'array',
			description: 'Add as many text items as needed. Each item can contain up to 250 characters.',
			of: [
				defineArrayMember({
					type: 'object',
					name: 'textItem',
					title: 'Text item',
					fields: [
						defineField({
							name: 'body',
							title: 'Body',
							type: 'array',
							of: [
								defineArrayMember({
									type: 'block',
								}),
							],
							validation: (Rule) =>
								Rule.required().custom((value) => {
									const blocks = Array.isArray(value)
										? (value as Array<{children?: Array<{_type?: string; text?: string}>}>)
										: []

									const totalCharacters = blocks.reduce((blockCount, block) => {
										const children = Array.isArray(block.children) ? block.children : []

										const textInBlock = children.reduce((childCount, child) => {
											if (child?._type !== 'span') {
												return childCount
											}

											return childCount + (child.text || '').length
										}, 0)

										return blockCount + textInBlock
									}, 0)

									if (totalCharacters <= 250) {
										return true
									}

									return 'Each text item can contain a maximum of 250 characters'
								}),
						}),
					],
				}),
			],
			validation: (Rule) => Rule.required().min(1),
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
					name: 'linkType',
					title: 'Link type',
					type: 'string',
					options: {
						list: [
							{title: 'Page', value: 'page'},
							{title: 'Social link', value: 'social'},
                            {title: "Contact link", value: "contact"},
						],
						layout: 'radio',
					},
					initialValue: 'page',
				}),
				defineField({
					name: 'targetPage',
					title: 'Target page',
					type: 'reference',
					to: [{type: 'page'}],
                    description: 'Page to navigate to when the CTA button is clicked',
					hidden: ({parent}) => {
						const cta = parent as {linkType?: string} | undefined
						return cta?.linkType !== 'page'
					},
				}),
				defineField({
					name: 'targetSocialLink',
					title: 'Target social link',
					type: 'reference',
					to: [{type: 'socialLink'}],
					description: 'Social link to open when the CTA button is clicked.',
					hidden: ({parent}) => {
						const cta = parent as {linkType?: string} | undefined
						return cta?.linkType !== 'social'
					},
				}),
				defineField({
					name: 'targetContactLink',
					title: 'Target contact link',
					type: 'reference',
					to: [{type: 'contactLink'}],
					description: 'Contact link to open when the CTA button is clicked.',
					hidden: ({parent}) => {
						const cta = parent as {linkType?: string} | undefined
						return cta?.linkType !== 'contact'
					},
				}),
			],
			validation: (Rule) =>
				Rule.custom((value) => {
					const cta = value as
						| {
								label?: string
								linkType?: 'page' | 'social' | 'contact'
								targetPage?: {_ref?: string}
								targetSocialLink?: {_ref?: string}
								targetContactLink?: {_ref?: string}
						  }
						| undefined

					if (!cta) {
						return true
					}

					const hasLabel = Boolean(cta.label?.trim())
					const hasAnyTarget = Boolean(
						cta.targetPage?._ref || cta.targetSocialLink?._ref || cta.targetContactLink?._ref,
					)
					const hasAnyCtaData = hasLabel || hasAnyTarget

					if (!hasAnyCtaData) {
						return true
					}

					if (!hasLabel) {
						return 'CTA must include a button label'
					}

					const linkType = cta.linkType || 'page'

					if (linkType === 'social' && !Boolean(cta.targetSocialLink?._ref)) {
							return 'Social CTA must include a target social link'

					}

					if (linkType === 'contact' && !Boolean(cta.targetContactLink?._ref)) {
							return 'Contact CTA must include a target contact link'

					}

					const hasTargetPage = Boolean(cta.targetPage?._ref)
					if (linkType === 'page' && !hasTargetPage) {
						return 'Page CTA must include a target page'
					}

					if (hasLabel && hasTargetPage) {
						return true
					}

					return 'CTA must include both a button label and a valid target'
				}),
		}),
	],
	preview: {
		select: {
			header: 'header',
			items: 'items',
			ctaLabel: 'cta.label',
			ctaType: 'cta.linkType',
		},
		prepare({header, items, ctaLabel, ctaType}) {
			const count = Array.isArray(items) ? items.length : 0
			const hasCta = Boolean(ctaLabel)
			const ctaState = hasCta ? 'CTA set' : 'No CTA'
			const ctaTypeLabel = hasCta ? ` (${ctaType || 'page'})` : ''

			return {
				title: header || 'Text section',
				subtitle: `${count} text item${count === 1 ? '' : 's'} • ${ctaState}${ctaTypeLabel}`,
			}
		},
	},
})