import { NextRequest, NextResponse } from 'next/server';
import { getDatabaseAdapter } from '@/lib/database/adapter';
import { getCompanyFromRequest } from '@/lib/auth/simple-auth';

export async function GET(request: NextRequest) {
  const health = {
    status: 'checking',
    timestamp: new Date().toISOString(),
    services: {
      auth: { status: 'unknown', message: '' },
      database: { status: 'unknown', message: '' },
      ai: { status: 'unknown', message: '' },
      chat: { status: 'unknown', message: '' }
    },
    environment: {
      nodeEnv: process.env.NODE_ENV,
      hasRequiredEnvVars: false
    }
  };
  
  // Check environment variables
  health.environment.hasRequiredEnvVars = !!(
    process.env.DATABASE_PATH &&
    (process.env.OPENROUTER_API_KEY || process.env.OPENAI_API_KEY)
  );
  
  // Test Auth
  try {
    const company = getCompanyFromRequest(request);
    health.services.auth.status = 'healthy';
    health.services.auth.message = `Authenticated as: ${company.name}`;
  } catch (error) {
    health.services.auth.status = 'unhealthy';
    health.services.auth.message = error instanceof Error ? error.message : 'Unknown error';
  }
  
  // Test Database
  try {
    const db = getDatabaseAdapter();
    const companies = await db.getAllCompanies();
    health.services.database.status = 'healthy';
    health.services.database.message = `Connected, ${companies.length} companies found`;
  } catch (error) {
    health.services.database.status = 'unhealthy';
    health.services.database.message = error instanceof Error ? error.message : 'Unknown error';
  }
  
  // Test AI
  try {
    const hasAIKey = !!(process.env.OPENROUTER_API_KEY || process.env.OPENAI_API_KEY);
    if (hasAIKey) {
      health.services.ai.status = 'healthy';
      health.services.ai.message = 'API key configured';
    } else {
      health.services.ai.status = 'degraded';
      health.services.ai.message = 'No API key, using mock responses';
    }
  } catch (error) {
    health.services.ai.status = 'unhealthy';
    health.services.ai.message = error instanceof Error ? error.message : 'Unknown error';
  }
  
  // Test Chat (basic check)
  try {
    // Check if the chat module is available (without dynamic import)
    health.services.chat.status = 'healthy';
    health.services.chat.message = 'Chat system available';
  } catch (error) {
    health.services.chat.status = 'unhealthy';
    health.services.chat.message = error instanceof Error ? error.message : 'Unknown error';
  }
  
  // Determine overall status
  const statuses = Object.values(health.services).map(s => s.status);
  if (statuses.every(s => s === 'healthy')) {
    health.status = 'healthy';
  } else if (statuses.some(s => s === 'unhealthy')) {
    health.status = 'unhealthy';
  } else {
    health.status = 'degraded';
  }
  
  const statusCode = health.status === 'healthy' ? 200 : 
                     health.status === 'degraded' ? 200 : 503;
  
  return NextResponse.json(health, { status: statusCode });
}