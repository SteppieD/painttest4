import { NextResponse } from 'next/server';

export async function GET() {
  // Only allow in development for security
  if (process.env.NODE_ENV === 'production' && process.env.VERCEL_ENV !== 'preview') {
    return NextResponse.json({ error: 'Not available in production' }, { status: 403 });
  }

  const envVars = {
    openrouter: {
      hasKey: !!process.env.OPENROUTER_API_KEY,
      keyLength: process.env.OPENROUTER_API_KEY?.length || 0,
      keyPrefix: process.env.OPENROUTER_API_KEY?.substring(0, 8) + '...' || 'not-set',
      isPlaceholder: process.env.OPENROUTER_API_KEY === 'your_openrouter_key',
      isEmptyString: process.env.OPENROUTER_API_KEY === '',
      typeOf: typeof process.env.OPENROUTER_API_KEY,
    },
    environment: {
      NODE_ENV: process.env.NODE_ENV,
      VERCEL_ENV: process.env.VERCEL_ENV,
      VERCEL: process.env.VERCEL,
      VERCEL_URL: process.env.VERCEL_URL,
    },
    otherAIKeys: {
      hasOpenAI: !!process.env.OPENAI_API_KEY,
      hasAnthropic: !!process.env.ANTHROPIC_API_KEY,
      hasGoogle: !!process.env.GOOGLE_GENERATIVE_AI_API_KEY,
    },
    aiFeatureEnabled: process.env.NEXT_PUBLIC_ENABLE_AI_CHAT === 'true',
  };

  // Test OpenRouter connection
  let connectionTest: Record<string, unknown> = { status: 'not-tested', error: null };
  if (process.env.OPENROUTER_API_KEY && process.env.OPENROUTER_API_KEY !== 'your_openrouter_key') {
    try {
      const response = await fetch('https://openrouter.ai/api/v1/models', {
        headers: {
          'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`
        }
      });
      
      connectionTest = {
        status: response.ok ? 'success' : 'failed',
        statusCode: response.status,
        error: response.ok ? null : `HTTP ${response.status}`
      };
    } catch (error) {
      connectionTest = {
        status: 'error',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  return NextResponse.json({
    timestamp: new Date().toISOString(),
    envVars,
    connectionTest,
    recommendations: getRecommendations(envVars, connectionTest)
  });
}

function getRecommendations(envVars: Record<string, unknown>, connectionTest: Record<string, unknown>): string[] {
  const recommendations = [];
  
  if (!(envVars.openrouter as any).hasKey) {
    recommendations.push('OPENROUTER_API_KEY is not set in environment variables');
  } else if ((envVars.openrouter as any).isPlaceholder) {
    recommendations.push('OPENROUTER_API_KEY still has placeholder value "your_openrouter_key"');
  } else if ((envVars.openrouter as any).isEmptyString) {
    recommendations.push('OPENROUTER_API_KEY is an empty string');
  } else if ((envVars.openrouter as any).keyLength < 20) {
    recommendations.push('OPENROUTER_API_KEY seems too short to be valid');
  }
  
  if (connectionTest.status === 'failed' && (connectionTest as any).statusCode === 401) {
    recommendations.push('OpenRouter API key is invalid (401 Unauthorized)');
  } else if (connectionTest.status === 'failed' && (connectionTest as any).statusCode === 402) {
    recommendations.push('OpenRouter account has insufficient credits (402 Payment Required)');
  }
  
  if ((envVars.environment as any).VERCEL && !(envVars.openrouter as any).hasKey) {
    recommendations.push('Running on Vercel but OPENROUTER_API_KEY not found - check Vercel dashboard > Settings > Environment Variables');
  }
  
  return recommendations;
}