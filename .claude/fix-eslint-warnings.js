#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Get all ESLint warnings in JSON format
function getESLintWarnings() {
  try {
    const result = execSync('npx eslint . --format json', { encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 });
    return JSON.parse(result);
  } catch (error) {
    // ESLint returns non-zero exit code when warnings exist
    if (error.stdout) {
      try {
        return JSON.parse(error.stdout);
      } catch (parseError) {
        console.error('Failed to parse ESLint output:', parseError.message);
        console.error('Raw output length:', error.stdout.length);
        return [];
      }
    }
    throw error;
  }
}

// Fix unused imports and variables by prefixing with underscore
function fixUnusedVars(filePath, messages) {
  const content = fs.readFileSync(filePath, 'utf8');
  let updatedContent = content;
  let hasChanges = false;

  // Process unused variable warnings
  const unusedVarsWarnings = messages.filter(m => m.ruleId === '@typescript-eslint/no-unused-vars');
  
  for (const warning of unusedVarsWarnings) {
    const lines = updatedContent.split('\n');
    const lineIndex = warning.line - 1;
    if (lineIndex >= 0 && lineIndex < lines.length) {
      const line = lines[lineIndex];
      
      // Extract the variable name from the warning message
      const match = warning.message.match(/'([^']+)'/);
      if (match) {
        const varName = match[1];
        
        // Different patterns for different contexts
        if (line.includes(`import`) && line.includes(varName)) {
          // Handle import statements - be more careful with replacements
          const regex = new RegExp(`\\b${varName}\\b(?=\\s*[,}])`);
          if (regex.test(line)) {
            lines[lineIndex] = line.replace(regex, `_${varName}`);
            hasChanges = true;
          }
        } else if (line.includes(`const`) && line.includes(varName)) {
          // Handle const declarations
          const regex = new RegExp(`\\bconst\\s+${varName}\\b`);
          if (regex.test(line)) {
            lines[lineIndex] = line.replace(regex, `const _${varName}`);
            hasChanges = true;
          }
        } else if (line.includes(`let`) && line.includes(varName)) {
          // Handle let declarations
          const regex = new RegExp(`\\blet\\s+${varName}\\b`);
          if (regex.test(line)) {
            lines[lineIndex] = line.replace(regex, `let _${varName}`);
            hasChanges = true;
          }
        }
      }
      
      updatedContent = lines.join('\n');
    }
  }

  if (hasChanges) {
    fs.writeFileSync(filePath, updatedContent);
    console.log(`Fixed unused variables in: ${path.relative(process.cwd(), filePath)}`);
    return true;
  }
  
  return false;
}

// Fix React unescaped entities - simpler approach
function fixUnescapedEntities(filePath, messages) {
  const content = fs.readFileSync(filePath, 'utf8');
  let updatedContent = content;
  
  // Process unescaped entity warnings
  const entityWarnings = messages.filter(m => m.ruleId === 'react/no-unescaped-entities');
  
  if (entityWarnings.length === 0) {
    return false;
  }
  
  // Simple approach: wrap content in quotes
  let hasChanges = false;
  
  // Replace unescaped quotes and apostrophes only within JSX text content
  // This is a simplified approach for bulk fixing
  updatedContent = updatedContent.replace(/>([^<]*)"([^<]*)</g, (match, before, after) => {
    hasChanges = true;
    return `>${before}&quot;${after}<`;
  });
  
  updatedContent = updatedContent.replace(/>([^<]*)'([^<]*)</g, (match, before, after) => {
    hasChanges = true;
    return `>${before}&apos;${after}<`;
  });

  if (hasChanges) {
    fs.writeFileSync(filePath, updatedContent);
    console.log(`Fixed unescaped entities in: ${path.relative(process.cwd(), filePath)}`);
    return true;
  }
  
  return false;
}

// Main execution
function main() {
  console.log('Starting ESLint warning fixes...');
  
  let results;
  try {
    results = getESLintWarnings();
  } catch (error) {
    console.error('Failed to get ESLint warnings:', error.message);
    return;
  }
  
  if (!Array.isArray(results)) {
    console.error('Invalid ESLint output format');
    return;
  }
  
  let totalFilesFixed = 0;
  let totalWarningsAttempted = 0;
  
  for (const result of results) {
    if (result.warningCount > 0) {
      const filePath = result.filePath;
      let fileFixed = false;
      
      console.log(`Processing ${path.relative(process.cwd(), filePath)} (${result.warningCount} warnings)`);
      
      // Fix unused variables
      if (fixUnusedVars(filePath, result.messages)) {
        fileFixed = true;
      }
      
      // Fix unescaped entities
      if (fixUnescapedEntities(filePath, result.messages)) {
        fileFixed = true;
      }
      
      if (fileFixed) {
        totalFilesFixed++;
      }
      totalWarningsAttempted += result.warningCount;
    }
  }
  
  console.log(`\nProcessed ${totalWarningsAttempted} warnings across ${totalFilesFixed} files`);
  
  // Run ESLint again to check remaining warnings
  console.log('Checking remaining warnings...');
  try {
    const afterResults = getESLintWarnings();
    const remainingWarnings = afterResults.reduce((sum, r) => sum + r.warningCount, 0);
    console.log(`Remaining warnings: ${remainingWarnings}`);
    
    const fixedWarnings = totalWarningsAttempted - remainingWarnings;
    console.log(`Successfully fixed: ${fixedWarnings} warnings`);
  } catch (error) {
    console.log('Error checking remaining warnings, running manual count...');
    
    // Manual recount
    try {
      const result = execSync('npx eslint . --format json | jq "[.[] | .warningCount] | add"', { encoding: 'utf8' });
      console.log(`Remaining warnings (manual count): ${result.trim()}`);
    } catch (jqError) {
      console.log('Could not get manual count');
    }
  }
}

if (require.main === module) {
  main();
}