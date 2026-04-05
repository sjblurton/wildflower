import {defineField, defineType} from 'sanity'

export const contactLinkType = defineType({
	name: 'contactLink',
	title: 'Contact link',
	type: 'object',
	fields: [
		defineField({
			name: 'type',
			title: 'Type',
			type: 'string',
			description: 'Choose the contact action this link should open.',
			options: {
				list: [
					{title: 'Phone call', value: 'phone'},
					{title: 'Email', value: 'email'},
					{title: 'WhatsApp', value: 'whatsapp'},
				],
				layout: 'radio',
			},
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'label',
			title: 'Label',
			type: 'string',
			description: 'Button or link text shown to users.',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'phoneNumber',
			title: 'Phone number',
			type: 'string',
			description: 'Use international format where possible, e.g. +447700900123.',
			hidden: ({parent}) => {
				const item = parent as {type?: string} | undefined
				return item?.type === 'email'
			},
		}),
		defineField({
			name: 'emailAddress',
			title: 'Email address',
			type: 'string',
			description: 'Used for mailto links.',
			hidden: ({parent}) => {
				const item = parent as {type?: string} | undefined
				return item?.type !== 'email'
			},
		}),
		defineField({
			name: 'prefillMessage',
			title: 'WhatsApp prefilled message',
			type: 'string',
			description: 'Optional message text appended to the WhatsApp link.',
			hidden: ({parent}) => {
				const item = parent as {type?: string} | undefined
				return item?.type !== 'whatsapp'
			},
		}),
	],
	validation: (Rule) =>
		Rule.custom((value) => {
			const link = value as
				| {
						type?: string
						phoneNumber?: string
						emailAddress?: string
						prefillMessage?: string
				  }
				| undefined

			if (!link) {
				return true
			}

			const type = link.type
			const phone = (link.phoneNumber || '').trim()
			const email = (link.emailAddress || '').trim()
			const prefillMessage = (link.prefillMessage || '').trim()

			if ((type === 'phone' || type === 'whatsapp') && !phone) {
				return 'Phone number is required for phone and WhatsApp links'
			}

			if (type === 'email' && !email) {
				return 'Email address is required for email links'
			}

			if (type === 'email' && email) {
				const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
				if (!emailPattern.test(email)) {
					return 'Enter a valid email address'
				}
			}

			if (type !== 'email' && email) {
				return 'Email address should only be set when type is Email'
			}

			if (type === 'email' && phone) {
				return 'Phone number should only be set for Phone call or WhatsApp'
			}

			if (type !== 'whatsapp' && prefillMessage) {
				return 'WhatsApp prefilled message can only be set when type is WhatsApp'
			}

			return true
		}),
	preview: {
		select: {
			type: 'type',
			label: 'label',
			phoneNumber: 'phoneNumber',
			emailAddress: 'emailAddress',
		},
		prepare({type, label, phoneNumber, emailAddress}) {
			const value = type === 'email' ? emailAddress : phoneNumber
			return {
				title: label || 'Contact link',
				subtitle: `${type || 'unknown'}${value ? ` • ${value}` : ''}`,
			}
		},
	},
})
