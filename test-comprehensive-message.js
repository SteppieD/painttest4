const { quoteAssistant } = require('./lib/ai/quote-assistant');

// Test comprehensive message detection
const testMessage = "It's for Cici at 9090 Hillside Drive. We are not painting the ceilings. The project is a 500 linear feet of interior painting. $50 a gallon bucket eggshell shirwin williams. spread rate is 350 square feet per gallon. Ceilings are 9 feet tall. We are not painting doors, or trim or windows. No primer. labour is included in the cost per square foot at $1.50.";

console.log('Testing comprehensive message detection...');
console.log('Message:', testMessage);
console.log('Is comprehensive?', quoteAssistant.isComprehensiveMessage(testMessage));

// Test parsing without API call
const mockParseQuoteInformation = (text) => {
  const result = {};
  
  // Extract customer name
  const nameMatch = text.match(/for\s+(\w+)\s+at/i);
  if (nameMatch) result.customerName = nameMatch[1];
  
  // Extract address
  const addressMatch = text.match(/at\s+([^.]+)\./i);
  if (addressMatch) result.address = addressMatch[1].trim();
  
  // Extract linear feet
  const linearFeetMatch = text.match(/(\d+)\s*linear\s*feet/i);
  if (linearFeetMatch) {
    const linearFeet = parseInt(linearFeetMatch[1]);
    const ceilingMatch = text.match(/(\d+)\s*feet?\s*tall/i);
    const ceilingHeight = ceilingMatch ? parseInt(ceilingMatch[1]) : 8;
    
    result.measurements = {
      linearFeetWalls: linearFeet,
      ceilingHeight: ceilingHeight,
      wallSqft: linearFeet * ceilingHeight
    };
  }
  
  // Extract paint details
  const paintMatch = text.match(/\$(\d+)\s*a?\s*gallon/i);
  const coverageMatch = text.match(/(\d+)\s*square\s*feet\s*per\s*gallon/i);
  
  if (paintMatch || coverageMatch) {
    result.paintProducts = {
      walls: {
        name: 'Sherwin Williams Eggshell',
        costPerGallon: paintMatch ? parseInt(paintMatch[1]) : 50,
        coverageRate: coverageMatch ? parseInt(coverageMatch[1]) : 350
      }
    };
  }
  
  // Extract surfaces
  const notPaintingMatch = text.match(/not\s*painting\s*([^.]+)/gi);
  if (notPaintingMatch) {
    result.surfaces = ['walls']; // Only walls if other surfaces excluded
  }
  
  // Extract labor rate
  const laborMatch = text.match(/\$([0-9.]+)\s*per\s*square\s*foot/i);
  if (laborMatch) {
    result.laborRate = parseFloat(laborMatch[1]);
  }
  
  result.projectType = 'interior';
  result.prepWork = 'good'; // No primer mentioned
  
  return result;
};

console.log('\nParsed information:');
console.log(JSON.stringify(mockParseQuoteInformation(testMessage), null, 2));