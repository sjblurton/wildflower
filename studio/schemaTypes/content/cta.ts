import {defineArrayMember, defineField, defineType} from 'sanity'
import {ctaColourOptions} from '../tokens/colourOptions'
import {
  ctaDefaults,
  ctaIconPositionOptions,
  ctaSizeOptions,
  ctaStyleOptions,
  ctaWidthOptions,
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
      description: 'Label for the CTA buttons. e.g. "Learn more" or "Buy now".',
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
      name: 'links',
      title: 'Links',
      type: 'array',
      description:
        'Social, contact, and page links to display in this section. Optionally link to multiple destinations if needed, for example a product page and a related video.',
      of: [
        defineArrayMember({
          name: 'contactLinkReference',
          type: 'reference',
          to: [{type: 'contactLink'}],
        }),
        defineArrayMember({
          name: 'pageLinkReference',
          type: 'reference',
          to: [{type: 'page'}],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'label',
      links: 'links',
    },
    prepare({title, links}) {
      const linkCount = links?.length ?? 0
      const titleString = `CTA: ${title ?? `button${links?.length > 1 ? 's' : ''}`}`
      return {
        title: titleString,
        subtitle: `${linkCount} link${linkCount === 1 ? '' : 's'}`,
      }
    },
  },
})
