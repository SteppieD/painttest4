# Base stage
FROM node:18-alpine AS base
WORKDIR /app
RUN apk add --no-cache libc6-compat openssl

# Dependencies stage
FROM base AS deps

# First build calculator package
WORKDIR /paintquotepro-calculator
COPY paintquotepro-calculator/package*.json ./
COPY paintquotepro-calculator/tsconfig.json ./
COPY paintquotepro-calculator/src ./src
RUN npm ci && npm run build

# Then build API package
WORKDIR /paintquotepro-api
COPY paintquotepro-api/package*.json ./
COPY paintquotepro-api/tsconfig.json ./
COPY paintquotepro-api/src ./src
COPY paintquotepro-api/prisma ./prisma
RUN npm ci && npx prisma generate && npm run build

# Finally install web dependencies
WORKDIR /app
COPY paintquotepro-web/package*.json ./
RUN npm ci

# Development stage
FROM base AS dev
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /paintquotepro-calculator /paintquotepro-calculator
COPY --from=deps /paintquotepro-api /paintquotepro-api
COPY paintquotepro-web/. .
RUN npx prisma generate
EXPOSE 3000
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"
CMD ["npm", "run", "dev"]

# Builder stage
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build

# Production stage
FROM base AS production
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]