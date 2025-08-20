#!/usr/bin/env node

/**
 * PaintQuote Pro CLI
 * Custom command-line interface for project management
 */

const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')
const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

// Color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
}

// Helper functions
const log = {
  info: (msg) => console.log(`${colors.blue}ℹ${colors.reset} ${msg}`),
  success: (msg) => console.log(`${colors.green}✓${colors.reset} ${msg}`),
  warning: (msg) => console.log(`${colors.yellow}⚠${colors.reset} ${msg}`),
  error: (msg) => console.log(`${colors.red}✗${colors.reset} ${msg}`),
  title: (msg) => console.log(`\n${colors.bright}${colors.cyan}${msg}${colors.reset}\n`),
}

const exec = (command, silent = false) => {
  try {
    const result = execSync(command, { encoding: 'utf8', stdio: silent ? 'pipe' : 'inherit' })
    return result
  } catch (error) {
    if (!silent) {
      log.error(`Command failed: ${command}`)
    }
    return null
  }
}

const question = (prompt) => {
  return new Promise((resolve) => {
    rl.question(prompt, (answer) => {
      resolve(answer)
    })
  })
}

// CLI Commands
const commands = {
  // Development commands
  dev: {
    description: 'Start development server',
    action: () => {
      log.info('Starting development server on port 3005...')
      exec('npm run dev')
    },
  },
  
  'dev:turbo': {
    description: 'Start development server with Turbopack',
    action: () => {
      log.info('Starting Turbopack development server...')
      exec('npm run dev:turbo')
    },
  },

  // Database commands
  'db:studio': {
    description: 'Open Prisma Studio',
    action: () => {
      log.info('Opening Prisma Studio...')
      exec('npx prisma studio')
    },
  },

  'db:reset': {
    description: 'Reset database (warning: deletes all data)',
    action: async () => {
      const confirm = await question(
        `${colors.yellow}⚠ This will delete all data. Are you sure? (yes/no): ${colors.reset}`
      )
      if (confirm.toLowerCase() === 'yes') {
        log.info('Resetting database...')
        exec('npx prisma migrate reset --force')
        log.success('Database reset complete')
      } else {
        log.info('Database reset cancelled')
      }
    },
  },

  // Code quality commands
  check: {
    description: 'Run all checks (lint, format, typecheck)',
    action: () => {
      log.title('Running Code Quality Checks')
      
      log.info('TypeScript check...')
      const tsResult = exec('npm run typecheck', true)
      if (tsResult !== null) log.success('TypeScript: No errors')
      
      log.info('ESLint check...')
      const lintResult = exec('npm run lint', true)
      if (lintResult !== null) log.success('ESLint: No issues')
      
      log.info('Prettier check...')
      const formatResult = exec('npm run format:check', true)
      if (formatResult !== null) log.success('Formatting: Consistent')
      
      log.title('All checks complete!')
    },
  },

  fix: {
    description: 'Auto-fix code issues (lint + format)',
    action: () => {
      log.info('Auto-fixing code issues...')
      exec('npm run lint:fix')
      exec('npm run format')
      log.success('Code fixes applied')
    },
  },

  // Testing commands
  test: {
    description: 'Run all tests',
    action: () => {
      log.info('Running test suite...')
      exec('npm run test:all')
    },
  },

  // Deployment commands
  deploy: {
    description: 'Deploy to production (Vercel)',
    action: async () => {
      log.title('Production Deployment')
      
      // Run checks first
      log.info('Running pre-deployment checks...')
      const checksPass = exec('npm run typecheck', true) !== null
      
      if (!checksPass) {
        log.error('Pre-deployment checks failed. Fix issues before deploying.')
        return
      }
      
      const confirm = await question(
        `${colors.yellow}Deploy to production? (yes/no): ${colors.reset}`
      )
      
      if (confirm.toLowerCase() === 'yes') {
        log.info('Building and deploying...')
        exec('vercel --prod')
        log.success('Deployment complete!')
      } else {
        log.info('Deployment cancelled')
      }
    },
  },

  // Utility commands
  clean: {
    description: 'Clean build artifacts and caches',
    action: () => {
      log.info('Cleaning project...')
      exec('npm run clean')
      log.success('Project cleaned')
    },
  },

  deps: {
    description: 'Check for dependency updates',
    action: () => {
      log.info('Checking dependencies...')
      exec('npm run deps:check')
    },
  },

  analyze: {
    description: 'Analyze bundle size',
    action: () => {
      log.info('Analyzing bundle...')
      exec('npm run analyze')
    },
  },

  // Project info commands
  status: {
    description: 'Show project status',
    action: () => {
      log.title('PaintQuote Pro Status')
      
      // Check git status
      const gitStatus = exec('git status --short', true)
      if (gitStatus && gitStatus.trim()) {
        log.warning('Uncommitted changes:')
        console.log(gitStatus)
      } else {
        log.success('Git: Clean working directory')
      }
      
      // Check node version
      const nodeVersion = exec('node --version', true)
      log.info(`Node version: ${nodeVersion.trim()}`)
      
      // Check database
      const dbUrl = process.env.DATABASE_URL
      if (dbUrl) {
        log.success('Database: Configured')
      } else {
        log.warning('Database: Not configured (check .env)')
      }
      
      // Check for .env file
      if (fs.existsSync('.env')) {
        log.success('Environment: .env file found')
      } else {
        log.warning('Environment: .env file missing')
      }
    },
  },

  help: {
    description: 'Show this help message',
    action: () => {
      log.title('PaintQuote Pro CLI Commands')
      
      const categories = {
        Development: ['dev', 'dev:turbo'],
        Database: ['db:studio', 'db:reset'],
        'Code Quality': ['check', 'fix'],
        Testing: ['test'],
        Deployment: ['deploy'],
        Utilities: ['clean', 'deps', 'analyze', 'status'],
      }
      
      Object.entries(categories).forEach(([category, cmds]) => {
        console.log(`\n${colors.bright}${category}:${colors.reset}`)
        cmds.forEach((cmd) => {
          const desc = commands[cmd].description
          console.log(`  ${colors.green}${cmd.padEnd(15)}${colors.reset} ${desc}`)
        })
      })
      
      console.log(`\n${colors.cyan}Usage: npm run cli <command>${colors.reset}`)
    },
  },
}

// Main CLI logic
const main = async () => {
  const args = process.argv.slice(2)
  const command = args[0]
  
  if (!command || command === 'help') {
    commands.help.action()
  } else if (commands[command]) {
    await commands[command].action()
  } else {
    log.error(`Unknown command: ${command}`)
    log.info('Run "npm run cli help" to see available commands')
  }
  
  rl.close()
}

// Run CLI
main().catch((error) => {
  log.error(`CLI Error: ${error.message}`)
  rl.close()
  process.exit(1)
})