import { PortableText } from '@portabletext/react';
import { type LoaderFunctionArgs } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { useQuery } from '@sanity/react-loader';
import { formatDate, sanitize } from '~/utils/utils';
import { urlFor } from '~/sanity/image';
import { loadQuery } from '~/sanity/loader.server';
import { GROUPS_QUERY } from '~/sanity/queries';
import { Group } from '~/sanity/types';
import { ListItem } from '~/components/ListItem';

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const initial = await loadQuery<Group[]>(GROUPS_QUERY, params);
  sanitize(initial.data);

  return { initial, query: GROUPS_QUERY, params };
};

export default function PostRoute() {
  const { initial, query, params } = useLoaderData<typeof loader>();
  const { data, loading, error, encodeDataAttribute } = useQuery<
    typeof initial.data
  >(query, params, {
    // @ts-expect-error -- TODO fix the typing here
    initial,
  });

  if (error) {
    throw error;
  } else if (loading && !data) {
    return <div>Loading...</div>;
  }

  const group = data?.find((g) => g.path.current === params.slug);

  if (!group) {
    throw new Error('Could not find group');
  }

  return (
    <main
      data-sanity={encodeDataAttribute('slug')}
      className="flex-1 flex flex-col gap-4 pb-2"
    >
      <div>
        <div className="text-center font-bold">Theme</div>
        {group.theme}
      </div>
      <div>
        <div className="text-center font-bold">Message</div>
        {group.message}
        <div className="text-right">
          {group.messageUrl ? (
            <a href={group.messageUrl} target="_blank">
              —{group.messageSource}
            </a>
          ) : (
            <>—{group.messageSource}</>
          )}
        </div>
      </div>
      <hr />
      <div className="flex flex-col gap-2">
        <div className="italic opacity-60">Announcements</div>
        {group.events.map((event) => (
          <ListItem
            icon="other"
            title={event.eventTitle}
            subtitle={formatDate(event.eventDate, event.eventDateOnly)}
            description={event.eventDescription}
            url={event.eventUrl}
            key={event.eventTitle}
          />
        ))}
      </div>
      <div className="text-xl flex-1 flex items-end justify-end">
        <Link to="/">Back</Link>
      </div>
    </main>
  );
}
