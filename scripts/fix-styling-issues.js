#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Color replacements for better contrast on dark backgrounds
const colorReplacements = {
  // Text colors
  'text-gray-500': 'text-gray-200',
  'text-gray-400': 'text-gray-200',
  'text-gray-300': 'text-gray-100',
  'text-muted-foreground': 'text-gray-200',
  
  // Hover states
  'hover:text-gray-400': 'hover:text-gray-100',
  'hover:text-gray-500': 'hover:text-gray-200',
  'hover:text-gray-300': 'hover:text-white',
  
  // Focus states
  'focus:text-gray-400': 'focus:text-gray-100',
  'focus:text-gray-500': 'focus:text-gray-200',
};

// Font size improvements
const fontSizeReplacements = {
  // Only replace text-xs and text-sm when they're not in specific contexts
  'text-xs': 'text-sm',
  'text-sm': 'text-base',
};

// Opacity replacements
const opacityReplacements = {
  'opacity-90': 'opacity-100',
  'opacity-75': 'opacity-100',
  'opacity-50': 'opacity-80',
  'text-opacity-90': 'text-opacity-100',
  'text-opacity-75': 'text-opacity-100',
};

// Button size replacements
const buttonSizeReplacements = {
  'size="sm"': 'size="default"',
  "size='sm'": "size='default'",
  'size={\"sm\"}': 'size={"default"}',
  "size={'sm'}": "size={'default'}",
};

// Glass card improvements
const glassCardReplacements = {
  'bg-white/5': 'bg-gray-900/80',
  'bg-white/10': 'bg-gray-900/70',
  'bg-black/5': 'bg-gray-900/90',
  'bg-black/10': 'bg-gray-900/80',
};

// Contexts where we should NOT replace font sizes
const fontSizeExceptions = [
  'footer',
  'copyright',
  'legal',
  'meta',
  'badge',
  'chip',
  'tag',
  'tooltip',
  'breadcrumb'
];

function shouldReplaceFontSize(line, className) {
  const lowerLine = line.toLowerCase();
  return !fontSizeExceptions.some(exception => lowerLine.includes(exception));
}

function processFile(_filePath) {
  console.log(`Processing: ${filePath}`);
  const content = fs.readFileSync(filePath, 'utf8');
  let changes = 0;
  const lines = content.split('\n');
  
  const processedLines = lines.map((line, index) => {
    let processedLine = line;
    
    // Replace colors
    Object.entries(colorReplacements).forEach(([oldClass, newClass]) => {
      const regex = new RegExp(`\\b${oldClass}\\b`, 'g');
      if (regex.test(processedLine)) {
        processedLine = processedLine.replace(regex, newClass);
        changes++;
      }
    });
    
    // Replace font sizes (with context awareness)
    Object.entries(fontSizeReplacements).forEach(([oldClass, newClass]) => {
      const regex = new RegExp(`\\b${oldClass}\\b`, 'g');
      if (regex.test(processedLine) && shouldReplaceFontSize(processedLine, oldClass)) {
        processedLine = processedLine.replace(regex, newClass);
        changes++;
      }
    });
    
    // Replace opacity
    Object.entries(opacityReplacements).forEach(([oldClass, newClass]) => {
      const regex = new RegExp(`\\b${oldClass}\\b`, 'g');
      if (regex.test(processedLine)) {
        processedLine = processedLine.replace(regex, newClass);
        changes++;
      }
    });
    
    // Replace button sizes
    Object.entries(buttonSizeReplacements).forEach(([oldAttr, newAttr]) => {
      if (processedLine.includes(oldAttr)) {
        processedLine = processedLine.replace(new RegExp(oldAttr, 'g'), newAttr);
        changes++;
      }
    });
    
    // Replace glass card backgrounds
    Object.entries(glassCardReplacements).forEach(([oldClass, newClass]) => {
      const regex = new RegExp(`\\b${oldClass}\\b`, 'g');
      if (regex.test(processedLine)) {
        processedLine = processedLine.replace(regex, newClass);
        changes++;
      }
    });
    
    return processedLine;
  });
  
  if (changes > 0) {
    const newContent = processedLines.join('\n');
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`  ✓ Made ${changes} replacements`);
    return changes;
  } else {
    console.log(`  - No changes needed`);
    return 0;
  }
}

function main() {
  console.log('🎨 Starting automated styling fixes...\n');
  
  // Find all TSX and JSX files
  const patterns = [
    'app/**/*.tsx',
    'app/**/*.jsx',
    'components/**/*.tsx',
    'components/**/*.jsx',
    'lib/**/*.tsx',
    'lib/**/*.jsx'
  ];
  
  let totalFiles = 0;
  let totalChanges = 0;
  
  patterns.forEach(pattern => {
    const files = glob.sync(pattern, { 
      ignore: ['**/node_modules/**', '**/.next/**']
    });
    
    files.forEach(file => {
      totalFiles++;
      const changes = processFile(file);
      totalChanges += changes;
    });
  });
  
  console.log('\n✅ Styling fixes complete!');
  console.log(`📊 Processed ${totalFiles} files`);
  console.log(`🔧 Made ${totalChanges} total replacements`);
  
  // Also update the modern-design-system.css file
  console.log('\n🎨 Updating CSS files...');
  updateCSSFiles();
}

function updateCSSFiles() {
  const cssFiles = [
    'styles/modern-design-system.css',
    'styles/contractor-theme.css'
  ];
  
  cssFiles.forEach(cssFile => {
    if (fs.existsSync(cssFile)) {
      console.log(`\nUpdating ${cssFile}...`);
      let content = fs.readFileSync(cssFile, 'utf8');
      
      // Update glass background values
      content = content.replace(/rgba\(255,\s*255,\s*255,\s*0\.05\)/g, 'rgba(30, 30, 30, 0.8)');
      content = content.replace(/rgba\(255,\s*255,\s*255,\s*0\.08\)/g, 'rgba(30, 30, 30, 0.8)');
      content = content.replace(/rgba\(255,\s*255,\s*255,\s*0\.1\)/g, 'rgba(30, 30, 30, 0.75)');
      content = content.replace(/rgba\(255,\s*255,\s*255,\s*0\.15\)/g, 'rgba(255, 255, 255, 0.25)');
      
      // Update muted foreground colors
      content = content.replace(/--muted-foreground:\s*[^;]+;/g, '--muted-foreground: 210 10% 70%;');
      
      fs.writeFileSync(cssFile, content, 'utf8');
      console.log('  ✓ Updated CSS file');
    }
  });
}

// Run the script
main();