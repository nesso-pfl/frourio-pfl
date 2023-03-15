FROM node:18-alpine

WORKDIR /app

COPY /server /app
COPY /terraform/dockerfile/app/entrypoint.sh /app
RUN chmod +x entrypoint.sh
RUN --mount=type=cache,target=/usr/local/share/.cache/yarn/v6 yarn
RUN yarn build

ENTRYPOINT ["./entrypoint.sh"]
