import {defineField, defineType} from 'sanity'

const MUI_HUES = [
  {title: 'Red', value: 'red'},
  {title: 'Pink', value: 'pink'},
  {title: 'Purple', value: 'purple'},
  {title: 'Deep Purple', value: 'deepPurple'},
  {title: 'Indigo', value: 'indigo'},
  {title: 'Blue', value: 'blue'},
  {title: 'Light Blue', value: 'lightBlue'},
  {title: 'Cyan', value: 'cyan'},
  {title: 'Teal', value: 'teal'},
  {title: 'Green', value: 'green'},
  {title: 'Light Green', value: 'lightGreen'},
  {title: 'Lime', value: 'lime'},
  {title: 'Yellow', value: 'yellow'},
  {title: 'Amber', value: 'amber'},
  {title: 'Orange', value: 'orange'},
  {title: 'Deep Orange', value: 'deepOrange'},
  {title: 'Brown', value: 'brown'},
  {title: 'Grey', value: 'grey'},
  {title: 'Blue Grey', value: 'blueGrey'},
]

const MUI_SHADES = [
  {title: '50 (lightest)', value: '50'},
  {title: '100', value: '100'},
  {title: '200', value: '200'},
  {title: '300', value: '300'},
  {title: '400', value: '400'},
  {title: '500 (base)', value: '500'},
  {title: '600', value: '600'},
  {title: '700', value: '700'},
  {title: '800', value: '800'},
  {title: '900 (darkest)', value: '900'},
]

export const colorTokenType = defineType({
  name: 'colorToken',
  title: 'Colour token',
  type: 'object',
  fields: [
    defineField({
      name: 'hue',
      title: 'Hue',
      type: 'string',
      description: 'The colour family, e.g. Blue.',
      options: {
        list: MUI_HUES,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'shade',
      title: 'Shade',
      type: 'string',
      description: 'The lightness/darkness of the hue. 500 is the base tone.',
      options: {
        list: MUI_SHADES,
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      hue: 'hue',
      shade: 'shade',
    },
    prepare({hue, shade}) {
      const hueLabel = MUI_HUES.find((h) => h.value === hue)?.title ?? hue ?? '—'
      const shadeLabel = shade ?? '—'
      return {
        title: `${hueLabel} / ${shadeLabel}`,
      }
    },
  },
})
