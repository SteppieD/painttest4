# Docker Deployment Guide for PaintQuote Pro

This guide provides comprehensive instructions for deploying PaintQuote Pro using Docker.

## Prerequisites

- Docker installed (version 20.10 or higher)
- Docker Compose installed (version 2.0 or higher)
- Environment variables configured in `.env.local` file

## Quick Start

### 1. Build the Docker Image

```bash
docker build -t paintquotepro .
```

### 2. Run the Container

```bash
# Run with environment file
docker run -d -p 3000:3001 --env-file .env.local --name paintquotepro-app paintquotepro

# Or run with individual environment variables
docker run -d -p 3000:3001 \
  -e JWT_SECRET=your-secret-key \
  -e OPENROUTER_API_KEY=your-openrouter-key \
  -e DATABASE_ADAPTER=memory \
  --name paintquotepro-app paintquotepro
```

### 3. Using Docker Compose (Recommended)

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down
```

## Configuration

### Environment Variables

Create a `.env.local` file with the following variables:

```env
# Required
JWT_SECRET=your-jwt-secret-key
OPENROUTER_API_KEY=your-openrouter-api-key

# Database (defaults to memory adapter)
DATABASE_ADAPTER=memory

# Optional - Stripe
STRIPE_SECRET_KEY=your-stripe-secret-key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key
STRIPE_WEBHOOK_SECRET=your-stripe-webhook-secret

# Optional - Email
RESEND_API_KEY=your-resend-api-key
RESEND_FROM_EMAIL=noreply@yourdomain.com

# Optional - Google Tag Manager
NEXT_PUBLIC_GTM_ID=your-gtm-id
```

### Port Configuration

The application runs on port 3001 inside the container. The Docker configuration maps this to port 3000 on the host.

## Database Options

### Memory Adapter (Default)
- No additional configuration needed
- Data is not persisted between container restarts
- Suitable for demos and development

### SQLite Adapter
- Set `DATABASE_ADAPTER=sqlite`
- Mount a volume for persistence: `-v ./data:/app/data`

### Supabase Adapter
- Set `DATABASE_ADAPTER=supabase`
- Configure Supabase environment variables:
  ```env
  NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
  NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
  SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
  ```

## Production Deployment

### 1. Build for Production

```bash
# Build with production optimizations
docker build -t paintquotepro:latest .
```

### 2. Deploy to Cloud Providers

#### AWS ECS
```bash
# Tag for ECR
docker tag paintquotepro:latest [account-id].dkr.ecr.[region].amazonaws.com/paintquotepro:latest

# Push to ECR
docker push [account-id].dkr.ecr.[region].amazonaws.com/paintquotepro:latest
```

#### Google Cloud Run
```bash
# Tag for GCR
docker tag paintquotepro:latest gcr.io/[project-id]/paintquotepro:latest

# Push to GCR
docker push gcr.io/[project-id]/paintquotepro:latest
```

#### Digital Ocean App Platform
1. Push your code to GitHub
2. Connect your repository to App Platform
3. Use the included Dockerfile for deployment

### 3. Health Checks

The application includes health check endpoints:
- `/api/health` - Basic health check
- `/api/diagnose` - Detailed system diagnostics

### 4. Scaling Considerations

- The memory adapter is not suitable for multi-instance deployments
- Use Supabase or another external database for production
- Configure session storage for multi-instance deployments

## Monitoring

### View Logs
```bash
# Single container
docker logs -f paintquotepro-app

# Docker Compose
docker-compose logs -f app
```

### Container Stats
```bash
docker stats paintquotepro-app
```

## Troubleshooting

### Common Issues

1. **Port already in use**
   ```bash
   # Find process using port 3000
   lsof -i :3000
   # Kill the process or use a different port
   docker run -d -p 3001:3001 ...
   ```

2. **Environment variables not loading**
   - Ensure `.env.local` file exists and is readable
   - Check file formatting (no spaces around `=`)
   - Use `docker exec paintquotepro-app env` to verify

3. **Database connection issues**
   - Verify DATABASE_ADAPTER is set correctly
   - Check database credentials and connectivity
   - Review logs for specific error messages

4. **Build failures**
   - Ensure all dependencies are properly installed
   - Check for TypeScript errors: `npm run type-check`
   - Clear Docker cache: `docker build --no-cache`

### Debug Mode

Run container with interactive shell:
```bash
docker run -it --env-file .env.local paintquotepro sh
```

## Security Best Practices

1. **Never commit sensitive data**
   - Use `.env.local` for secrets
   - Add `.env.local` to `.gitignore`

2. **Use secrets management**
   - AWS Secrets Manager
   - Google Secret Manager
   - HashiCorp Vault

3. **Regular updates**
   - Keep base images updated
   - Monitor for security vulnerabilities
   - Use `docker scan` to check for vulnerabilities

4. **Network security**
   - Use HTTPS in production
   - Configure proper CORS settings
   - Implement rate limiting

## Maintenance

### Update Application
```bash
# Pull latest code
git pull origin main

# Rebuild image
docker build -t paintquotepro:latest .

# Stop old container
docker stop paintquotepro-app
docker rm paintquotepro-app

# Start new container
docker run -d -p 3000:3001 --env-file .env.local --name paintquotepro-app paintquotepro:latest
```

### Backup Data
```bash
# For SQLite
docker cp paintquotepro-app:/app/data/painting_quotes_app.db ./backup/

# For memory adapter (export via API)
curl http://localhost:3000/api/export > backup.json
```

## Support

For issues and questions:
- Check application logs first
- Review error messages in browser console
- Consult the main README.md for application-specific configuration
- Submit issues to the project repository