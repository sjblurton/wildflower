import {defineField, defineType} from 'sanity'

export const ctaType = defineType({
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
          {title: 'Contact link', value: 'contact'},
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

      if (hasLabel && hasAnyTarget) {
        return true
      }

      return 'CTA must include both a button label and a valid target'
    }),
})
