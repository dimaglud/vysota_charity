# Install dependencies only when needed
FROM node:lts-alpine AS deps
WORKDIR /app
COPY package*.json yarn.lock ./
RUN --mount=type=cache,id=yarn,sharing=locked,target=/usr/local/share/.cache/yarn yarn install --frozen-lockfile

# Rebuild the source code only when needed
FROM node:lts-alpine AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN yarn build

# Install production depencies
FROM node:lts-alpine AS installer
WORKDIR /app
COPY . .
RUN yarn install --frozen-lockfile --production

# Production image, copy all the files and run next
FROM node:lts-alpine AS runner
RUN apk add dumb-init
WORKDIR /app

ARG NODE_ENV=production
ARG PORT=3000

ENV NODE_ENV=${NODE_ENV} \
    PORT=${BACKEND_PORT}

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nestjs -u 1001

COPY --from=installer --chown=nestjs:nodejs /app/node_modules ./node_modules
COPY --from=builder  --chown=nestjs:nodejs /app/package.json ./package.json
COPY --from=builder  --chown=nestjs:nodejs /app/*.env ./
COPY --from=builder --chown=nestjs:nodejs /app/dist ./dist

USER nestjs

EXPOSE ${PORT}

ENTRYPOINT ["dumb-init", "--"]

CMD ["node", "dist/main.js"]
