import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

const singlePageTypes = ['siteSettings', 'contactSettings', 'socialSettings'] as const

const singletonDocuments = {
  siteSettings: {title: 'Site settings', documentId: 'siteSettings'},
  contactSettings: {title: 'Contact settings', documentId: 'contactSettings'},
  socialSettings: {title: 'Social settings', documentId: 'socialSettings'},
} as const

export default defineConfig({
  name: 'default',
  title: 'wildflower',

  projectId: 'rocap12l',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            ...singlePageTypes.map((schemaType) => {
              const config = singletonDocuments[schemaType]
              return S.listItem()
                .title(config.title)
                .id(schemaType)
                .child(S.document().schemaType(schemaType).documentId(config.documentId))
            }),
            ...S.documentTypeListItems().filter(
              (item) => !singlePageTypes.includes(item.getId() as (typeof singlePageTypes)[number]),
            ),
          ]),
    }),
    visionTool(),
  ],

  document: {
    newDocumentOptions: (previous, {creationContext}) => {
      if (creationContext.type === 'global') {
        return previous.filter(
          (templateItem) =>
            !singlePageTypes.includes(
              templateItem.templateId as (typeof singlePageTypes)[number],
            ),
        )
      }

      return previous
    },
  },

  schema: {
    types: schemaTypes,
  },
})
