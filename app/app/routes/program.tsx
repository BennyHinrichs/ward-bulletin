import { type LoaderFunctionArgs } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { useQuery } from '@sanity/react-loader';
import { formatDate, sanitize } from '~/utils/utils';
import { loadQuery } from '~/sanity/loader.server';
import { PROGRAM_QUERY } from '~/sanity/queries';
import { Program } from '~/sanity/types';
import { ListItem } from '~/components/ListItem';
import hymns from '../static/hymns.json';

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const initial = await loadQuery<Program>(PROGRAM_QUERY, params);
  sanitize(initial.data);

  return { initial, query: PROGRAM_QUERY, params };
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
  } else if (!data) {
    throw new Error("Couldn't fetch the program");
  }

  // theoretically this should be client-only, but I don't care since it doesn't have the time
  const closestSunday = new Date();
  closestSunday.setDate(closestSunday.getDate() - closestSunday.getDay());

  return (
    <main className="flex flex-col gap-4 pb-2">
      <h3>{formatDate(closestSunday, true)}</h3>
      <ListItem icon="person" title={data.condutor} subtitle="Conducting" />
      <hr />
      <ListItem
        icon="hymn"
        subtitle="Opening Hymn"
        {...hymns[data.song1 - 1]}
      />
      <ListItem icon="prayer" title={data.prayer1} subtitle="Opening Prayer" />
      {data.preSacramentItems.map((item) => {
        switch (item._type) {
          case 'babyBlessing':
            return (
              <ListItem
                icon="baby"
                title={item.name}
                subtitle={'Blessing'}
                key={item.name}
              />
            );
          case 'confirmation':
            return (
              <ListItem
                icon="confirmation"
                title={item.name}
                subtitle={'Confirmation'}
                key={item.name}
              />
            );
          case 'other':
            return <ListItem icon="other" title={item.name} key={item.name} />;
        }
      })}
      <ListItem
        icon="hymn"
        subtitle="Sacrament Hymn"
        {...hymns[data.song2 - 1]}
      />
      {data.includeSacrament ? (
        <>
          <hr />
          <ListItem icon="sacrament" title="Sacrament" />
          <hr />
        </>
      ) : null}
      {data.programItems.map((item) => {
        switch (item._type) {
          case 'speaker':
            return (
              <ListItem
                icon="speaker"
                title={item.speaker}
                subtitle={item.subtitle || 'Speaker'}
                key={item.speaker}
              />
            );
          case 'musicalNumber':
            return (
              <ListItem
                icon="musicalNumber"
                title={item.musicalNumberTitle}
                subtitle={item.musicalNumberPerformer || 'Musical Number'}
                key={item.musicalNumberTitle}
              />
            );
          case 'hymn':
            return (
              <ListItem
                icon="hymn"
                subtitle={'Hymn'}
                key={`hymn-${item.number}`}
                {...hymns[item.number - 1]}
              />
            );
          case 'other':
            return (
              <ListItem
                icon="other"
                title={item.other}
                subtitle={item.subtitle}
                key={item.other}
              />
            );
        }
      })}
      <ListItem
        icon="hymn"
        subtitle="Closing Hymn"
        {...hymns[data.song3 - 1]}
      />
      <ListItem icon="prayer" title={data.prayer2} subtitle="Closing Prayer" />
      <div className="text-xl flex-1 flex items-end justify-end">
        <Link to="/">Back</Link>
      </div>
    </main>
  );
}
