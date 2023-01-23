FROM node:lts-slim

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
RUN yarn lint:ui
RUN yarn lint:api

ENV HOST 0.0.0.0
EXPOSE 3000
