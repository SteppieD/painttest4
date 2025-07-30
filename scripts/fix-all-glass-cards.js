#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');

function processFile(filePath) {
  console.log(`Processing: ${filePath}`);
  let content = fs.readFileSync(filePath, 'utf8');
  let changes = 0;
  
  // Pattern to match div elements with glass-card class
  const patterns = [
    // Pattern 1: Simple glass-card
    {
      regex: /<div className="glass-card([^"]*)"/g,
      replacement: '<div className="bg-gray-900/80 backdrop-filter backdrop-blur-md border border-white/20 rounded-lg$1"'
    },
    // Pattern 2: glass-card with other classes before
    {
      regex: /<div className="([^"]*?)glass-card([^"]*)"/g,
      replacement: (match, before, after) => {
        const cleanedBefore = before.replace(/\bbg-[^\s]+/g, '').trim();
        return `<div className="${cleanedBefore} bg-gray-900/80 backdrop-filter backdrop-blur-md border border-white/20 rounded-lg${after}"`;
      }
    },
    // Pattern 3: glass-card in JSX with dynamic classes
    {
      regex: /className={\`([^}]*?)glass-card([^}]*?)\`}/g,
      replacement: (match, before, after) => {
        const cleanedBefore = before.replace(/\bbg-[^\s]+/g, '').trim();
        return `className={\`${cleanedBefore} bg-gray-900/80 backdrop-filter backdrop-blur-md border border-white/20 rounded-lg${after}\`}`;
      }
    }
  ];
  
  // Apply all patterns
  patterns.forEach(({ regex, replacement }) => {
    if (typeof replacement === 'string') {
      const matches = content.match(regex);
      if (matches) {
        content = content.replace(regex, replacement);
        changes += matches.length;
      }
    } else {
      content = content.replace(regex, (match, ...args) => {
        changes++;
        return replacement(match, ...args);
      });
    }
  });
  
  // Also fix section elements with glass-card
  const sectionPattern = /<section className="([^"]*?)glass-card([^"]*)"/g;
  content = content.replace(sectionPattern, (match, before, after) => {
    changes++;
    const cleanedBefore = before.replace(/\bbg-[^\s]+/g, '').trim();
    return `<section className="${cleanedBefore} bg-gray-900/80 backdrop-filter backdrop-blur-md border border-white/20 rounded-lg${after}"`;
  });
  
  if (changes > 0) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`  ✓ Fixed ${changes} glass-card instances`);
    return changes;
  } else {
    console.log(`  - No changes needed`);
    return 0;
  }
}

function main() {
  console.log('🎨 Fixing all remaining glass-card issues...\n');
  
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
      const content = fs.readFileSync(file, 'utf8');
      if (content.includes('glass-card')) {
        totalFiles++;
        const changes = processFile(file);
        totalChanges += changes;
      }
    });
  });
  
  console.log('\n✅ Glass-card fixes complete!');
  console.log(`📊 Processed ${totalFiles} files`);
  console.log(`🔧 Fixed ${totalChanges} instances`);
}

// Run the script
main();