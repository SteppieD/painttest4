/**
 * Generate a user-friendly 7-character access code from company name
 * Format: [CompanyLetters][RandomNumbers] = 7 total characters
 * Examples: 
 *   "Bob's Painting" -> "BOBS123"
 *   "Superior Paint Co" -> "SUPE456"
 *   "My Company" -> "MYCO789"
 *   "ABC" -> "ABC1234"
 */
export function generateAccessCode(companyName: string): string {
  // Get letters from company name for the access code
  const getCompanyLetters = (name: string): string => {
    // Remove special characters and numbers, keep only letters
    const cleanName = name
      .replace(/[^a-zA-Z]/g, '')
      .toUpperCase()
      .trim();
    
    if (cleanName.length === 0) {
      return 'PAINT'; // Default to PAINT if no letters
    }
    
    // Take first 3-5 characters depending on what makes sense
    if (cleanName.length <= 3) {
      // Short name: use all letters (ABC -> ABC)
      return cleanName;
    } else if (cleanName.length === 4) {
      // 4 letter name: use all 4 (BOBS -> BOBS)
      return cleanName;
    } else {
      // Longer name: take first 4 letters (SUPERIOR -> SUPE)
      // But try to break at word boundary if possible
      const words = name
        .replace(/[^a-zA-Z\s]/g, '')
        .trim()
        .split(/\s+/);
      
      if (words.length > 1 && words[0].length <= 4) {
        // If first word is 4 letters or less, use it
        return words[0].toUpperCase().substring(0, 4);
      }
      
      // Otherwise just take first 4 letters
      return cleanName.substring(0, 4);
    }
  };
  
  // Get the company letters part
  const companyPart = getCompanyLetters(companyName);
  
  // Calculate how many digits we need to make 7 total
  const digitsNeeded = 7 - companyPart.length;
  
  // Generate random number with the right amount of digits
  let randomNum: string;
  if (digitsNeeded <= 0) {
    // Company part is already 7+ chars, truncate to 7
    return companyPart.substring(0, 7);
  } else if (digitsNeeded === 1) {
    randomNum = Math.floor(Math.random() * 10).toString();
  } else if (digitsNeeded === 2) {
    randomNum = Math.floor(10 + Math.random() * 90).toString();
  } else if (digitsNeeded === 3) {
    randomNum = Math.floor(100 + Math.random() * 900).toString();
  } else if (digitsNeeded === 4) {
    randomNum = Math.floor(1000 + Math.random() * 9000).toString();
  } else {
    // 5+ digits needed (company name was very short)
    const min = Math.pow(10, digitsNeeded - 1);
    const max = Math.pow(10, digitsNeeded) - 1;
    randomNum = Math.floor(min + Math.random() * (max - min)).toString();
  }
  
  // Combine to make exactly 7 characters
  return `${companyPart}${randomNum}`;
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