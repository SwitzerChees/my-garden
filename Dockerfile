FROM node:lts-slim

# Create app directory
WORKDIR /app

# yarn install
ADD ./package.json /app/package.json
ADD ./yarn.lock /app/yarn.lock
RUN yarn install --frozen-lockfile

# Copy all files
ADD . /app

# yarn typecheck
RUN yarn typecheck
# yarn lint
RUN yarn lint
# yarn build
# RUN yarn build

ENV HOST 0.0.0.0
EXPOSE 3000

# start command
CMD ["yarn", "dev"]