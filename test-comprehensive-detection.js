// Test comprehensive message detection logic
const testMessage = "It's for Cici at 9090 Hillside Drive. We are not painting the ceilings. The project is a 500 linear feet of interior painting. $50 a gallon bucket eggshell shirwin williams. spread rate is 350 square feet per gallon. Ceilings are 9 feet tall. We are not painting doors, or trim or windows. No primer. labour is included in the cost per square foot at $1.50.";

// Replicate the isComprehensiveMessage logic
function isComprehensiveMessage(message) {
  const indicators = [
    /\d+\s*(linear\s*)?feet/i,
    /\$\d+\s*(a|per)?\s*gallon/i,
    /\d+\s*(ft|feet|foot)\s*(tall|high|ceiling)/i,
    /spread\s*rate/i,
    /not\s*painting/i,
    /square\s*feet\s*per\s*gallon/i
  ];
  
  const matchCount = indicators.filter(pattern => pattern.test(message)).length;
  console.log('\nChecking indicators:');
  indicators.forEach((pattern, i) => {
    const matches = pattern.test(message);
    console.log(`${i + 1}. ${pattern.toString()}: ${matches ? '✓' : '✗'}`);
  });
  console.log(`\nTotal matches: ${matchCount}/6`);
  
  return matchCount >= 3; // If message contains 3+ indicators, it's comprehensive
}

console.log('Testing comprehensive message detection...');
console.log('Message:', testMessage);
console.log('\nIs comprehensive?', isComprehensiveMessage(testMessage));

// Test parsing logic
function parseComprehensiveMessage(text) {
  const result = {};
  
  // Extract customer name
  const nameMatch = text.match(/for\s+(\w+)\s+at/i);
  if (nameMatch) result.customerName = nameMatch[1];
  
  // Extract address
  const addressMatch = text.match(/at\s+([^.]+)\./i);
  if (addressMatch) result.address = addressMatch[1].trim();
  
  // Extract linear feet and calculate wall sqft
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
  
  // Determine surfaces (what to paint)
  const notPaintingCeilings = /not\s*painting\s*(the\s*)?ceiling/i.test(text);
  const notPaintingDoors = /not\s*painting.*doors/i.test(text);
  const notPaintingTrim = /not\s*painting.*trim/i.test(text);
  const notPaintingWindows = /not\s*painting.*windows/i.test(text);
  
  result.surfaces = ['walls']; // Always painting walls
  if (!notPaintingCeilings) result.surfaces.push('ceilings');
  if (!notPaintingDoors) result.surfaces.push('doors');
  if (!notPaintingTrim) result.surfaces.push('trim');
  if (!notPaintingWindows) result.surfaces.push('windows');
  
  // Extract labor rate
  const laborMatch = text.match(/\$([0-9.]+)\s*per\s*square\s*foot/i);
  if (laborMatch) {
    result.laborRate = parseFloat(laborMatch[1]);
  }
  
  // Set defaults
  result.projectType = 'interior';
  result.prepWork = text.toLowerCase().includes('no primer') ? 'good' : 'minor';
  
  return result;
}

console.log('\n\nParsed information:');
console.log(JSON.stringify(parseComprehensiveMessage(testMessage), null, 2));