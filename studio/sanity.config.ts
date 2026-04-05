import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

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
            S.listItem()
              .title('Site settings')
              .id('siteSettings')
              .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
            ...S.documentTypeListItems().filter((item) => item.getId() !== 'siteSettings'),
          ]),
    }),
    visionTool(),
  ],

  document: {
    newDocumentOptions: (previous, {creationContext}) => {
      if (creationContext.type === 'global') {
        return previous.filter((templateItem) => templateItem.templateId !== 'siteSettings')
      }

      return previous
    },
  },

  schema: {
    types: schemaTypes,
  },
})
