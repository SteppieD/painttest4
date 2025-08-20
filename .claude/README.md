# Claude Configuration Directory

This directory contains configuration and reference files for AI assistants working on the PaintQuote Pro project.

## 📁 AI Reference Files

The following files in the project root are essential for AI assistants:

1. **CLAUDE.md** - Primary AI assistant guide (START HERE)
2. **AI_QUICK_REFERENCE.md** - Quick command reference card
3. **IMPLEMENTATION.md** - Complete system architecture
4. **DEPLOYMENT_WORKFLOW.md** - Deployment procedures
5. **GIT_WORKFLOW_SUMMARY.md** - Git workflow guide
6. **CLI_TOOLS_GUIDE.md** - Available CLI tools

## 🎯 Quick Start for AI Assistants

```bash
# First time in session:
cat CLAUDE.md           # Read the main guide
npm run cli status      # Check project status

# Start working:
git checkout dev        # Ensure on dev branch
npm run dev            # Start development
```

## 🔄 Standard Workflow

1. Read CLAUDE.md
2. Check branch (`git branch`)
3. Pull latest (`git pull origin dev`)
4. Make changes
5. Test locally (`npm run dev`)
6. Check quality (`npm run cli check`)
7. Test in Docker (`npm run docker:test`)
8. Deploy (`npm run deploy`)

## 📊 Project Configuration

- **MCP Setup**: Configured with Serena MCP
- **Development Port**: 3005
- **Docker Test Port**: 3000
- **Branch Strategy**: dev → main → Vercel
- **Primary Language**: TypeScript
- **Framework**: Next.js 14

## 🔐 Local Settings

The `settings.local.json` file in this directory contains project-specific Claude settings that override global settings.

---

*This directory is maintained for AI assistant reference*
*Last Updated: 2025-08-20*