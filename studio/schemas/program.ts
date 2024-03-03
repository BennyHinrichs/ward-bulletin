import {defineField, defineType} from 'sanity';

export default defineType({
  name: 'program',
  title: 'Program',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Ward Name',
      type: 'string',
      placeholder: '11th Ward',
    }),
    defineField({
      name: 'programUrl',
      title: 'External Program URL',
      type: 'url',
      placeholder: 'https://myprogram.com',
      description:
        'If this is present, the Program link will direct to here instead of the program using the data below',
    }),
    defineField({
      name: 'condutor',
      title: 'Conducting',
      type: 'string',
    }),
    defineField({
      name: 'prayer1',
      title: 'Opening Prayer',
      type: 'string',
    }),
    defineField({
      name: 'song1',
      title: 'Opening Hymn',
      type: 'number',
      description: 'Hymn number in the green songbook',
      validation: (Rule) => Rule.min(1).max(341),
    }),
    defineField({
      name: 'preSacramentItems',
      title: 'Pre-sacrament Items',
      type: 'array',
      of: [
        {
          name: 'babyBlessing',
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Name',
              type: 'string',
            },
          ],
        },
        {
          name: 'confirmation',
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Name',
              type: 'string',
            },
          ],
        },
        {
          name: 'other',
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Name',
              type: 'string',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'song2',
      title: 'Sacrament Hymn',
      type: 'number',
      description: 'Hymn number in the green songbook',
      validation: (Rule) => Rule.min(1).max(341),
    }),
    defineField({
      name: 'includeSacrament',
      title: 'Include Sacrament',
      type: 'boolean',
      initialValue: true,
      description: 'Uncheck for conferences',
    }),
    defineField({
      name: 'programItems',
      title: 'Program Items',
      type: 'array',
      of: [
        {
          name: 'speaker',
          type: 'object',
          fields: [
            {
              name: 'speaker',
              title: 'Speaker',
              type: 'string',
            },
            {
              name: 'subtitle',
              title: 'Additional Info',
              type: 'string',
              description: 'Any text you want displayed below the name',
            },
          ],
        },
        {
          name: 'musicalNumber',
          type: 'object',
          fields: [
            {
              name: 'musicalNumberTitle',
              title: 'Musical Number',
              type: 'string',
            },
            {
              name: 'musicalNumberPerformer',
              title: 'Performed By',
              type: 'string',
            },
          ],
        },
        {
          name: 'hymn',
          type: 'object',
          fields: [
            {
              name: 'number',
              title: 'Closing Hymn',
              type: 'number',
              description: 'Hymn number in the green songbook',
              validation: (Rule) => Rule.min(1).max(341),
            },
          ],
        },
        {
          name: 'other',
          type: 'object',
          fields: [
            {
              name: 'other',
              title: 'Other',
              type: 'string',
            },
            {
              name: 'subtitle',
              title: 'Additional Info',
              type: 'string',
              description: 'Any text you want displayed below the main text',
            },
          ],
        },
      ],
      description: 'Speakers and music',
    }),
    defineField({
      name: 'song3',
      title: 'Closing Hymn',
      type: 'number',
      description: 'Hymn number in the green songbook',
      validation: (Rule) => Rule.min(1).max(341),
    }),
    defineField({
      name: 'prayer2',
      title: 'Closing Prayer',
      type: 'string',
    }),
  ],
});
