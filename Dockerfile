# If you are building it for ARM arch
# FROM arm64v8/node:20-slim as builder
FROM node:20 as builder

WORKDIR /app
# By copying the package.json and lockfile first
# We can leverage Docker caching and skip npm installs
# across builds.
COPY package.json pnpm-lock.yaml ./
RUN npm install pnpm@9.2.0 -g
RUN pnpm install
COPY . .

# Make sure we run the Remix compiler in production mode
ENV NODE_ENV=production
RUN pnpm build

# If you are building it for ARM arch
# FROM arm64v8/node:20-slim as runtime
FROM node:20 as runtime

WORKDIR /app
# Make sure the app does not run as root
RUN chown nobody /app

# At this point, you don't need any of your Remix code anymore. 
# Only the build files and dependencies installed.
COPY --from=builder --chown=nobody:root /app/build ./build
COPY --from=builder --chown=nobody:root /app/public ./public
COPY package.json pnpm-lock.yaml ./
# Install only production dependencies to keep our Docker image small
RUN npm install -g pnpm@9.2.0 && pnpm install --prod

USER nobody

# Start from the Remix build which already includes our Express server
CMD ["pnpm", "start"]
