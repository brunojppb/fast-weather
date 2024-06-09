# ⚡ Fast Weather

A website built to demonstrate how to use caching headers effectively.

## Development

Run the dev server:

```shell
pnpm dev
```

## Deployment

First, build your app for production:

```shell
pnpm build
```

Then run the app in production mode:

```shell
pnpm start
```

Now you'll need to pick a host to deploy it to.

### DIY

If you're familiar with deploying Node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `pnpm build`

- `build/server`
- `build/client`
