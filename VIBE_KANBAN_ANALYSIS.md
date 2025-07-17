# Vibe Kanban Analysis - Building an AI Agent Orchestration Tool

## Overview

Vibe Kanban is a sophisticated task management system designed specifically for orchestrating AI coding agents like Claude Code, Gemini CLI, Codex, and Amp. Here's a comprehensive analysis for building a similar tool.

## Architecture

### Tech Stack
- **Backend**: Rust with Axum web framework
  - SQLite database with SQLx ORM
  - Tokio async runtime
  - MCP (Model Context Protocol) server integration
  - WebSocket support for real-time updates
  
- **Frontend**: React 18 + TypeScript
  - Vite for development
  - shadcn/ui components
  - Tailwind CSS for styling
  - Real-time task status updates

- **Shared Types**: ts-rs for generating TypeScript types from Rust structs
  - Ensures type safety between frontend and backend
  - Auto-generated shared types

### Key Components

#### 1. Task Management System
```typescript
interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'review' | 'done';
  assignedAgent?: string;
  createdAt: Date;
  updatedAt: Date;
  dependencies?: string[];
  artifacts?: Artifact[];
}
```

#### 2. Agent Management
- Support for multiple AI coding agents
- Agent switching capability
- Parallel/sequential task orchestration
- MCP server configuration per agent

#### 3. MCP Integration
The tool uses MCP (Model Context Protocol) for:
- Standardized communication with AI agents
- Tool/function exposure to agents
- Context sharing between agents
- Task result collection

## Building Your Own Version

### Core Features to Implement

#### 1. **Backend API (Rust/Axum)**
```rust
// Main server structure
struct AppState {
    db: SqlitePool,
    mcp_manager: MCPManager,
    task_queue: TaskQueue,
}

// Key endpoints
- POST /api/tasks - Create new task
- GET /api/tasks - List all tasks
- PUT /api/tasks/:id - Update task status
- POST /api/tasks/:id/assign - Assign to agent
- GET /api/agents - List available agents
- POST /api/agents/:id/execute - Execute task with agent
```

#### 2. **Frontend Components**
```typescript
// Kanban Board Component
const KanbanBoard = () => {
  const columns = ['todo', 'in-progress', 'review', 'done'];
  
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      {columns.map(column => (
        <TaskColumn 
          key={column} 
          status={column}
          tasks={tasksByStatus[column]}
        />
      ))}
    </DragDropContext>
  );
};

// Task Card Component
const TaskCard = ({ task, agents }) => {
  return (
    <Card>
      <CardHeader>
        <h3>{task.title}</h3>
        <AgentSelector 
          value={task.assignedAgent}
          agents={agents}
          onChange={handleAssign}
        />
      </CardHeader>
      <CardContent>
        <p>{task.description}</p>
        <TaskActions task={task} />
      </CardContent>
    </Card>
  );
};
```

#### 3. **MCP Server Implementation**
```rust
// MCP server for task management
struct TaskMCPServer {
    task_store: Arc<Mutex<TaskStore>>,
}

impl MCPServer for TaskMCPServer {
    async fn handle_request(&self, request: MCPRequest) -> MCPResponse {
        match request.method.as_str() {
            "task/list" => self.list_tasks().await,
            "task/create" => self.create_task(request.params).await,
            "task/update" => self.update_task(request.params).await,
            "task/complete" => self.complete_task(request.params).await,
            _ => MCPResponse::error("Unknown method"),
        }
    }
}
```

### Integration with Claude Code & MCP

#### 1. **MCP Configuration**
```json
{
  "mcpServers": {
    "task-manager": {
      "command": "npx",
      "args": ["vibe-kanban-mcp"],
      "env": {
        "VIBE_KANBAN_API": "http://localhost:3001"
      }
    }
  }
}
```

#### 2. **Agent Communication Protocol**
```typescript
interface AgentMessage {
  type: 'task_start' | 'task_update' | 'task_complete' | 'task_error';
  taskId: string;
  agentId: string;
  payload: {
    status?: string;
    progress?: number;
    result?: any;
    error?: string;
  };
}
```

### Database Schema

```sql
-- Tasks table
CREATE TABLE tasks (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    status TEXT NOT NULL DEFAULT 'todo',
    assigned_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP,
    parent_task_id TEXT,
    position INTEGER NOT NULL DEFAULT 0
);

-- Agents table
CREATE TABLE agents (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    type TEXT NOT NULL, -- 'claude-code', 'gemini-cli', etc.
    config JSON,
    is_active BOOLEAN DEFAULT true,
    last_active TIMESTAMP
);

-- Task artifacts table
CREATE TABLE task_artifacts (
    id TEXT PRIMARY KEY,
    task_id TEXT NOT NULL,
    type TEXT NOT NULL, -- 'code', 'document', 'image', etc.
    content TEXT,
    metadata JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (task_id) REFERENCES tasks(id)
);
```

### Real-time Updates

Use WebSockets for real-time task status updates:

```typescript
// Frontend WebSocket connection
const useTaskUpdates = () => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  
  useEffect(() => {
    const ws = new WebSocket('ws://localhost:3001/ws');
    
    ws.onmessage = (event) => {
      const update = JSON.parse(event.data);
      handleTaskUpdate(update);
    };
    
    setSocket(ws);
    return () => ws.close();
  }, []);
  
  return socket;
};
```

### Key Differentiators for Your Tool

1. **Enhanced Claude Code Integration**
   - Direct integration with Claude Code's task system
   - Automatic task extraction from conversations
   - Context preservation between tasks

2. **Visual Task Dependencies**
   - Gantt chart view for complex projects
   - Dependency graph visualization
   - Critical path highlighting

3. **Multi-Agent Collaboration**
   - Task handoff between agents
   - Shared context management
   - Result aggregation

4. **Advanced Analytics**
   - Agent performance metrics
   - Task completion time tracking
   - Cost tracking per agent/task

### Development Roadmap

#### Phase 1: Core Infrastructure (Week 1-2)
- Set up Rust backend with Axum
- Implement SQLite database with migrations
- Create basic REST API
- Set up React frontend with TypeScript

#### Phase 2: Task Management (Week 3-4)
- Implement Kanban board UI
- Add drag-and-drop functionality
- Create task CRUD operations
- Add task assignment system

#### Phase 3: MCP Integration (Week 5-6)
- Implement MCP server
- Add agent registration system
- Create agent communication protocol
- Test with Claude Code

#### Phase 4: Real-time Features (Week 7-8)
- Add WebSocket support
- Implement live task updates
- Add progress tracking
- Create notification system

#### Phase 5: Advanced Features (Week 9-10)
- Add task dependencies
- Implement parallel execution
- Create analytics dashboard
- Add export/import functionality

### NPX Package Structure

```
vibe-kanban/
├── npx-cli/
│   ├── index.js          # Entry point for npx
│   ├── server.js         # Starts backend server
│   └── package.json
├── backend/
│   ├── src/
│   │   ├── main.rs       # Axum server
│   │   ├── api/          # API routes
│   │   ├── models/       # Database models
│   │   └── mcp/          # MCP server
│   └── Cargo.toml
├── frontend/
│   ├── src/
│   │   ├── App.tsx
│   │   ├── components/   # React components
│   │   └── hooks/        # Custom hooks
│   └── package.json
└── shared/
    └── types.ts          # Shared TypeScript types
```

### Getting Started

1. **Set up development environment**
```bash
# Install Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Install Node.js 18+
# Install pnpm
npm install -g pnpm

# Clone and setup
git clone your-repo
cd your-repo
pnpm install
```

2. **Start development**
```bash
# Run both frontend and backend
pnpm dev

# Or run separately
pnpm backend:dev
pnpm frontend:dev
```

3. **Build for production**
```bash
pnpm build
./build-npm-package.sh
```

This architecture provides a solid foundation for building a task management system that can effectively orchestrate AI coding agents while maintaining flexibility for future enhancements.