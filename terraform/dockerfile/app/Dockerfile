FROM node:18-alpine AS builder

WORKDIR /app

COPY ./server ./
RUN --mount=type=cache,target=/usr/local/share/.cache/yarn/v6 yarn
RUN yarn build

FROM node:18-alpine

COPY --from=builder /app/index.js /index.js

CMD ["node", "index.js"]
