import React from 'react';
import S from '@sanity/desk-tool/structure-builder';

// build a custom sidebar

export default function Sidebar() {
  return S.list()
    .title(`Slick's Slices`)
    .items([
      // Create a new sub-item
      S.listItem()
        .title('Home Page')
        .icon(() => <strong>yer</strong>)
        .child(
          S.editor()
            .schemaType('storeSettings')
            // Make new document ID to avoid random string of numbers
            .documentId('downtown')
        ),
      // Add the rest of our document items
      ...S.documentTypeListItems().filter(
        (item) => item.getId() !== 'storeSettings'
      ),
    ]);
}
