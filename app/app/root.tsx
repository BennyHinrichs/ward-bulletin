import { type LinksFunction, json, LoaderFunctionArgs } from '@remix-run/node';
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  UIMatch,
  useLoaderData,
  useMatches,
} from '@remix-run/react';
import { Suspense, lazy } from 'react';
import styles from './tailwind.css';
import { Group } from './sanity/types';
import {
  QueryResponseInitial,
  loadQuery,
  useQuery,
} from '@sanity/react-loader';
import { NAME_QUERY } from './sanity/queries';

const LiveVisualEditing = lazy(() => import('~/components/LiveVisualEditing'));

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const initial = await loadQuery<string>(NAME_QUERY, params);

  return json({
    initial,
    query: NAME_QUERY,
    params,
    ENV: {
      SANITY_STUDIO_PROJECT_ID: process.env.SANITY_STUDIO_PROJECT_ID,
      SANITY_STUDIO_DATASET: process.env.SANITY_STUDIO_DATASET,
      SANITY_STUDIO_URL: process.env.SANITY_STUDIO_URL,
      SANITY_STUDIO_STEGA_ENABLED: process.env.SANITY_STUDIO_STEGA_ENABLED,
    },
  });
};

export const links: LinksFunction = () => {
  return [
    { rel: 'stylesheet', href: styles },
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100..700;1,100..700&display=swap',
    },
  ];
};

export default function App() {
  const { ENV, initial, query, params } = useLoaderData<typeof loader>();
  const {
    data: pageTitle,
    loading,
    error,
  } = useQuery<typeof initial.data>(query, params, {
    // @ts-expect-error -- TODO fix the typing here
    initial,
  });

  if (error) {
    throw error;
  } else if (loading && !pageTitle) {
    return <div>Loading...</div>;
  }

  const matches = useMatches();
  const match = matches.at(-1)!;

  // title is either gonna be from a group or the program
  const title = (() => {
    switch (true) {
      case Boolean(match.params.slug): {
        // probably a better way to type this
        const group = (
          match.data as unknown as { initial: QueryResponseInitial<Group[]> }
        ).initial.data.find((g) => g.path.current === match.params.slug);
        return group?.title;
      }
      case match.pathname === '/program':
        return 'Program';
      default:
        return '';
    }
  })();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <div className="container mx-auto px-4 py-2 flex flex-col gap-4 min-h-dvh">
          <header className="flex gap-4">
            <Link className="text-2xl font-bold" to="/">
              {pageTitle || 'Ward Bulletin'}
            </Link>
            {title ? <h2 className="text-2xl font-thin">{title}</h2> : null}
          </header>
          <Outlet />
        </div>
        <ScrollRestoration />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(ENV)}`,
          }}
        />
        {ENV.SANITY_STUDIO_STEGA_ENABLED ? (
          <Suspense>
            <LiveVisualEditing />
          </Suspense>
        ) : null}
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
