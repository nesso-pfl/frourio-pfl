FROM node:18-alpine

WORKDIR /app

COPY /server /app
RUN --mount=type=cache,target=/usr/local/share/.cache/yarn/v6 yarn
RUN yarn build

ENTRYPOINT ["node", "index.js"]
