# Changelog

All notable changes to PaintQuote Pro will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-07-15

### Added
- Initial release of PaintQuote Pro
- AI-powered quote generation using OpenRouter/Claude
- Mobile-optimized quote creation with swipe navigation
- Customer relationship management (CRM) system
- Freemium business model (5 free quotes/month, Pro at $47/month)
- Dashboard with business analytics and locked premium features
- Comprehensive settings for labor rates, paint costs, and taxes
- SEO-optimized marketing pages for 10 major cities
- Docker deployment configuration
- JWT-based authentication system
- Professional quote templates
- Real-time quote calculations
- Multi-step quote form as alternative to AI chat
- Paint product management system
- Customer quote history tracking
- Win rate analytics

### Fixed
- Database schema mismatches in Docker deployment
- Authentication failures with test user creation
- Dashboard queries for non-existent fields
- Missing UI component imports
- Quote calculations returning $0
- Navigation to products and customers pages

### Security
- Implemented httpOnly cookies for JWT tokens
- Added input validation with Zod
- Secured API routes with authentication middleware
- Environment variables for sensitive configuration

### Docker Deployment
- PostgreSQL 15 Alpine for database
- Node 18 Alpine for application
- Health checks for database readiness
- Automatic migration deployment
- Volume mounts for development

### Known Issues
- Pro tier pricing not displaying correctly in test ($47 expected)
- Swipe navigation hint not showing in mobile UI test
- TypeScript build errors suppressed with `ignoreBuildErrors: true`

## [0.9.0] - 2025-07-14 (Pre-release)

### Added
- Initial project setup with Next.js 14
- Basic authentication flow
- Quote management system
- Customer database schema
- Prisma ORM integration
- Tailwind CSS styling
- shadcn/ui components

### Notes
- Pre-release version used for initial development
- Not deployed to production