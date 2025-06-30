FROM node:18-alpine AS builder

RUN apk add --no-cache openssl openssl-dev libc6-compat make gcc g++ python3

WORKDIR /app

RUN yarn global add prisma

COPY package*.json ./
COPY prisma ./prisma
RUN yarn install --frozen-lockfile

RUN yarn prisma generate --schema=./prisma/schema.prisma

COPY . .
RUN yarn build

RUN ls -la dist/

FROM node:18-alpine AS production

WORKDIR /app

ENV NODE_ENV production

COPY --from=builder /app/package.json .
COPY --from=builder /app/yarn.lock .
# RUN yarn install --production --frozen-lockfile

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

RUN ls -la dist/

RUN ls -la /app/dist

EXPOSE 4200

CMD ["yarn", "prod"]
