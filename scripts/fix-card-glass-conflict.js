#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');

function processFile(_filePath) {
  console.log(`Processing: ${filePath}`);
  let content = fs.readFileSync(filePath, 'utf8');
  let changes = 0;
  
  // Pattern to match Card components with glass-card class
  // This regex captures the Card opening tag with glass-card and any other classes
  const cardGlassPattern = /<Card\s+className="([^"]*\b)?glass-card\b([^"]*)"/g;
  
  // Replace with proper glass styling without the glass-card class
  content = content.replace(cardGlassPattern, (match, before, after) => {
    changes++;
    before = before || '';
    after = after || '';
    
    // Remove any existing bg- classes to prevent conflicts
    const cleanedBefore = before.replace(/\bbg-[^\s]+/g, '').trim();
    const cleanedAfter = after.replace(/\bbg-[^\s]+/g, '').trim();
    
    // Build the new className
    const otherClasses = [cleanedBefore, cleanedAfter].filter(Boolean).join(' ');
    
    return `<Card className="bg-gray-900/80 backdrop-filter backdrop-blur-md ${otherClasses}"`;
  });
  
  // Also handle the case where glass-card might be added with other utilities
  const divGlassPattern = /<div\s+className="([^"]*\b)?glass-card\b([^"]*)"([^>]*)>/g;
  
  content = content.replace(divGlassPattern, (match, before, after, rest) => {
    // Only replace if this div has card-like classes
    if (match.includes('rounded') || match.includes('border') || match.includes('p-')) {
      changes++;
      before = before || '';
      after = after || '';
      
      const cleanedBefore = before.replace(/\bbg-[^\s]+/g, '').trim();
      const cleanedAfter = after.replace(/\bbg-[^\s]+/g, '').trim();
      const otherClasses = [cleanedBefore, cleanedAfter].filter(Boolean).join(' ');
      
      return `<div className="bg-gray-900/80 backdrop-filter backdrop-blur-md ${otherClasses}"${rest}>`;
    }
    return match;
  });
  
  if (changes > 0) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`  ✓ Fixed ${changes} glass-card conflicts`);
    return changes;
  } else {
    console.log(`  - No changes needed`);
    return 0;
  }
}

function main() {
  console.log('🎨 Fixing Card component glass-card conflicts...\n');
  
  const patterns = [
    'app/**/*.tsx',
    'app/**/*.jsx',
    'components/**/*.tsx',
    'components/**/*.jsx'
  ];
  
  let totalFiles = 0;
  let totalChanges = 0;
  
  patterns.forEach(pattern => {
    const files = glob.sync(pattern, { 
      ignore: ['**/node_modules/**', '**/.next/**']
    });
    
    files.forEach(file => {
      // Only process files that might have the issue
      const content = fs.readFileSync(file, 'utf8');
      if (content.includes('glass-card') && content.includes('<Card')) {
        totalFiles++;
        const changes = processFile(file);
        totalChanges += changes;
      }
    });
  });
  
  console.log('\n✅ Card glass-card conflict fixes complete!');
  console.log(`📊 Processed ${totalFiles} files`);
  console.log(`🔧 Fixed ${totalChanges} conflicts`);
}

// Run the script
main();