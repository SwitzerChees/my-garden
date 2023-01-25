FROM node:lts-slim as build

# Create app directory
WORKDIR /app

# yarn install
ADD ./package.json /app/package.json
ADD ./packages/api/package.json /app/packages/api/package.json
ADD ./packages/ui/package.json /app/packages/ui/package.json
ADD ./packages/common/package.json /app/packages/common/package.json
ADD ./yarn.lock /app/yarn.lock
RUN yarn install

# Copy all files
ADD . /app

# yarn typecheck
RUN yarn typecheck:ui
# yarn lint
RUN yarn lint

# Install and execute node-prune
RUN apt update && apt install curl -y
RUN curl -sf https://gobinaries.com/tj/node-prune | sh
RUN node-prune

# Use production image
FROM node:18-alpine

WORKDIR /app
COPY --from=build /app/node_modules /app/node_modules

# Copy all files
ADD . /app

ENV HOST 0.0.0.0
EXPOSE 3000
