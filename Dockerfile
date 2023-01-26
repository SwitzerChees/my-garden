FROM node:lts-slim

# Create app directory
WORKDIR /app

# Install node-prune
RUN apt update && apt install -y curl
RUN curl -sf https://gobinaries.com/tj/node-prune | sh

# Copy all files and install execute node-prune
ADD . /app
RUN yarn install --frozen-lockfile && node-prune

# yarn typecheck
RUN yarn typecheck:ui
# yarn lint
RUN yarn lint
# yarn build
RUN yarn build

ENV HOST 0.0.0.0
EXPOSE 3000
