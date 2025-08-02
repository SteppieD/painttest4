import { NextRequest, NextResponse } from 'next/server';

export async function GET(_request: NextRequest) {
  const debug = {
    timestamp: new Date().toISOString(),
    environment: {
      NODE_ENV: process.env.NODE_ENV,
      VERCEL: process.env.VERCEL,
      VERCEL_ENV: process.env.VERCEL_ENV,
      VERCEL_URL: process.env.VERCEL_URL,
    },
    apiKeyCheck: {
      exists: !!process.env.OPENROUTER_API_KEY,
      length: process.env.OPENROUTER_API_KEY?.length || 0,
      startsWithSk: process.env.OPENROUTER_API_KEY?.startsWith('sk-') || false,
      startsWithOr: process.env.OPENROUTER_API_KEY?.startsWith('or-') || false,
      firstChars: process.env.OPENROUTER_API_KEY?.substring(0, 10) + '...' || 'undefined',
      lastChars: '...' + process.env.OPENROUTER_API_KEY?.substring(-10) || 'undefined',
      isEmptyString: process.env.OPENROUTER_API_KEY === '',
      isPlaceholder: process.env.OPENROUTER_API_KEY === 'your_openrouter_key',
      typeOf: typeof process.env.OPENROUTER_API_KEY,
    },
    processEnvKeys: Object.keys(process.env).filter(key => 
      key.includes('OPENROUTER') || 
      key.includes('OPEN_ROUTER') || 
      key.includes('AI') ||
      key.includes('ANTHROPIC')
    ).map(key => ({
      key,
      exists: !!process.env[key],
      length: process.env[key]?.length || 0
    })),
  };

  // Test 1: Direct API call to OpenRouter
  let directApiTest: unknown = { status: 'not-tested' };
  if (process.env.OPENROUTER_API_KEY) {
    try {
      const response = await fetch('https://openrouter.ai/api/v1/models', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001',
          'X-Title': 'PaintQuote Pro Debug'
        }
      });
      
      const responseText = await response.text();
      let responseData;
      try {
        responseData = JSON.parse(responseText);
      } catch {
        responseData = responseText;
      }
      
      directApiTest = {
        status: response.ok ? 'success' : 'failed',
        statusCode: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()),
        response: response.ok ? 'Models fetched successfully' : responseData,
        modelCount: response.ok && responseData?.data ? responseData.data.length : 0
      };
    } catch (error) {
      directApiTest = {
        status: 'error',
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      };
    }
  }

  // Test 2: Chat completion test
  let chatTest: unknown = { status: 'not-tested' };
  if (process.env.OPENROUTER_API_KEY && directApiTest.status === 'success') {
    try {
      const chatResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001',
          'X-Title': 'PaintQuote Pro Debug'
        },
        body: JSON.stringify({
          model: 'anthropic/claude-3.5-sonnet',
          messages: [
            { role: 'system', content: 'You are a test assistant.' },
            { role: 'user', content: 'Reply with just "OK".' }
          ],
          max_tokens: 10
        })
      });
      
      const chatResponseText = await chatResponse.text();
      let chatResponseData;
      try {
        chatResponseData = JSON.parse(chatResponseText);
      } catch {
        chatResponseData = chatResponseText;
      }
      
      chatTest = {
        status: chatResponse.ok ? 'success' : 'failed',
        statusCode: chatResponse.status,
        statusText: chatResponse.statusText,
        response: chatResponseData,
        reply: chatResponse.ok && chatResponseData?.choices?.[0]?.message?.content || null
      };
    } catch (error) {
      chatTest = {
        status: 'error',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  // Test 3: Import and instantiate the client
  let clientTest: unknown = { status: 'not-tested' };
  try {
    const { OpenRouterClient } = await import('@/lib/ai/openrouter-client');
    const client = new OpenRouterClient();
    
    // Check if we can access the client
    clientTest = {
      status: 'imported',
      clientExists: !!client,
      // Try to use the client
      testMessage: 'Client imported successfully'
    };
    
    // Try to make a call
    if (process.env.OPENROUTER_API_KEY) {
      try {
        const result = await client.createChatCompletion([
          { role: 'user', content: 'Say OK' }
        ], { max_tokens: 10 });
        
        clientTest.apiCall = {
          status: 'success',
          response: result
        };
      } catch (error) {
        clientTest.apiCall = {
          status: 'failed',
          error: error instanceof Error ? error.message : 'Unknown error'
        };
      }
    }
  } catch (error) {
    clientTest = {
      status: 'import-failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }

  return NextResponse.json({
    debug,
    tests: {
      directApiTest,
      chatTest,
      clientTest
    },
    recommendations: getDetailedRecommendations(debug, directApiTest, chatTest, clientTest)
  });
}

interface DebugInfo {
  apiKeyCheck: {
    exists: boolean;
    isEmptyString: boolean;
    isPlaceholder: boolean;
    startsWithSk: boolean;
    startsWithOr: boolean;
  };
  environment: {
    VERCEL?: string;
    VERCEL_ENV?: string;
  };
}

interface TestResult {
  status: string;
  statusCode?: number;
  response?: {
    error?: string | Error;
  };
}

interface ClientTest {
  apiCall?: {
    status: string;
    error?: string;
  };
}

function getDetailedRecommendations(debug: DebugInfo, directTest: TestResult, chatTest: TestResult, clientTest: ClientTest): string[] {
  const recs = [];
  
  if (!debug.apiKeyCheck.exists) {
    recs.push('❌ OPENROUTER_API_KEY is not found in environment variables at all');
    recs.push('→ Make sure you redeployed after adding the environment variable');
    recs.push('→ Check if the variable name is exactly "OPENROUTER_API_KEY" (case-sensitive)');
  } else if (debug.apiKeyCheck.isEmptyString) {
    recs.push('❌ OPENROUTER_API_KEY exists but is an empty string');
    recs.push('→ Update the value in Vercel dashboard to your actual API key');
  } else if (debug.apiKeyCheck.isPlaceholder) {
    recs.push('❌ OPENROUTER_API_KEY still has the placeholder value');
    recs.push('→ Update it with your actual OpenRouter API key');
  } else if (!debug.apiKeyCheck.startsWithSk && !debug.apiKeyCheck.startsWithOr) {
    recs.push('⚠️ API key format might be incorrect (should start with "sk-" or "or-")');
  }
  
  if (directTest.status === 'failed') {
    if (directTest.statusCode === 401) {
      recs.push('❌ API key is invalid (401 Unauthorized)');
      recs.push('→ Double-check the API key in your OpenRouter dashboard');
      recs.push('→ Make sure you copied the entire key without any extra spaces');
    } else if (directTest.statusCode === 402) {
      recs.push('❌ OpenRouter account has no credits (402 Payment Required)');
      recs.push('→ Add credits to your OpenRouter account');
    } else if (directTest.statusCode === 403) {
      recs.push('❌ API key doesn\'t have permission (403 Forbidden)');
      recs.push('→ Check API key permissions in OpenRouter dashboard');
    }
  }
  
  if (chatTest.status === 'failed' && chatTest.response?.error) {
    recs.push(`❌ Chat API error: ${chatTest.response.error instanceof Error ? chatTest.response.error.message : chatTest.response.error}`);
  }
  
  if (clientTest.apiCall?.status === 'failed') {
    recs.push(`❌ Client library error: ${clientTest.apiCall.error}`);
  }
  
  if (debug.environment.VERCEL && !debug.environment.VERCEL_ENV) {
    recs.push('⚠️ Running on Vercel but VERCEL_ENV is not set');
  }
  
  if (recs.length === 0 && directTest.status === 'success') {
    recs.push('✅ OpenRouter API key is properly configured and working!');
    recs.push('→ The issue might be in the application code or specific API calls');
  }
  
  return recs;
}