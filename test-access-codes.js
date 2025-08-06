// Test the new 7-character access code generation
const { generateAccessCode } = require('./lib/utils/access-code-generator.ts');

const testCases = [
  "Bob's Painting",
  "Superior Paint Co",
  "My Company",
  "ABC",
  "Joe's",
  "Professional Painters LLC",
  "A1 Painting",
  "Best Paint Services",
  "XYZ",
  "Johnson & Sons Painting"
];

console.log("Testing 7-character access code generation:\n");
console.log("Company Name -> Access Code");
console.log("-".repeat(40));

testCases.forEach(companyName => {
  const code = generateAccessCode(companyName);
  console.log(`${companyName.padEnd(30)} -> ${code} (${code.length} chars)`);
});

// Test consistency - generate multiple codes for same company
console.log("\nMultiple codes for 'Bob's Painting':");
for (let i = 0; i < 5; i++) {
  const code = generateAccessCode("Bob's Painting");
  console.log(`  ${code}`);
}