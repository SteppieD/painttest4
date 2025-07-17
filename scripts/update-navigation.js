const fs = require('fs');
const path = require('path');

// List of files to update
const filesToUpdate = [
  // Auth pages
  'app/auth/signin/page.tsx',
  
  // Location pages
  'app/locations/phoenix/page.tsx',
  'app/locations/denver/page.tsx',
  'app/locations/orlando/page.tsx',
  'app/locations/san-diego/page.tsx',
  'app/locations/austin/page.tsx',
  'app/locations/las-vegas/page.tsx',
  'app/locations/charlotte/page.tsx',
  'app/locations/nashville/page.tsx',
  'app/locations/tampa/page.tsx',
  'app/locations/miami/page.tsx',
  
  // Landing/feature pages
  'app/painting-estimate-calculator-free/page.tsx',
  'app/interior-painting-quote-calculator/page.tsx',
  'app/exterior-painting-estimate-calculator/page.tsx',
  'app/painting-estimating-software/page.tsx',
  'app/painting-business-software/page.tsx',
  'app/paint-contractor-app/page.tsx',
  'app/commercial-painting-estimating-software/page.tsx',
  'app/mobile-painting-estimate-app/page.tsx',
  'app/painting-contractors/page.tsx',
  'app/painting-estimate-software/page.tsx',
  'app/how-to-quote-painting-jobs/page.tsx',
  'app/paint-estimate-templates/page.tsx',
  'app/painting-quote-templates/page.tsx',
  
  // Case study detail pages
  'app/case-studies/luxury-home-transformation/page.tsx',
  'app/case-studies/commercial-office-building/page.tsx',
  'app/case-studies/historic-restoration/page.tsx',
  'app/case-studies/hoa-community-project/page.tsx',
];

function updateFile(filePath) {
  const fullPath = path.join(__dirname, '..', filePath);
  
  try {
    let content = fs.readFileSync(fullPath, 'utf8');
    
    // Check if SharedNavigation is already imported
    if (content.includes('SharedNavigation')) {
      console.log(`✓ ${filePath} - Already has SharedNavigation`);
      return;
    }
    
    // Add import if not present
    if (!content.includes("import SharedNavigation from '@/components/shared-navigation'")) {
      // Find the last import statement
      const importMatches = content.match(/import[\s\S]*?from[\s\S]*?['"].*?['"]/g);
      if (importMatches) {
        const lastImport = importMatches[importMatches.length - 1];
        const lastImportIndex = content.lastIndexOf(lastImport);
        const insertPosition = lastImportIndex + lastImport.length;
        content = content.slice(0, insertPosition) + "\nimport SharedNavigation from '@/components/shared-navigation'" + content.slice(insertPosition);
      }
    }
    
    // Add SharedNavigation component after the return statement
    // Look for patterns like "return (" or "return <"
    const returnMatch = content.match(/return\s*[\(\<]/);
    if (returnMatch) {
      const returnIndex = content.indexOf(returnMatch[0]);
      const afterReturn = returnIndex + returnMatch[0].length;
      
      // Check if it's wrapped in a fragment or div
      const nextChar = content[afterReturn];
      if (nextChar === '<') {
        // Direct JSX element
        content = content.slice(0, afterReturn) + '\n      <>\n        <SharedNavigation />\n        ' + content.slice(afterReturn);
        
        // Find the corresponding closing tag and wrap it
        const componentMatch = content.match(/export\s+default\s+function\s+\w+/);
        if (componentMatch) {
          // Simple heuristic: find the last closing parenthesis before the closing brace
          const lastReturn = content.lastIndexOf(')\n}');
          if (lastReturn > 0) {
            content = content.slice(0, lastReturn) + '\n      </>\n    ' + content.slice(lastReturn);
          }
        }
      } else {
        // Already has parentheses
        content = content.slice(0, afterReturn) + '\n    <>\n      <SharedNavigation />\n      ' + content.slice(afterReturn);
        
        // Find the closing parenthesis
        let depth = 1;
        let i = afterReturn;
        while (i < content.length && depth > 0) {
          if (content[i] === '(') depth++;
          if (content[i] === ')') depth--;
          i++;
        }
        if (depth === 0) {
          content = content.slice(0, i - 1) + '\n    </>\n  ' + content.slice(i - 1);
        }
      }
      
      // Add pt-14 class to main content container to account for fixed header
      content = content.replace(/className="([^"]*min-h-screen[^"]*)"/, (match, classes) => {
        if (!classes.includes('pt-14')) {
          return `className="${classes} pt-14"`;
        }
        return match;
      });
    }
    
    fs.writeFileSync(fullPath, content);
    console.log(`✅ ${filePath} - Updated successfully`);
  } catch (error) {
    console.error(`❌ ${filePath} - Error: ${error.message}`);
  }
}

console.log('Starting navigation updates...\n');

filesToUpdate.forEach(file => {
  updateFile(file);
});

console.log('\nNavigation update complete!');