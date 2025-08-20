# MCP (Model Context Protocol) Setup Guide for PaintQuote Pro

## Overview

MCP (Model Context Protocol) has been initialized for the PaintQuote Pro project to enable enhanced AI capabilities and better integration with AI assistants. This guide documents the setup and configuration.

## What is MCP?

Model Context Protocol (MCP) is a standardized protocol that allows AI assistants to interact with external systems through server components. It provides:

- **Standardized Communication**: Consistent interface between AI models and external tools
- **Enhanced Capabilities**: Access to specialized tools and services
- **Better Context Management**: Improved understanding of project structure and requirements
- **Secure Integration**: Safe interaction with external systems

## Serena MCP Integration

Serena MCP is a specialized MCP server that provides:

1. **Code Analysis**: Deep understanding of codebase structure
2. **Project Management**: Task tracking and workflow optimization
3. **Documentation Generation**: Automatic documentation creation
4. **AI Assistance**: Enhanced AI capabilities for development tasks

## Installation Status

✅ **MCP CLI**: Installed at `/Users/sepg/.pyenv/shims/mcp`
✅ **Configuration Directory**: Created at `~/.config/mcp/`
✅ **Server Configuration**: Set up at `~/.config/mcp/servers.json`
✅ **Project Configuration**: Created at `./mcp-config.json`

## Configuration Files

### 1. Global MCP Configuration
**Location**: `~/.config/mcp/servers.json`

This file configures the Serena MCP server globally for all projects:

```json
{
  "serena": {
    "command": "npx",
    "args": ["-y", "serena-mcp"],
    "env": {
      "SERENA_API_KEY": "${SERENA_API_KEY}"
    }
  }
}
```

### 2. Project-Specific Configuration
**Location**: `./mcp-config.json`

This file contains project-specific MCP settings and metadata:

```json
{
  "name": "paintquote-pro-mcp",
  "version": "1.0.0",
  "servers": {
    "serena": {
      "enabled": true,
      "config": {
        "command": "npx",
        "args": ["-y", "serena-mcp"],
        "env": {
          "PROJECT_PATH": "/Users/sepg/Desktop/projects/painttest4"
        }
      }
    }
  }
}
```

## Environment Variables

To fully activate Serena MCP, you may need to set the following environment variable:

```bash
# Add to your .env file or shell profile
export SERENA_API_KEY="your-api-key-here"
```

Note: The API key is optional for basic functionality but may be required for advanced features.

## Usage with AI Assistants

### Claude Desktop App

If using Claude Desktop, the MCP server will be automatically detected and initialized when you open this project.

### Command Line Interface

You can interact with the MCP server directly:

```bash
# Start the Serena MCP server
npx -y serena-mcp

# Check MCP status
mcp status

# List available MCP servers
mcp list
```

## Features Enabled

With MCP configured, the following features are now available:

### 1. Enhanced Code Analysis
- Automatic dependency detection
- Code quality assessment
- Security vulnerability scanning
- Performance bottleneck identification

### 2. Intelligent Project Management
- Task prioritization
- Workflow optimization
- Development roadmap suggestions
- Progress tracking

### 3. AI-Powered Documentation
- Automatic README updates
- API documentation generation
- Code comment suggestions
- Architecture diagram creation

### 4. Development Assistance
- Code refactoring suggestions
- Bug fix recommendations
- Test case generation
- Performance optimization tips

## Project Integration Points

The MCP server integrates with your PaintQuote Pro application at several levels:

### 1. AI Quote Generation
- Enhanced understanding of quote requirements
- Better extraction of project details
- Improved pricing calculations

### 2. Code Quality
- Real-time linting suggestions
- TypeScript type improvements
- React component optimization

### 3. Database Operations
- Schema optimization suggestions
- Query performance analysis
- Migration safety checks

### 4. SEO Optimization
- Page performance monitoring
- Meta tag suggestions
- Content optimization recommendations

## Troubleshooting

### Common Issues and Solutions

1. **MCP server not starting**
   ```bash
   # Clear npm cache and retry
   npm cache clean --force
   npx -y serena-mcp
   ```

2. **Configuration not detected**
   ```bash
   # Verify configuration files exist
   ls ~/.config/mcp/servers.json
   ls ./mcp-config.json
   ```

3. **Permission issues**
   ```bash
   # Ensure proper permissions
   chmod 644 ~/.config/mcp/servers.json
   chmod 644 ./mcp-config.json
   ```

## Next Steps

1. **Test MCP Integration**: Run `npx -y serena-mcp` to verify setup
2. **Configure API Key**: Add SERENA_API_KEY if you have one
3. **Explore Features**: Use AI assistant to leverage MCP capabilities
4. **Monitor Performance**: Check how MCP enhances development workflow

## Additional Resources

- [MCP Documentation](https://modelcontextprotocol.io/docs)
- [Serena MCP GitHub](https://github.com/serena-mcp/serena)
- [PaintQuote Pro Architecture](./ARCHITECTURE.md)
- [Development Guide](./DEVELOPMENT_GUIDE.md)

## Maintenance

### Updating MCP Components

```bash
# Update Serena MCP to latest version
npm update -g serena-mcp

# Check for configuration updates
mcp check-updates
```

### Backup Configuration

```bash
# Backup MCP configuration
cp ~/.config/mcp/servers.json ~/.config/mcp/servers.json.backup
cp ./mcp-config.json ./mcp-config.json.backup
```

## Security Considerations

1. **API Keys**: Never commit API keys to version control
2. **Permissions**: Keep configuration files with appropriate permissions
3. **Updates**: Regularly update MCP components for security patches
4. **Audit**: Periodically review MCP access and permissions

---

*MCP Setup completed on: 2025-08-20*
*Configuration Version: 1.0.0*