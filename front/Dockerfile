FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN yarn

COPY . .
RUN yarn build
RUN yarn next telemetry disable

FROM node:18-alpine AS production

WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/package.json ./
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

RUN ls -la && \
    ls -la .next && \
    ls -la .next/static

EXPOSE 3000

CMD ["yarn", "start"]

