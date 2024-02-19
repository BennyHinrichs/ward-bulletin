import { createClient } from '@sanity/client/stega';
import { projectId, dataset, studioUrl } from './projectDetails';

// Do not import this into client-side components unless lazy-loaded
export const client = createClient({
  projectId,
  dataset,
  useCdn: true,
  apiVersion: '2023-03-20',
  stega: {
    // I took out all the Stega/visual editing stuff because I don't care about it
    // if you want to add it back in, you have to put SANITY_STUDIO_STEGA_ENABLED="true" in your env files
    // plus download @sanity/visual-editing and some associated setup
    enabled: false,
    studioUrl,
  },
});
