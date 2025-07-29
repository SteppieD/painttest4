# PaintTest4 Application Architecture

## Overview
PaintTest4 is a SaaS application for painting contractors to generate professional quotes quickly. Built with Next.js 14 using the App Router pattern.

## Core Features
1. **AI-Powered Quote Generation**: Conversational interface for creating painting quotes
2. **Multi-tenant System**: Company-based access with unique access codes
3. **Real-time Calculations**: Dynamic pricing based on square footage and rates
4. **Professional Quote PDFs**: Branded quote generation
5. **Subscription Management**: Tiered pricing with Stripe integration

## Architecture Patterns

### Frontend Architecture
- **App Router**: Next.js 14 app directory structure
- **Server Components**: Default for pages, with 'use client' for interactive components
- **Component Composition**: Reusable UI components with shadcn/ui
- **Responsive Design**: Mobile-first with Tailwind CSS

### API Architecture
- **RESTful Routes**: Organized by resource in app/api/
- **Route Handlers**: Using Next.js 14 route.ts files
- **Middleware Pattern**: Authentication checks in API routes
- **Database Adapter Pattern**: Flexible database backend

### Authentication Flow
1. **Access Code Entry**: Companies use unique codes
2. **Magic Link**: Passwordless email authentication
3. **Session Management**: JWT tokens stored in cookies
4. **Role-based Access**: Admin vs company user permissions

### State Management
- **Server State**: Managed through API calls
- **Client State**: React hooks and context where needed
- **Form State**: React Hook Form with Zod validation
- **URL State**: Query parameters for filters and navigation

### AI Integration
- **OpenRouter**: Centralized AI model access
- **Quote Assistant**: Conversational quote creation
- **Intelligent Parsing**: Extract quote details from conversations
- **Multiple Providers**: Anthropic, Google AI support

### Payment Flow
1. **Stripe Checkout**: For new subscriptions
2. **Customer Portal**: Manage existing subscriptions
3. **Webhook Integration**: Real-time subscription updates
4. **Usage Tracking**: Quote limits per subscription tier

## Key Design Decisions
- **Database Flexibility**: Adapter pattern for Supabase/SQLite
- **API-First**: Clear separation of frontend and backend
- **Type Safety**: Full TypeScript with Zod validation
- **SEO Optimization**: Static pages for marketing content
- **Progressive Enhancement**: Works without JavaScript where possible