# Install dependencies only when needed
FROM node:lts-alpine AS deps
ARG NPM_TOKEN
WORKDIR /app
COPY package*.json yarn.lock ./
RUN apk add --no-cache libc6-compat
RUN --mount=type=cache,id=yarn,sharing=locked,target=/usr/local/share/.cache/yarn yarn install --frozen-lockfile

# Rebuild the source code only when needed
FROM node:lts-alpine AS builder
ARG API_ENDPOINT
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN yarn build

# Install production depencies
FROM node:lts-alpine AS installer
ARG NPM_TOKEN
WORKDIR /app
COPY . .
RUN yarn install --frozen-lockfile --production

# Production image, copy all the files and run next
FROM node:lts-alpine AS runner

ENV NODE_ENV=production \
    PORT=3000 \
    NEXT_TELEMETRY_DISABLED=1

WORKDIR /app

RUN apk add dumb-init

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

RUN mkdir -p /app/.next/cache/images && chown nextjs:nodejs /app/.next/cache/images

COPY --from=installer --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /app/next.config.js ./
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/package.json ./package.json

USER nextjs

EXPOSE 3000

CMD ["dumb-init", "yarn", "start"]
