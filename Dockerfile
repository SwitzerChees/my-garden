FROM node:lts-slim

# Create app directory
WORKDIR /app

# yarn install
ADD ./package.json /app/package.json
ADD ./yarn.lock /app/yarn.lock
RUN yarn install --frozen-lockfile

# Copy all files
ADD . /app

# yarn lint
RUN yarn lint
# yarn build
RUN NODE_ENV=production yarn build && find /app \( -name "*.ts" -o -name "*.vue" \) ! -path '*/node_modules/*' -type f -delete

ENV HOST 0.0.0.0
EXPOSE 3000

# start command
CMD ["node", "/app/.output/server/index.mjs"]