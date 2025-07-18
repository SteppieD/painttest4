# Docker Deployment Guide for PaintQuote Pro

This guide covers deploying PaintQuote Pro using Docker containers for both development and production environments.

## Quick Start

### Development Environment
```bash
# Clone the repository
git clone <repository-url>
cd painttest4

# Start development environment
docker-compose up -d

# Access the application
open http://localhost:3001
```

### Production Environment
```bash
# Build for production
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d

# Or use the production profile
docker-compose --profile prod up -d
```

## Architecture Overview

The Docker setup includes:

- **Web Application**: Next.js 14 application with unified architecture
- **PostgreSQL Database**: Optional production database (SQLite used by default)
- **Redis Cache**: Optional caching layer for improved performance
- **Volume Persistence**: Data and uploads persist between container restarts

## Environment Configuration

### Required Environment Variables

Create a `.env` file in the project root:

```env
# Database Configuration
DATABASE_PATH=./data/painting_quotes_app.db
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Authentication & Security
JWT_SECRET=your-super-secret-jwt-key-change-in-production
NEXTAUTH_URL=http://localhost:3001
NEXTAUTH_SECRET=your-nextauth-secret-key-change-in-production

# AI Services
OPENAI_API_KEY=your_openai_key
ANTHROPIC_API_KEY=your_anthropic_key
OPENROUTER_API_KEY=your_openrouter_key
GOOGLE_GENERATIVE_AI_API_KEY=your_google_ai_key

# Email Configuration
RESEND_API_KEY=your_resend_key
DEFAULT_FROM_EMAIL=noreply@paintquotepro.com

# Payment Processing
STRIPE_SECRET_KEY=your_stripe_secret
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_public
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# Stripe Price IDs
STRIPE_PROFESSIONAL_MONTHLY_PRICE_ID=price_xxx
STRIPE_PROFESSIONAL_YEARLY_PRICE_ID=price_xxx
STRIPE_BUSINESS_MONTHLY_PRICE_ID=price_xxx
STRIPE_BUSINESS_YEARLY_PRICE_ID=price_xxx

# Application Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3001
NEXT_PUBLIC_APP_NAME=PaintQuote Pro
NEXT_PUBLIC_SUPPORT_EMAIL=support@paintquotepro.com
```

### Optional Environment Variables

```env
# Feature Flags
NEXT_PUBLIC_ENABLE_AI_CHAT=true
NEXT_PUBLIC_ENABLE_PAYMENTS=true
NEXT_PUBLIC_ENABLE_EMAIL=true

# Development Tools
DEBUG=false

# Rate Limiting
RATE_LIMIT_WINDOW=60000
RATE_LIMIT_MAX_REQUESTS=100
```

## Docker Commands

### Development

```bash
# Start development environment
docker-compose up -d

# View logs
docker-compose logs -f web

# Stop services
docker-compose down

# Rebuild after code changes
docker-compose build --no-cache
docker-compose up -d

# Access container shell
docker-compose exec web sh
```

### Production

```bash
# Build production image
docker build -t paintquotepro .

# Run production container
docker run -d \
  --name paintquotepro \
  -p 3001:3001 \
  -v $(pwd)/data:/app/data \
  -v $(pwd)/uploads:/app/uploads \
  --env-file .env \
  paintquotepro

# Or use docker-compose
docker-compose -f docker-compose.yml up -d
```

## Volume Management

### Data Persistence

The application uses volumes for:

- **Database**: `./data/painting_quotes_app.db` (SQLite)
- **Uploads**: `./uploads/` (User uploaded files)
- **PostgreSQL**: `postgres_data` (if using PostgreSQL)
- **Redis**: `redis_data` (if using Redis)

### Backup Strategy

```bash
# Backup SQLite database
docker-compose exec web cp /app/data/painting_quotes_app.db /app/backups/

# Backup PostgreSQL
docker-compose exec postgres pg_dump -U paintquote paintquotepro > backup.sql

# Backup uploads
tar -czf uploads-backup.tar.gz uploads/
```

## Database Configuration

### SQLite (Default)

- **Development**: Automatic initialization
- **Production**: Database persists in `./data/` volume
- **Backup**: Simple file copy

### PostgreSQL (Optional)

Enable PostgreSQL by:

1. Uncomment PostgreSQL service in docker-compose.yml
2. Set `DATABASE_URL` environment variable
3. Run database migrations

```bash
# Initialize PostgreSQL
docker-compose exec web npm run db:migrate

# Reset database
docker-compose exec postgres psql -U paintquote -d paintquotepro -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public;"
```

### Supabase (Production)

For production deployment with Supabase:

1. Create Supabase project
2. Set Supabase environment variables
3. Run schema setup in Supabase dashboard

## Troubleshooting

### Common Issues

**Port Already in Use**
```bash
# Find process using port 3001
lsof -i :3001

# Change port in docker-compose.yml
ports:
  - "3002:3001"
```

**Database Connection Issues**
```bash
# Check database logs
docker-compose logs postgres

# Verify database connection
docker-compose exec web npm run db:test
```

**Build Failures**
```bash
# Clear Docker cache
docker system prune -af

# Rebuild without cache
docker-compose build --no-cache
```

**Permission Issues**
```bash
# Fix file permissions
sudo chown -R $USER:$USER data/
sudo chown -R $USER:$USER uploads/
```

### Debugging

```bash
# Access container shell
docker-compose exec web sh

# Check environment variables
docker-compose exec web env

# View application logs
docker-compose logs -f web

# Check service health
docker-compose ps
```

## Production Deployment

### Security Considerations

1. **Environment Variables**: Use secure secrets management
2. **Network Security**: Configure firewall rules
3. **SSL/TLS**: Use reverse proxy with SSL termination
4. **Updates**: Regular security updates for base images

### Reverse Proxy Setup (Nginx)

```nginx
server {
    listen 80;
    server_name your-domain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl;
    server_name your-domain.com;

    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private.key;

    location / {
        proxy_pass http://localhost:3001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### Health Checks

```bash
# Application health check
curl http://localhost:3001/api/health

# Database health check
docker-compose exec postgres pg_isready -U paintquote
```

## Performance Optimization

### Docker Optimization

1. **Multi-stage builds**: Reduce image size
2. **Layer caching**: Optimize Dockerfile order
3. **Resource limits**: Set memory/CPU limits

```yaml
# docker-compose.yml
services:
  web:
    deploy:
      resources:
        limits:
          memory: 512M
          cpus: '0.5'
```

### Application Optimization

1. **Database indexing**: Optimize queries
2. **Caching**: Use Redis for session storage
3. **CDN**: Serve static assets from CDN

## Monitoring

### Container Monitoring

```bash
# Monitor resource usage
docker stats

# Check container health
docker-compose ps
```

### Application Monitoring

Add monitoring tools in docker-compose.yml:

```yaml
services:
  prometheus:
    image: prom/prometheus
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml

  grafana:
    image: grafana/grafana
    ports:
      - "3000:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin
```

## Maintenance

### Regular Tasks

```bash
# Update base images
docker-compose pull

# Clean up unused resources
docker system prune -f

# Backup data
./scripts/backup.sh

# Update application
git pull
docker-compose build --no-cache
docker-compose up -d
```

### Scaling

```bash
# Scale web service
docker-compose up -d --scale web=3

# Use load balancer
docker-compose -f docker-compose.yml -f docker-compose.scale.yml up -d
```

## Support

For issues and questions:

1. Check the [troubleshooting section](#troubleshooting)
2. Review Docker logs: `docker-compose logs`
3. Check application health: `curl http://localhost:3001/api/health`
4. Open an issue in the project repository

---

*Last updated: $(date)*