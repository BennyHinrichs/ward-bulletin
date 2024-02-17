import {defineField, defineType} from 'sanity';

export default defineType({
  name: 'group',
  title: 'Group',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Group Name',
      type: 'string',
      placeholder: 'Elders, Relief Society, Primary, etc.',
    }),
    defineField({
      name: 'path',
      title: 'URL Path',
      type: 'slug',
      description:
        "You shouldn't have to touch this more than once. If you've changed the group name, then generate a new URL path.",
      options: {
        source: 'title',
        slugify: (input) => input.toLowerCase().replace(/\s+/g, '-').slice(0, 200),
      },
    }),
    defineField({
      name: 'theme',
      title: 'Theme',
      type: 'string',
      placeholder: 'Be one',
    }),
    defineField({
      name: 'message',
      title: 'Message',
      type: 'text',
      placeholder: 'Do unto others',
    }),
    defineField({
      name: 'messageSource',
      title: 'Message Source',
      type: 'string',
      placeholder: 'Dieter F. Uchtdorf',
      hidden: ({parent, value}) => !value && !parent?.message,
    }),
    defineField({
      name: 'messageUrl',
      title: 'Message URL',
      description: 'If you would like, you can include a link to the source',
      type: 'url',
      hidden: ({parent, value}) => !value && !parent?.messageSource,
    }),
    defineField({
      name: 'events',
      title: 'Announcements',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'eventTitle',
              title: 'Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'eventDescription',
              title: 'Description',
              type: 'string',
            },
            {
              name: 'eventDate',
              title: 'Date',
              type: 'datetime',
            },
            {
              name: 'eventDateOnly',
              title: 'Date Only',
              type: 'boolean',
              description: "Click this if you don't want to show the time",
            },
            {
              name: 'eventUrl',
              title: 'URL',
              type: 'url',
              description: "Is there a link you'd like to include?",
            },
          ],
        },
      ],
    }),
  ],
});
