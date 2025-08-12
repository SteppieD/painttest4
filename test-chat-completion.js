// Test script to verify chat completion detection
const { quoteAssistant } = require('./lib/ai/quote-assistant');

// Test messages that should trigger completion
const completionMessages = [
  "call it complete",
  "nope",
  "that's all",
  "we're done",
  "finalize it",
  "complete the quote"
];

console.log('Testing isReadyToReview detection:');
console.log('==================================');
completionMessages.forEach(msg => {
  const result = quoteAssistant.isReadyToReview(msg);
  console.log(`"${msg}" -> ${result ? '✅ DETECTED' : '❌ NOT DETECTED'}`);
});

// Test AI responses that should be recognized as complete
const aiResponses = [
  "Perfect! Quote is finalized at $10,860 for 6,300 square feet of interior walls. Have a great day!",
  "Quote complete! Total: $5,500. Ready for review!",
  "Your quote is ready: $3,200 total",
  "Here's your final quote breakdown: Materials $1,000, Labor $2,000, Total $3,000"
];

console.log('\nTesting isQuoteComplete detection:');
console.log('===================================');
aiResponses.forEach(response => {
  const result = quoteAssistant.isQuoteComplete(response);
  console.log(`Response containing "${response.substring(0, 40)}..." -> ${result ? '✅ COMPLETE' : '❌ NOT COMPLETE'}`);
});