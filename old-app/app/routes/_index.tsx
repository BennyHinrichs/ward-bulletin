import {
  useLoaderData,
  type MetaFunction,
  Link,
  useLocation,
  useHref,
  NavLink,
} from '@remix-run/react';
import { useQuery } from '@sanity/react-loader';
import { loadQuery } from '~/sanity/loader.server';
import { GROUPS_QUERY } from '~/sanity/queries';
import { Group } from '~/sanity/types';
import { sanitize } from '~/utils/utils';
// @ts-expect-error no clue why this isn't seeing the exported member
import { QRCode, QRCodeProps } from 'react-qr-code';

export const meta: MetaFunction = () => {
  return [{ title: 'Ward Bulletin' }];
};

export const loader = async () => {
  const initial = await loadQuery<Group[]>(GROUPS_QUERY);
  sanitize(initial.data);

  return { initial, query: GROUPS_QUERY, params: {} };
};

export default function Index() {
  const { initial, query, params } = useLoaderData<typeof loader>();
  const { data, loading, error, encodeDataAttribute } = useQuery<
    typeof initial.data
  >(query, params, {
    // @ts-expect-error -- TODO fix the typing here
    initial,
  });
  const href = useHref('/');

  if (error) {
    throw error;
  } else if (loading && !data) {
    return <div>Loading...</div>;
  }

  // type jankery
  const QR = QRCode as (props: QRCodeProps) => React.ReactNode;

  return (
    <main className="flex flex-col gap-4 flex-1 items-end mb-10">
      <div className="flex-1 w-full flex flex-col gap-4 items-center justify-center mb-6">
        <div>Share the site</div>
        <QR
          value={href}
          size={256}
          style={{ height: 'auto', maxWidth: '100%', width: '256px' }}
          viewBox={`0 0 256 256`}
        />
      </div>
      <Link to="/program" className="text-5xl font-thin">
        Program
      </Link>
      {data?.map((group) => (
        <Link
          to={`/group/${group.path.current}`}
          key={group.title}
          className="text-5xl font-thin"
        >
          {group.title}
        </Link>
      ))}
    </main>
  );
}
