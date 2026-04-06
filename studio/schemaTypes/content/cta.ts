import {defineField, defineType} from 'sanity'
import {ctaColourOptions} from '../tokens/colourOptions'
import {
  ctaLinkTypeOptions,
  ctaDefaults,
  ctaIconPositionOptions,
  ctaSizeOptions,
  ctaStyleOptions,
  ctaWidthOptions,
  type CtaIconPosition,
  type CtaLinkType,
} from '../tokens/ctaOptions'

export const ctaType = defineType({
  name: 'cta',
  title: 'CTA',
  type: 'object',
  description: 'Call to action button. Can be used on pages or in other sections as needed.',
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
        list: ctaLinkTypeOptions,
        layout: 'radio',
      },
      initialValue: ctaDefaults.linkType,
    }),
    defineField({
      name: 'style',
      title: 'Style',
      type: 'string',
      description: 'Visual style of the button.',
      options: {
        list: ctaStyleOptions,
        layout: 'radio',
      },
      initialValue: ctaDefaults.style,
    }),
    defineField({
      name: 'colour',
      title: 'Colour',
      type: 'string',
      description: 'Semantic DaisyUI colour for the button.',
      options: {
        list: ctaColourOptions,
        layout: 'radio',
      },
      initialValue: ctaDefaults.colour,
    }),
    defineField({
      name: 'size',
      title: 'Size',
      type: 'string',
      description: 'Button size.',
      options: {
        list: ctaSizeOptions,
        layout: 'radio',
      },
      initialValue: ctaDefaults.size,
    }),
    defineField({
      name: 'width',
      title: 'Width',
      type: 'string',
      description: 'How the button should size in the layout.',
      options: {
        list: ctaWidthOptions,
        layout: 'radio',
      },
      initialValue: ctaDefaults.width,
    }),
    defineField({
      name: 'hasIcon',
      title: 'Show icon',
      type: 'boolean',
      description:
        'Enable an icon. If no custom icon is uploaded, the frontend will choose a default icon based on the link type.',
      initialValue: ctaDefaults.hasIcon,
    }),
    defineField({
      name: 'iconPosition',
      title: 'Icon position',
      type: 'string',
      options: {
        list: ctaIconPositionOptions,
        layout: 'radio',
      },
      initialValue: ctaDefaults.iconPosition,
      hidden: ({parent}) => {
        const cta = parent as {hasIcon?: boolean} | undefined
        return !cta?.hasIcon
      },
    }),
    defineField({
      name: 'customIcon',
      title: 'Custom icon',
      type: 'image',
      description:
        'Optional custom icon override. If empty, the frontend will use a default icon based on the link type.',
      options: {
        hotspot: false,
      },
      hidden: ({parent}) => {
        const cta = parent as {hasIcon?: boolean} | undefined
        return !cta?.hasIcon
      },
    }),
    defineField({
      name: 'targetPage',
      title: 'Target page',
      type: 'reference',
      to: [{type: 'page'}],
      description: 'Page to navigate to when the CTA button is clicked',
      hidden: ({parent}) => {
        const cta = parent as {linkType?: CtaLinkType} | undefined
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
        const cta = parent as {linkType?: CtaLinkType} | undefined
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
        const cta = parent as {linkType?: CtaLinkType} | undefined
        return cta?.linkType !== 'contact'
      },
    }),
  ],
  validation: (Rule) =>
    Rule.custom((value) => {
      const cta = value as
        | {
            label?: string
            linkType?: CtaLinkType
            hasIcon?: boolean
            iconPosition?: CtaIconPosition
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

      if (cta.hasIcon && !cta.iconPosition) {
        return 'CTA with an icon must include an icon position'
      }

      if (hasLabel && hasAnyTarget) {
        return true
      }

      return 'CTA must include both a button label and a valid target'
    }),
})
