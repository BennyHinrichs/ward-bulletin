import {visionTool} from '@sanity/vision';
import {defineConfig} from 'sanity';
import {deskTool} from 'sanity/desk';
import {schemaTypes} from './schemas';
import {presentationTool, DocumentLocationResolver} from 'sanity/presentation';
import {Observable, map} from 'rxjs';

export const projectId = process.env.SANITY_STUDIO_PROJECT_ID!;
export const dataset = process.env.SANITY_STUDIO_DATASET!;

// not sure if I should delete this yet
const locate: DocumentLocationResolver = (params, context) => {
  const {documentStore} = context;

  if (params.type === 'post') {
    // Listen to the query and fetch the draft and published document
    const doc$ = documentStore.listenQuery(`*[_id == $id][0]{slug,title}`, params, {
      perspective: 'previewDrafts',
    }) as Observable<{
      slug: {current: string | null} | null;
      title: string | null;
    } | null>;

    return doc$.pipe(
      map((doc) => {
        if (!doc || !doc.slug?.current) return null;

        return {
          locations: [
            {
              title: doc.title || 'Untitled',
              href: `/post/${doc.slug.current}`,
            },
            {
              title: 'Posts',
              href: `/`,
            },
          ],
        };
      }),
    );
  }

  return null;
};

export default defineConfig({
  name: 'ward-bulletin',
  title: 'Ward Bulletin',
  projectId,
  dataset,
  plugins: [
    deskTool(),
    presentationTool({
      previewUrl: process.env.SANITY_STUDIO_PREVIEW_URL || 'http://localhost:3000',
      locate,
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
});
