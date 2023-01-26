FROM node:lts-slim as build

# Create app directory
WORKDIR /app

# yarn install
ADD ./package.json /app/package.json
ADD ./packages/api/package.json /app/packages/api/package.json
ADD ./packages/ui/package.json /app/packages/ui/package.json
ADD ./packages/common/package.json /app/packages/common/package.json
ADD ./yarn.lock /app/yarn.lock
RUN yarn install --frozen-lockfile

# Copy all files
ADD . /app

# yarn typecheck
RUN yarn typecheck:ui
# yarn lint
RUN yarn lint
# yarn build
RUN yarn build

# Install and execute node-prune
RUN apt update && apt install curl -y
RUN curl -sf https://gobinaries.com/tj/node-prune | sh
RUN node-prune

# Use production image
FROM node:18-alpine

WORKDIR /app

# Copy package json and install packages again for production
ADD ./package.json /app/package.json
ADD ./packages/api/package.json /app/packages/api/package.json
ADD ./packages/ui/package.json /app/packages/ui/package.json
ADD ./packages/common/package.json /app/packages/common/package.json
ADD ./yarn.lock /app/yarn.lock
RUN yarn install --frozen-lockfile

# Copy files for ui
COPY --from=build /app/packages/ui/.nuxt /app/packages/ui/.nuxt
COPY --from=build /app/packages/ui/.output /app/packages/ui/.output

# Copy files for api
COPY --from=build /app/packages/api /app/packages/api

ENV HOST 0.0.0.0
EXPOSE 3000
