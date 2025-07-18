# Base stage
FROM node:18-alpine AS base
WORKDIR /app
RUN apk add --no-cache libc6-compat openssl python3 make g++

# Dependencies stage
FROM base AS deps
COPY package*.json ./
RUN npm ci --only=production

# Builder stage
FROM base AS builder
COPY package*.json ./
RUN npm ci
COPY . .

# Build environment variables
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Add dummy environment variables for build time
ENV STRIPE_SECRET_KEY=sk_test_dummy
ENV NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_dummy
ENV STRIPE_WEBHOOK_SECRET=whsec_dummy
ENV STRIPE_PROFESSIONAL_MONTHLY_PRICE_ID=price_dummy
ENV STRIPE_PROFESSIONAL_YEARLY_PRICE_ID=price_dummy
ENV STRIPE_BUSINESS_MONTHLY_PRICE_ID=price_dummy
ENV STRIPE_BUSINESS_YEARLY_PRICE_ID=price_dummy
ENV JWT_SECRET=dummy-jwt-secret
ENV OPENROUTER_API_KEY=dummy-openrouter-key

# Build the application
RUN npm run build

# Production stage
FROM base AS production
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy built application
COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Copy database schema for SQLite initialization
COPY --from=builder --chown=nextjs:nodejs /app/lib/database/unified-schema.sql ./lib/database/unified-schema.sql

USER nextjs

EXPOSE 3001
ENV PORT=3001
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]