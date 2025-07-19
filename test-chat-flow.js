const fetch = require('node-fetch');

// Test the chat endpoint with comprehensive message
async function testChatEndpoint() {
  const comprehensiveMessage = "It's for Cici at 9090 Hillside Drive. We are not painting the ceilings. The project is a 500 linear feet of interior painting. $50 a gallon bucket eggshell shirwin williams. spread rate is 350 square feet per gallon. Ceilings are 9 feet tall. We are not painting doors, or trim or windows. No primer. labour is included in the cost per square foot at $1.50.";

  console.log('Testing chat endpoint with comprehensive message...\n');
  
  try {
    const response = await fetch('http://localhost:3001/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: comprehensiveMessage,
        sessionId: 'test-session-' + Date.now()
      })
    });

    const data = await response.json();
    
    console.log('Response status:', response.status);
    console.log('\nResponse data:');
    console.log(JSON.stringify(data, null, 2));
    
    // Check if it fell back to error handler
    if (data.response && data.response.includes("I apologize, but I'm having trouble")) {
      console.log('\n⚠️  ISSUE DETECTED: AI fell back to error handler');
      console.log('This happens when the OpenRouter API call fails');
      
      if (data.error) {
        console.log('\nError details:', data.error);
      }
    }
    
    // Check metrics
    if (data.metrics) {
      console.log('\nMetrics:');
      console.log('- AI enabled:', data.metrics.aiEnabled);
      console.log('- Processing time:', data.metrics.processingTime + 'ms');
    }
    
  } catch (error) {
    console.error('Request failed:', error);
  }
}

// Run the test
testChatEndpoint();