# Ward Bulletin

A site for your local ward to put their Sunday program along with announcements and events from groups. There is a QR code to make it easily shareable. The site is not behind any permissions, so all the world can see it (and make it more accessible to ward members). That said, you might want to leave off info like emails and phone numbers.

### Remix + Sanity Studio + Netlify

This starter uses [Remix](https://remix.run/) for the front end and [Sanity](https://sanity.io/) to handle its content, with the site deployed through [Netlify](https://www.netlify.com/). You will need to make both a Sanity and Netlify account. As of this commit, Netlify free tier includes 100GB/mo of bandwidth and Sanity allows ups to 20 collaborators (typically ward council members that you, the webmaster, have to invite).

# Caveat

I haven't meticulously groomed the READMEs, so I apologize is something is off

## Guides

- How to fetch content as data from [the Sanity Content Lake](https://www.sanity.io/docs/datastore)
- How to render block content with [Portable Text](https://www.sanity.io/docs/presenting-block-text)
- A [Sanity Studio](https://www.sanity.io/docs/sanity-studio) to create and edit content
- How to crop and render images with [Sanity Image URLs](https://www.sanity.io/docs/image-url)

> **Note**
>
> This starter features an `/app` and a `/studio` folder. The `/app` folder contains the frontend code, and the `/studio` folder contains the Sanity Studio code.
>
> This is **not** a monorepo setup. We put them both in one repository for the sake of simplicity. You might want to have separate repositories for each of the folders, to make it easier to deploy the app and the studio separately.

## Prerequisities

- [Node.js](https://nodejs.org/en/) (v14.18 or later)
- [Sanity CLI](https://www.sanity.io/docs/getting-started-with-sanity-cli)

## Getting started

Run the following commands to prepare both applications:

1. From the root of the repository, install dependencies

```sh
pnpm install
```

2. Select or create a Sanity project and dataset, and output the details to a `.env.local` file

```sh
cd studio && pnpm sanity init --env .env.local
```

3. From the **root directory**, copy environment variables from the Studio folder to the Remix folder

```sh
cp ./studio/.env.local ./app/.env
```

4.  Start the development servers:

```sh
pnpm dev
```

- Your Remix app should now be running on [http://localhost:3000/](http://localhost:3000/)
- Your Studio should now be running on [http://localhost:3333/](http://localhost:3333/).

_Feel free to move each of the folders to their own location and check them into version control._

### Enable Visual Editing in the Remix app

Update the `.env` file in the `/app` directory to enable "stega", which is required for [Presentation](https://www.sanity.io/docs/presentation).

```
# ./app/.env
SANITY_STUDIO_STEGA_ENABLED="true"
```

> **Note**
>
> I stripped this out entirely, so there's more setup than just adding the env field back

### Add content in the Studio

1. Visit the Studio and create and publish a new `Program` and `Group`s. The groups should be Elders, Relief Society, YM, YW, etc.
1. This is called Ward Bulletin, but it can also be adapted for a stake (there is an `includeSacrament` boolean for the program)
1. Visit the App and refresh the page to see your content rendered on the page

The schemas for the Sanity data are defined in the `/studio/schemas` folder. You can add more documents and schemas to the Studio if you want.

## Deployments

The `/app` and `/studio` folders are meant to be deployed separately.

Make sure that after `/app` is deployed the `.env` file in `/studio` is updated with its deployment URL under `SANITY_STUDIO_PREVIEW_URL`.

And `/app` has a `.env` file with `SANITY_STUDIO_URL` that points to the Studio's deployment URL.

# Preview on Mobile

If your computer and phone are on the same wifi, you can get your (Mac) device IP like

```
ipconfig getifaddr en0
OR
ifconfig | grep "inet " | grep -Fv 127.0.0.1 | awk '{print $2}'
```

Then on your phone, go to the result like `192.168.xxx.xxx:3000` and see your site live.
