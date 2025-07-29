# ESLint Warning Resolution Agents

This directory contains specialized Claude Code agents designed to systematically fix ESLint warnings in your codebase.

## Available Agents

### 1. eslint-warning-orchestrator
**Purpose**: Master coordinator that manages the execution of all other agents
**When to use**: Run this first to fix all ESLint warnings systematically

### 2. unused-import-cleanup
**Purpose**: Removes unused imports from TypeScript/TSX files
**Fixes**: `@typescript-eslint/no-unused-vars` warnings for imports

### 3. jsx-entity-escaper
**Purpose**: Fixes unescaped entities in JSX text content
**Fixes**: `react/no-unescaped-entities` warnings

### 4. typescript-type-improver
**Purpose**: Replaces `any` types with specific type annotations
**Fixes**: `@typescript-eslint/no-explicit-any` warnings

### 5. react-hook-dependency-fixer
**Purpose**: Adds missing dependencies to React hooks
**Fixes**: `react-hooks/exhaustive-deps` warnings

## How to Use

### Option 1: Fix All Warnings (Recommended)
```
/eslint-warning-orchestrator
```
This will run all agents in the optimal order and generate a comprehensive report.

### Option 2: Fix Specific Warning Types
Run individual agents as needed:
```
/unused-import-cleanup
/jsx-entity-escaper
/typescript-type-improver
/react-hook-dependency-fixer
```

## Expected Results

Based on your current warnings:
- **Before**: 1000+ ESLint warnings
- **After**: <50 warnings (mostly edge cases requiring manual review)

## Safety Features

- All agents are conservative and won't break existing functionality
- Each agent validates its changes before committing
- The orchestrator runs ESLint after each phase to catch issues
- Detailed reports show exactly what was changed

## Next Steps

1. Run `/eslint-warning-orchestrator` to fix all warnings
2. Review the generated report
3. Manually address any remaining warnings
4. Commit the changes once verified

## Notes

- The agents work on TypeScript (.ts, .tsx) files
- Side-effect imports and critical code patterns are preserved
- Each agent generates detailed logs of its actions
- Files are processed in batches for efficiency