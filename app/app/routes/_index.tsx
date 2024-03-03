import { useLoaderData, type MetaFunction, Link } from '@remix-run/react';
import { useQuery } from '@sanity/react-loader';
import { loadQuery } from '~/sanity/loader.server';
import { EXTERNAL_PROGRAM_QUERY, GROUPS_QUERY } from '~/sanity/queries';
import { Group } from '~/sanity/types';
import { sanitize } from '~/utils/utils';
// @ts-expect-error no clue why this isn't seeing the exported member
import { QRCode, QRCodeProps } from 'react-qr-code';
// @ts-expect-error it's not seeing this one either
import { ClientOnly } from 'remix-utils/client-only';

export const meta: MetaFunction = () => {
  return [{ title: 'Ward Bulletin' }];
};

export const loader = async () => {
  const initial = await loadQuery<Group[]>(GROUPS_QUERY);
  const initialProgramUrl = await loadQuery<string>(EXTERNAL_PROGRAM_QUERY);
  sanitize(initial.data);

  return {
    initial,
    query: GROUPS_QUERY,
    params: {},
    initialProgramUrl,
    programUrlQuery: EXTERNAL_PROGRAM_QUERY,
  };
};

export default function Index() {
  const { initial, query, params, initialProgramUrl, programUrlQuery } =
    useLoaderData<typeof loader>();
  const { data, loading, error } = useQuery<typeof initial.data>(
    query,
    params,
    {
      // @ts-expect-error -- TODO fix the typing here
      initial,
    },
  );
  const {
    data: programUrl,
    loading: programUrlLoading,
    error: programUrlError,
  } = useQuery<typeof initialProgramUrl.data>(programUrlQuery, params, {
    // @ts-expect-error -- TODO fix the typing here
    initial: initialProgramUrl,
  });

  if (error) {
    throw error;
  } else if (programUrlError) {
    throw programUrlError;
  } else if ((loading && !data) || (programUrlLoading && !programUrl)) {
    return <div>Loading...</div>;
  }

  // type jankery
  const QR = QRCode as (props: QRCodeProps) => React.ReactNode;

  return (
    <main className="flex flex-col gap-4 flex-1 items-end mb-10">
      <div className="flex-1 w-full flex flex-col gap-4 items-center justify-center mb-6">
        <div>Share the site</div>
        <div className="bg-white p-2">
          <ClientOnly
            fallback={
              <div
                style={{ height: 256, width: 256 }}
                className="bg-slate-600"
              />
            }
          >
            {() => (
              <QR
                value={location.href}
                size={256}
                style={{ height: 'auto', maxWidth: '100%', width: '256px' }}
                viewBox={`0 0 256 256`}
                className="transition-"
              />
            )}
          </ClientOnly>
        </div>
      </div>
      <Link
        to={programUrl ? programUrl : '/program'}
        target={programUrl ? '_blank' : undefined}
        className="text-5xl font-thin text-right"
      >
        Program
      </Link>
      {data?.map((group) => (
        <Link
          to={`/group/${group.path.current}`}
          key={group.title}
          className="text-5xl font-thin text-right"
        >
          {group.title}
        </Link>
      ))}
    </main>
  );
}
