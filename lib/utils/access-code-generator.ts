/**
 * Generate a user-friendly access code from company name
 * Format: [CompanyAbbreviation][RandomNumber]
 * Examples: 
 *   "Bob's Painting" -> "BP1234"
 *   "Superior Paint Co" -> "SPC5678"
 *   "My Company" -> "MC9012"
 */
export function generateAccessCode(companyName: string): string {
  // Get abbreviation from company name
  const getAbbreviation = (name: string): string => {
    // Remove special characters and split into words
    const words = name
      .replace(/[^a-zA-Z0-9\s]/g, '')
      .trim()
      .split(/\s+/)
      .filter(word => word.length > 0);
    
    if (words.length === 0) {
      return 'PQ'; // Default to PaintQuote
    }
    
    if (words.length === 1) {
      // Single word: take first 2-3 letters
      const word = words[0].toUpperCase();
      return word.length >= 3 ? word.substring(0, 3) : word.padEnd(2, 'X');
    }
    
    // Multiple words: take first letter of each word (max 3 letters)
    const initials = words
      .slice(0, 3)
      .map(word => word[0].toUpperCase())
      .join('');
    
    return initials;
  };
  
  // Generate random 4-digit number
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  
  // Combine abbreviation and number
  const abbreviation = getAbbreviation(companyName);
  return `${abbreviation}${randomNum}`;
}

/**
 * Generate a simple numeric access code
 * Format: [Prefix][6-digit number]
 * Example: "PQ123456"
 */
export function generateSimpleAccessCode(): string {
  const randomNum = Math.floor(100000 + Math.random() * 900000);
  return `PQ${randomNum}`;
}