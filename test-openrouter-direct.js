// Test OpenRouter API directly
const fetch = require('node-fetch');

async function testOpenRouterAPI() {
  const apiKey = process.env.OPENROUTER_API_KEY || 'your_openrouter_key';
  
  console.log('Testing OpenRouter API...');
  console.log('API Key:', apiKey.substring(0, 10) + '...' + (apiKey.length > 20 ? apiKey.substring(apiKey.length - 5) : ''));
  console.log('API Key length:', apiKey.length);
  console.log('Is placeholder:', apiKey === 'your_openrouter_key' ? 'YES ⚠️' : 'NO');
  
  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'http://localhost:3001',
        'X-Title': 'PaintQuote Pro Test'
      },
      body: JSON.stringify({
        model: 'anthropic/claude-sonnet-4',
        messages: [
          { role: 'user', content: 'Say "Hello from OpenRouter!" if you can hear me.' }
        ],
        max_tokens: 50
      })
    });

    console.log('\nResponse status:', response.status);
    console.log('Response status text:', response.statusText);
    
    const responseText = await response.text();
    console.log('\nResponse body:');
    console.log(responseText);
    
    if (response.status === 401) {
      console.log('\n❌ ERROR: 401 Unauthorized - Invalid API key');
      console.log('Please set a valid OPENROUTER_API_KEY in your .env.local file');
      console.log('Get your API key from: https://openrouter.ai/');
    }
    
  } catch (error) {
    console.error('\nRequest failed:', error);
  }
}

// Load environment variables
require('dotenv').config({ path: '.env.local' });

// Run the test
testOpenRouterAPI();